// src/pages/admin/AdminPage.jsx
import { useState } from "react";
import { COLORS } from "../../styles/theme";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminProducts from "../../components/admin/AdminProducts";
import AdminOrders from "../../components/admin/AdminOrders";
import AdminCategories from "../../components/admin/AdminCategories";
import AdminUsers from "../../components/admin/AdminUsers";
import AdminMessages from "../../components/admin/AdminMessages";

export default function AdminPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "categories":
        return <AdminCategories />;
      case "orders":
        return <AdminOrders />;
      case "users":
        return <AdminUsers />;
      case "messages":
        return <AdminMessages />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div style={{ display: "flex", background: COLORS.bg, minHeight: "100vh" }}>
      <AdminSidebar activePage={activePage} onNavigate={setActivePage} />
      <main style={{ marginLeft: "240px", flex: 1, padding: "40px 48px" }}>
        {renderContent()}
      </main>
    </div>
  );
}
