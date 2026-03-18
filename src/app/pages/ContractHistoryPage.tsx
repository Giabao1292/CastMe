import {
  CalendarDays,
  CircleDollarSign,
  FileCheck2,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

const contractsHistory = [
  {
    id: "hc-1",
    campaign: "Beauty UGC Retainer Q4",
    client: "Lumi Skin",
    completedOn: "Jan 18, 2026",
    amount: "$2,400",
    rating: "5.0",
    result: "Completed",
  },
  {
    id: "hc-2",
    campaign: "Holiday Sales Livestream",
    client: "Urban Trend",
    completedOn: "Dec 29, 2025",
    amount: "$1,350",
    rating: "4.9",
    result: "Completed",
  },
  {
    id: "hc-3",
    campaign: "SaaS Creator Campaign",
    client: "ScaleFlow",
    completedOn: "Nov 15, 2025",
    amount: "$980",
    rating: "4.8",
    result: "Completed",
  },
  {
    id: "hc-4",
    campaign: "Back to School Promo",
    client: "HexaEdu",
    completedOn: "Sep 02, 2025",
    amount: "$1,120",
    rating: "5.0",
    result: "Completed",
  },
] as const;

export function ContractHistoryPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");
  const [historyQuery, setHistoryQuery] = useState("");

  const filteredHistory = useMemo(() => {
    const keyword = historyQuery.trim().toLowerCase();
    if (!keyword) return contractsHistory;

    return contractsHistory.filter((contract) => {
      const haystack =
        `${contract.campaign} ${contract.client} ${contract.completedOn}`.toLowerCase();
      return haystack.includes(keyword);
    });
  }, [historyQuery]);

  const totalEarnings = contractsHistory
    .reduce((sum, item) => sum + Number(item.amount.replace(/[^\d]/g, "")), 0)
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
            <h1>Contract history</h1>
            <small>
              Track outcomes, client ratings, and recurring campaign potential.
            </small>
          </div>
          <Link
            to="/deliver-work/active-contracts"
            className="contracts-header-link"
          >
            Back to active contracts
          </Link>
        </header>

        <section className="contracts-kpi-grid" aria-label="History summary">
          <article className="contracts-kpi-card">
            <FileCheck2 size={16} />
            <span>{contractsHistory.length} closed contracts</span>
          </article>
          <article className="contracts-kpi-card">
            <CircleDollarSign size={16} />
            <span>${totalEarnings} total earnings</span>
          </article>
          <article className="contracts-kpi-card">
            <CalendarDays size={16} />
            <span>Avg. rating 4.93 from clients</span>
          </article>
        </section>

        <section
          className="contract-history-panel"
          aria-label="Contract history list"
        >
          <div className="contract-history-head">
            <div className="contract-history-search">
              <Search size={16} />
              <input
                value={historyQuery}
                onChange={(event) => setHistoryQuery(event.target.value)}
                placeholder="Search by campaign or client"
                aria-label="Search contract history"
              />
            </div>
            <span>{filteredHistory.length} result(s)</span>
          </div>

          <div className="contract-history-table-wrap">
            <table className="contract-history-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Client</th>
                  <th>Completed on</th>
                  <th>Amount</th>
                  <th>Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((contract) => (
                  <tr key={contract.id}>
                    <td>{contract.campaign}</td>
                    <td>{contract.client}</td>
                    <td>{contract.completedOn}</td>
                    <td>{contract.amount}</td>
                    <td>{contract.rating}</td>
                    <td>
                      <span className="contract-status-pill completed">
                        {contract.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
