import {
  CalendarRange,
  CircleDollarSign,
  Filter,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

type EarningStatus = "Paid" | "Pending";
type TimeFilter = "This month" | "Last 3 months" | "Last 6 months";

interface CampaignEarning {
  id: string;
  campaign: string;
  brand: string;
  amount: number;
  status: EarningStatus;
  period: TimeFilter;
}

const campaignEarnings: CampaignEarning[] = [
  {
    id: "er-1",
    campaign: "Son moi Velvet Touch",
    brand: "Ari Beauty",
    amount: 5200000,
    status: "Paid",
    period: "This month",
  },
  {
    id: "er-2",
    campaign: "Skincare Serum Challenge",
    brand: "GlowLab",
    amount: 4100000,
    status: "Pending",
    period: "This month",
  },
  {
    id: "er-3",
    campaign: "Spring Livestream Collection",
    brand: "Mode House",
    amount: 3200000,
    status: "Paid",
    period: "Last 3 months",
  },
  {
    id: "er-4",
    campaign: "Gaming App Launch",
    brand: "NovaPlay",
    amount: 2800000,
    status: "Paid",
    period: "Last 3 months",
  },
  {
    id: "er-5",
    campaign: "Flash Sale Creator Sprint",
    brand: "Urban Trend",
    amount: 1900000,
    status: "Pending",
    period: "Last 6 months",
  },
];

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

export function EarningsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");
  const [statusFilter, setStatusFilter] = useState<"All" | EarningStatus>(
    "All",
  );
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Last 6 months");

  const filteredEarnings = useMemo(() => {
    return campaignEarnings.filter((item) => {
      const statusOk = statusFilter === "All" || item.status === statusFilter;
      const timeOk =
        timeFilter === "Last 6 months"
          ? true
          : timeFilter === "Last 3 months"
            ? item.period === "This month" || item.period === "Last 3 months"
            : item.period === "This month";

      return statusOk && timeOk;
    });
  }, [statusFilter, timeFilter]);

  const totalEarnings = filteredEarnings.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const thisMonthEarnings = campaignEarnings
    .filter((item) => item.period === "This month")
    .reduce((sum, item) => sum + item.amount, 0);
  const previousMonth = 8300000;
  const growth = Math.round(
    ((thisMonthEarnings - previousMonth) / previousMonth) * 100,
  );

  const topCampaign = [...filteredEarnings].sort(
    (a, b) => b.amount - a.amount,
  )[0];

  return (
    <div className="dashboard-page app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container className="finance-page-content">
        <header className="finance-page-head">
          <p>Manage finances</p>
          <h1>Earnings</h1>
          <small>
            Nhin nhanh campaign nao dang tao doanh thu tot nhat cho ban.
          </small>
        </header>

        <section className="finance-top-cards" aria-label="Earnings summary">
          <article className="finance-top-card">
            <span>
              <CircleDollarSign size={16} />
              Total Earnings
            </span>
            <strong>{formatCurrency(totalEarnings)}</strong>
          </article>
          <article className="finance-top-card">
            <span>
              <CalendarRange size={16} />
              This Month
            </span>
            <strong>{formatCurrency(thisMonthEarnings)}</strong>
          </article>
          <article className="finance-top-card">
            <span>
              <TrendingUp size={16} />
              Vs Last Month
            </span>
            <strong>{growth >= 0 ? `+${growth}%` : `${growth}%`}</strong>
          </article>
        </section>

        <section
          className="finance-panel"
          aria-label="Earnings filters and table"
        >
          <div className="finance-panel-head">
            <h2>Earnings by Campaign</h2>
            <small>Tap trung vao campaign tao tien</small>
          </div>

          <div className="earnings-filters">
            <label>
              <Filter size={14} />
              Status
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "All" | EarningStatus)
                }
              >
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </label>

            <label>
              <CalendarRange size={14} />
              Time
              <select
                value={timeFilter}
                onChange={(event) =>
                  setTimeFilter(event.target.value as TimeFilter)
                }
              >
                <option value="This month">This month</option>
                <option value="Last 3 months">Last 3 months</option>
                <option value="Last 6 months">Last 6 months</option>
              </select>
            </label>
          </div>

          <div className="contract-history-table-wrap">
            <table className="contract-history-table earnings-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Brand</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEarnings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.campaign}</td>
                    <td>{item.brand}</td>
                    <td className="earnings-amount-cell">
                      {formatCurrency(item.amount)}
                    </td>
                    <td>
                      <span
                        className={`contract-status-pill ${item.status === "Paid" ? "completed" : "at-risk"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {topCampaign ? (
          <section className="finance-panel" aria-label="Top campaign">
            <div className="finance-panel-head">
              <h2>Top Campaign</h2>
              <small>Campaign dang kiem tien nhieu nhat</small>
            </div>

            <article className="top-campaign-card">
              <div>
                <p>{topCampaign.brand}</p>
                <h3>{topCampaign.campaign}</h3>
              </div>
              <strong>{formatCurrency(topCampaign.amount)}</strong>
            </article>
          </section>
        ) : null}
      </Container>

      <Footer />
    </div>
  );
}
