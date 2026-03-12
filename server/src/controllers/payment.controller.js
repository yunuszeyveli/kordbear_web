// server/src/controllers/payment.controller.js
import iyzipay from "../config/iyzico.js";
import Order from "../models/order.model.js";

const cleanAddress = (str) =>
  str?.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s.,\/\-]/g, "").slice(0, 100) ||
  "Turkiye";

// ── CHECKOUT FORM BAŞLAT ──────────────────────────────────
export const initiatePayment = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    const basketTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingPrice = basketTotal >= 500 ? 0 : 49;
    const grandTotal = basketTotal + shippingPrice;
    const conversationId = `kordbear-${Date.now()}`;

    const request = {
      locale: "tr",
      conversationId,
      price: grandTotal.toFixed(2),
      paidPrice: grandTotal.toFixed(2),
      currency: "TRY",
      basketId: `basket-${Date.now()}`,
      paymentGroup: "PRODUCT",
      callbackUrl: `${process.env.SERVER_URL}/api/payment/callback`,
      enabledInstallments: ["1", "2", "3", "6", "9"],

      buyer: {
        id: req.user._id.toString(),
        name: shippingAddress.fullName.split(" ")[0],
        surname: shippingAddress.fullName.split(" ").slice(1).join(" ") || "X",
        gsmNumber: shippingAddress.phone,
        email: req.user.email,
        identityNumber: "74300864791",
        lastLoginDate: new Date().toISOString().replace("T", " ").slice(0, 19),
        registrationDate: new Date()
          .toISOString()
          .replace("T", " ")
          .slice(0, 19),
        registrationAddress: cleanAddress(shippingAddress.address),
        ip: req.ip || "85.34.78.112",
        city: shippingAddress.city,
        country: "Turkey",
        zipCode: "34000",
      },

      billingAddress: {
        contactName: shippingAddress.fullName,
        city: shippingAddress.city,
        country: "Turkey",
        address: cleanAddress(shippingAddress.address),
        zipCode: "34000",
      },

      shippingAddress: {
        contactName: shippingAddress.fullName,
        city: shippingAddress.city,
        country: "Turkey",
        address: cleanAddress(shippingAddress.address),
        zipCode: "34000",
      },

      basketItems: [
        ...items.map((item, i) => ({
          id: item.product || `item-${i}`,
          name: item.name,
          category1: "Genel",
          itemType: "PHYSICAL",
          price: (item.price * item.quantity).toFixed(2),
        })),
        ...(shippingPrice > 0
          ? [
              {
                id: "shipping",
                name: "Kargo",
                category1: "Kargo",
                itemType: "PHYSICAL",
                price: shippingPrice.toFixed(2),
              },
            ]
          : []),
      ],
    };

    iyzipay.checkoutFormInitialize.create(request, async (err, result) => {
      if (err || result.status !== "success") {
        return res.status(400).json({
          message: result?.errorMessage || "Ödeme başlatılamadı",
          errorCode: result?.errorCode,
        });
      }

      const order = new Order({
        user: req.user._id,
        items,
        shippingAddress,
        totalPrice: basketTotal,
        shippingPrice,
        paymentToken: result.token,
        conversationId,
        status: "beklemede",
      });
      await order.save();

      res.json({
        success: true,
        paymentPageUrl: result.paymentPageUrl,
        token: result.token,
      });
    });
  } catch (error) {
    console.error("Ödeme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── CALLBACK ─────────────────────────────────────────────
export const paymentCallback = async (req, res) => {
  try {
    const token = req.body?.token || req.query?.token;

    console.log("Callback token:", token);
    console.log("Callback body:", req.body);

    if (!token) {
      return res.redirect(`${process.env.CLIENT_URL}/checkout?error=no_token`);
    }

    iyzipay.checkoutForm.retrieve(
      { locale: "tr", token },
      async (err, result) => {
        console.log("iyzico result status:", result?.status);
        console.log("iyzico paymentStatus:", result?.paymentStatus);
        console.log("iyzico errorMessage:", result?.errorMessage);

        try {
          const order = await Order.findOne({ paymentToken: token });

          if (!order) {
            console.error("Sipariş bulunamadı, token:", token);
            return res.redirect(
              `${process.env.CLIENT_URL}/checkout?error=not_found`,
            );
          }

          // Zaten işlenmiş
          if (order.status !== "beklemede") {
            return res.redirect(
              `${process.env.CLIENT_URL}/checkout/success?orderId=${order._id}`,
            );
          }

          // 3D Secure dahil tüm başarılı durumlar
          const isSuccess =
            result.status === "success" &&
            result.paymentStatus !== "FAILURE" &&
            result.paymentStatus !== "INIT_THREEDS";

          if (result.status === "success") {
            order.status = "hazırlanıyor";
            order.paymentId = result.paymentId || result.token;
            await order.save();
            console.log("Sipariş başarılı:", order._id);
            return res.redirect(
              `${process.env.CLIENT_URL}/checkout/success?orderId=${order._id}`,
            );
          } else {
            console.log(
              "Ödeme başarısız:",
              result.paymentStatus,
              result.errorMessage,
            );
            order.status = "iptal";
            await order.save();
            return res.redirect(
              `${process.env.CLIENT_URL}/checkout?error=payment_failed`,
            );
          }
        } catch (innerErr) {
          console.error(
            "Inner callback hatası:",
            innerErr.message,
            innerErr.stack,
          );
          return res.redirect(
            `${process.env.CLIENT_URL}/checkout?error=server_error`,
          );
        }
      },
    );
  } catch (error) {
    console.error("Callback hatası:", error.message, error.stack);
    res.redirect(`${process.env.CLIENT_URL}/checkout?error=server_error`);
  }
};
