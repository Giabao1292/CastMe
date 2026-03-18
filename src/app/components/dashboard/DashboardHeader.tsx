import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import type { SearchScope } from "./types";

const navItems = [
  "Find work",
  "Deliver work",
  "Manage finances",
  "Messages",
] as const;

const dropdownItems = [
  {
    value: "Jobs",
    description: "Apply to jobs posted by clients",
    Icon: BriefcaseBusiness,
  },
  {
    value: "Talent",
    description: "Find freelancers and agencies",
    Icon: Users,
  },
] as const;

const findWorkMenuItems = [
  { label: "Find work", path: "/jobs" },
  { label: "Saved jobs", path: "/saved-jobs" },
  { label: "Invitations and offers", path: "/invitations-offers" },
] as const;

const deliverWorkMenuItems = [
  { label: "Your active contracts", path: "/deliver-work/active-contracts" },
  { label: "Contract history", path: "/deliver-work/contract-history" },
] as const;

const manageFinancesMenuItems = [
  { label: "Financial Overview", path: "/manage-finances/financial-overview" },
  { label: "Earnings", path: "/manage-finances/earnings" },
  { label: "Transactions", path: "/manage-finances/transactions" },
] as const;

interface DashboardHeaderProps {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  selectedScope: SearchScope;
  onScopeChange: (scope: SearchScope) => void;
}

export function DashboardHeader({
  searchValue,
  onSearchValueChange,
  selectedScope,
  onScopeChange,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!selectorRef.current) return;
      if (!selectorRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="dashboard-topbar">
      <Container className="dashboard-topbar-inner">
        <div className="dashboard-brand" aria-label="CastMe">
          castme
        </div>

        <nav className="dashboard-main-nav" aria-label="Primary navigation">
          {navItems.map((item) =>
            item === "Find work" ? (
              <div key={item} className="dashboard-nav-dropdown-wrap">
                <button type="button" className="dashboard-nav-link">
                  {item}
                  <ChevronDown size={14} strokeWidth={2} />
                </button>

                <div
                  className="dashboard-scope-menu dashboard-find-work-menu"
                  role="menu"
                  aria-label="Find work menu"
                >
                  {findWorkMenuItems.map((menuItem) => (
                    <button
                      key={menuItem.label}
                      type="button"
                      className="dashboard-scope-item dashboard-find-work-item"
                      role="menuitem"
                      onClick={() => navigate(menuItem.path)}
                    >
                      <span>
                        <strong>{menuItem.label}</strong>
                      </span>
                    </button>
                  ))}

                  <div
                    className="dashboard-find-work-divider"
                    aria-hidden="true"
                  />

                  <p className="dashboard-find-work-caption">
                    Reach more clients
                  </p>

                  <button
                    type="button"
                    className="dashboard-scope-item dashboard-find-work-item"
                    role="menuitem"
                  >
                    <span>
                      <strong>Promote with ads</strong>
                    </span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ) : item === "Deliver work" ? (
              <div key={item} className="dashboard-nav-dropdown-wrap">
                <button type="button" className="dashboard-nav-link">
                  {item}
                  <ChevronDown size={14} strokeWidth={2} />
                </button>

                <div
                  className="dashboard-scope-menu dashboard-find-work-menu"
                  role="menu"
                  aria-label="Deliver work menu"
                >
                  {deliverWorkMenuItems.map((menuItem) => (
                    <button
                      key={menuItem.label}
                      type="button"
                      className="dashboard-scope-item dashboard-find-work-item"
                      role="menuitem"
                      onClick={() => navigate(menuItem.path)}
                    >
                      <span>
                        <strong>{menuItem.label}</strong>
                      </span>
                    </button>
                  ))}

                  <div
                    className="dashboard-find-work-divider"
                    aria-hidden="true"
                  />

                  <p className="dashboard-find-work-caption">
                    Keep work moving
                  </p>

                  <button
                    type="button"
                    className="dashboard-scope-item dashboard-find-work-item"
                    role="menuitem"
                  >
                    <span>
                      <strong>Track milestone health</strong>
                    </span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ) : item === "Manage finances" ? (
              <div key={item} className="dashboard-nav-dropdown-wrap">
                <button type="button" className="dashboard-nav-link">
                  {item}
                  <ChevronDown size={14} strokeWidth={2} />
                </button>

                <div
                  className="dashboard-scope-menu dashboard-find-work-menu"
                  role="menu"
                  aria-label="Manage finances menu"
                >
                  {manageFinancesMenuItems.map((menuItem) => (
                    <button
                      key={menuItem.label}
                      type="button"
                      className="dashboard-scope-item dashboard-find-work-item"
                      role="menuitem"
                      onClick={() => navigate(menuItem.path)}
                    >
                      <span>
                        <strong>{menuItem.label}</strong>
                      </span>
                    </button>
                  ))}

                  <div
                    className="dashboard-find-work-divider"
                    aria-hidden="true"
                  />

                  <p className="dashboard-find-work-caption">
                    Grow your income
                  </p>

                  <button
                    type="button"
                    className="dashboard-scope-item dashboard-find-work-item"
                    role="menuitem"
                    onClick={() => navigate("/buy-hearts")}
                  >
                    <span>
                      <strong>Buy Hearts</strong>
                    </span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                key={item}
                type="button"
                className="dashboard-nav-link"
                onClick={() => {
                  if (item === "Messages") {
                    navigate("/messages");
                  }
                }}
              >
                {item}
                {item !== "Messages" && (
                  <ChevronDown size={14} strokeWidth={2} />
                )}
              </button>
            ),
          )}
        </nav>

        <div className="dashboard-actions">
          <div
            className="dashboard-search-shell"
            role="search"
            aria-label="Search"
          >
            <Search size={16} />
            <input
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={(event) => onSearchValueChange(event.target.value)}
            />

            <div className="dashboard-scope-selector" ref={selectorRef}>
              <button
                type="button"
                className="dashboard-jobs-pill"
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                aria-label="Select search scope"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {selectedScope}
                <ChevronDown size={14} />
              </button>

              {isDropdownOpen && (
                <div className="dashboard-scope-menu" role="menu">
                  {dropdownItems.map((item) => {
                    const isActive = item.value === selectedScope;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="menuitemradio"
                        aria-checked={isActive}
                        className={`dashboard-scope-item ${isActive ? "active" : ""}`}
                        onClick={() => {
                          onScopeChange(item.value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <item.Icon size={18} />
                        <span>
                          <strong>{item.value}</strong>
                          <small>{item.description}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="dashboard-icon-btn"
            aria-label="Help"
          >
            <CircleHelp size={18} />
          </button>
          <button
            type="button"
            className="dashboard-icon-btn"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
          <button
            type="button"
            className="dashboard-icon-btn"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>

          <button
            type="button"
            className="dashboard-avatar"
            aria-label="Profile"
            onClick={() => navigate("/my-profile")}
          >
            GT
          </button>
        </div>
      </Container>
    </header>
  );
}
