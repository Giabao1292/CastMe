import { Bell, Search } from "lucide-react";
import { NavLink } from "react-router";
import { Container } from "react-bootstrap";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Campaigns", path: "/campaigns" },
  { label: "Find Talents", path: "/find-talents" },
  { label: "Messages", path: "/messages" },
  { label: "Analytics", path: "/analytics" },
] as const;

export function BusinessHeader() {
  return (
    <header className="business-topbar">
      <Container className="business-topbar-inner">
        <div className="business-brand-block">
          <strong>castme</strong>
        </div>

        <nav
          className="business-main-nav"
          aria-label="Business main navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `business-nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="business-topbar-actions">
          <label
            className="business-search-box"
            aria-label="Search campaigns and KOLs"
          >
            <Search size={14} />
            <input placeholder="Search" />
          </label>
          <button
            type="button"
            className="business-icon-btn"
            aria-label="Notifications"
          >
            <Bell size={16} />
          </button>
          <button
            type="button"
            className="business-avatar"
            aria-label="Business profile"
          >
            BM
          </button>
        </div>
      </Container>
    </header>
  );
}
