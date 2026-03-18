import {
  CalendarDays,
  CircleDollarSign,
  CircleCheckBig,
  Clock3,
  FileText,
  Target,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

const activeContracts = [
  {
    id: "ac-1",
    title: "TikTok Product Seeding - GlowLab Serum",
    client: "GlowLab Vietnam",
    budget: "$1,200",
    spent: "$840",
    dueDate: "Mar 27, 2026",
    status: "At risk",
    completion: 70,
    deliverables: "4/6 delivered",
    nextMilestone: "Final review + CTA optimization",
  },
  {
    id: "ac-2",
    title: "Spring Livestream Host - Fashion Capsule",
    client: "Mode House",
    budget: "$950",
    spent: "$475",
    dueDate: "Apr 02, 2026",
    status: "On track",
    completion: 52,
    deliverables: "2/4 delivered",
    nextMilestone: "Livestream script lock",
  },
  {
    id: "ac-3",
    title: "UGC Video Batch - Gaming Launch",
    client: "NovaPlay Studio",
    budget: "$1,500",
    spent: "$1,100",
    dueDate: "Apr 10, 2026",
    status: "Client review",
    completion: 86,
    deliverables: "6/7 delivered",
    nextMilestone: "Publish schedule confirmation",
  },
] as const;

export function ActiveContractsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");

  const totalBudget = activeContracts
    .reduce((sum, item) => sum + Number(item.budget.replace(/[^\d]/g, "")), 0)
    .toLocaleString("en-US");

  return (
    <div className="dashboard-page app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container className="contracts-page-content">
        <header className="contracts-page-header">
          <div>
            <p>Deliver work</p>
            <h1>Your active contracts</h1>
            <small>
              Keep delivery quality high and reduce delayed milestones.
            </small>
          </div>
          <Link
            to="/deliver-work/contract-history"
            className="contracts-header-link"
          >
            View contract history
          </Link>
        </header>

        <section className="contracts-kpi-grid" aria-label="Contract summary">
          <article className="contracts-kpi-card">
            <Target size={16} />
            <span>{activeContracts.length} active contracts</span>
          </article>
          <article className="contracts-kpi-card">
            <CircleDollarSign size={16} />
            <span>${totalBudget} total budget</span>
          </article>
          <article className="contracts-kpi-card">
            <CircleCheckBig size={16} />
            <span>4 milestones due this week</span>
          </article>
        </section>

        <main className="contracts-list" aria-label="Active contracts list">
          {activeContracts.map((contract) => (
            <article key={contract.id} className="contract-card">
              <header className="contract-card-head">
                <div>
                  <p>{contract.client}</p>
                  <h2>{contract.title}</h2>
                </div>

                <span
                  className={`contract-status-pill ${contract.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {contract.status}
                </span>
              </header>

              <div className="contract-meta-grid">
                <p>
                  <CircleDollarSign size={14} />
                  Budget: {contract.budget}
                </p>
                <p>
                  <FileText size={14} />
                  Deliverables: {contract.deliverables}
                </p>
                <p>
                  <CalendarDays size={14} />
                  Deadline: {contract.dueDate}
                </p>
                <p>
                  <Clock3 size={14} />
                  Spent: {contract.spent}
                </p>
              </div>

              <section
                className="contract-progress-block"
                aria-label="Progress"
              >
                <div>
                  <strong>Completion</strong>
                  <small>{contract.completion}%</small>
                </div>
                <div className="contract-progress-track">
                  <div style={{ width: `${contract.completion}%` }} />
                </div>
                <p>Next milestone: {contract.nextMilestone}</p>

                <div className="contract-card-actions">
                  <Link
                    to={`/deliver-work/active-contracts/${contract.id}`}
                    className="contract-detail-link"
                  >
                    View detail
                  </Link>
                </div>
              </section>
            </article>
          ))}
        </main>
      </Container>

      <Footer />
    </div>
  );
}
