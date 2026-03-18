import {
  CalendarRange,
  CircleArrowDown,
  CircleDollarSign,
  Filter,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

type TransactionType = "Earning" | "Payout";

type TimeFilter = "This month" | "Last 3 months" | "Last 6 months";

interface TransactionItem {
  id: string;
  date: string;
  type: TransactionType;
  campaign: string;
  amount: number;
  status: "Completed" | "Pending";
  period: TimeFilter;
}

const transactions: TransactionItem[] = [
  {
    id: "tr-1",
    date: "2026-03-18",
    type: "Earning",
    campaign: "Son moi Velvet Touch",
    amount: 1200000,
    status: "Completed",
    period: "This month",
  },
  {
    id: "tr-2",
    date: "2026-03-16",
    type: "Payout",
    campaign: "Wallet withdrawal",
    amount: -2000000,
    status: "Completed",
    period: "This month",
  },
  {
    id: "tr-3",
    date: "2026-03-12",
    type: "Earning",
    campaign: "Skincare Serum Challenge",
    amount: 850000,
    status: "Pending",
    period: "This month",
  },
  {
    id: "tr-4",
    date: "2026-02-28",
    type: "Earning",
    campaign: "Spring Livestream Collection",
    amount: 1600000,
    status: "Completed",
    period: "Last 3 months",
  },
  {
    id: "tr-5",
    date: "2026-02-15",
    type: "Payout",
    campaign: "Wallet withdrawal",
    amount: -1500000,
    status: "Completed",
    period: "Last 3 months",
  },
  {
    id: "tr-6",
    date: "2025-12-20",
    type: "Earning",
    campaign: "Gaming App Launch",
    amount: 980000,
    status: "Completed",
    period: "Last 6 months",
  },
];

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

export function TransactionsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");
  const [typeFilter, setTypeFilter] = useState<"All" | TransactionType>("All");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Last 6 months");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const typeOk = typeFilter === "All" || item.type === typeFilter;
      const timeOk =
        timeFilter === "Last 6 months"
          ? true
          : timeFilter === "Last 3 months"
            ? item.period === "This month" || item.period === "Last 3 months"
            : item.period === "This month";

      return typeOk && timeOk;
    });
  }, [typeFilter, timeFilter]);

  const totalIncome = filteredTransactions
    .filter((item) => item.type === "Earning")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalPayout = Math.abs(
    filteredTransactions
      .filter((item) => item.type === "Payout")
      .reduce((sum, item) => sum + item.amount, 0),
  );

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
          <h1>Transactions</h1>
          <small>Lich su thu nhap va rut tien ro rang, de doc.</small>
        </header>

        <section
          className="finance-top-cards"
          aria-label="Transactions summary"
        >
          <article className="finance-top-card">
            <span>
              <CircleDollarSign size={16} />
              Total Income
            </span>
            <strong>{formatCurrency(totalIncome)}</strong>
          </article>
          <article className="finance-top-card">
            <span>
              <CircleArrowDown size={16} />
              Total Payout
            </span>
            <strong>{formatCurrency(totalPayout)}</strong>
          </article>
        </section>

        <section className="finance-panel" aria-label="Transactions table">
          <div className="finance-panel-head">
            <h2>Transaction History</h2>
            <small>Luon hien thi campaign lien quan</small>
          </div>

          <div className="earnings-filters">
            <label>
              <Filter size={14} />
              Type
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value as "All" | TransactionType)
                }
              >
                <option value="All">All</option>
                <option value="Earning">Earning</option>
                <option value="Payout">Payout</option>
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
            <table className="contract-history-table transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Campaign</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.type}</td>
                    <td>{item.campaign}</td>
                    <td
                      className={
                        item.amount >= 0
                          ? "transactions-amount-plus"
                          : "transactions-amount-minus"
                      }
                    >
                      {item.amount >= 0 ? "+" : "-"}
                      {formatCurrency(Math.abs(item.amount))}
                    </td>
                    <td>
                      <span
                        className={`contract-status-pill ${item.status === "Completed" ? "completed" : "at-risk"}`}
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
      </Container>

      <Footer />
    </div>
  );
}
