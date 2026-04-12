import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#1f2937",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Dashboard</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Link to="/profile" style={{ color: "white" }}>
            Profile
          </Link>
          <Link to="/settings" style={{ color: "white" }}>
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {/* Navbar */}
        <header
          style={{
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <h1>My App</h1>
        </header>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
}