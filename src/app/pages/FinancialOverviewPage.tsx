import { ArrowUpRight, CircleDollarSign, Clock4, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

const monthlyIncome = [
  { month: "Oct", amount: 8200000 },
  { month: "Nov", amount: 9600000 },
  { month: "Dec", amount: 11400000 },
  { month: "Jan", amount: 10800000 },
  { month: "Feb", amount: 12700000 },
  { month: "Mar", amount: 13800000 },
] as const;

const campaignIncome = [
  { campaign: "Son moi Velvet Touch", brand: "Ari Beauty", amount: 5200000 },
  {
    campaign: "Skincare Serum Challenge",
    brand: "GlowLab",
    amount: 4100000,
  },
  {
    campaign: "Spring Livestream Collection",
    brand: "Mode House",
    amount: 3200000,
  },
  { campaign: "Gaming App Launch", brand: "NovaPlay", amount: 2800000 },
] as const;

const recentActivities = [
  "Ban vua kiem duoc 500k tu campaign Son moi Velvet Touch",
  "Brand GlowLab vua xac nhan thanh toan dot 2: 1.2M",
  "Milestone livestream thang 3 da duoc duyet",
  "Tien pending 850k se duoc thanh toan vao Thu 6",
] as const;

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

export function FinancialOverviewPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");

  const totalEarnings = useMemo(
    () => monthlyIncome.reduce((sum, item) => sum + item.amount, 0),
    [],
  );
  const thisMonthIncome = monthlyIncome[monthlyIncome.length - 1]?.amount ?? 0;
  const pendingAmount = 1850000;
  const availableBalance = 6920000;

  const maxPoint = Math.max(...monthlyIncome.map((item) => item.amount));
  const points = monthlyIncome
    .map((item, index) => {
      const x = 24 + index * 68;
      const normalized = item.amount / maxPoint;
      const y = 184 - normalized * 140;
      return `${x},${y}`;
    })
    .join(" ");

  const topCampaign = [...campaignIncome].sort(
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
          <h1>Financial Overview</h1>
          <small>Ban se thay ro minh dang kiem tien tu campaign nao.</small>
        </header>

        <section className="finance-top-cards" aria-label="Finance summary">
          <article className="finance-top-card">
            <span>
              <CircleDollarSign size={16} />
              Total Earnings
            </span>
            <strong>{formatCurrency(totalEarnings)}</strong>
          </article>
          <article className="finance-top-card">
            <span>
              <ArrowUpRight size={16} />
              This Month
            </span>
            <strong>{formatCurrency(thisMonthIncome)}</strong>
          </article>
          <article className="finance-top-card">
            <span>
              <Clock4 size={16} />
              Pending
            </span>
            <strong>{formatCurrency(pendingAmount)}</strong>
          </article>
          <article className="finance-top-card">
            <span>
              <Wallet size={16} />
              Available Balance
            </span>
            <strong>{formatCurrency(availableBalance)}</strong>
          </article>
        </section>

        <main className="finance-overview-layout">
          <section className="finance-panel" aria-label="Income chart">
            <div className="finance-panel-head">
              <h2>Income Trend by Month</h2>
              <small>6 thang gan nhat</small>
            </div>

            <div className="finance-line-chart-wrap">
              <svg
                viewBox="0 0 380 210"
                className="finance-line-chart"
                role="img"
                aria-label="Monthly income line chart"
              >
                <line x1="20" y1="184" x2="370" y2="184" />
                <polyline points={points} />
                {monthlyIncome.map((item, index) => {
                  const x = 24 + index * 68;
                  const y = 184 - (item.amount / maxPoint) * 140;
                  return <circle key={item.month} cx={x} cy={y} r="4" />;
                })}
              </svg>

              <div className="finance-line-labels">
                {monthlyIncome.map((item) => (
                  <span key={item.month}>{item.month}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="finance-panel" aria-label="Campaign earnings">
            <div className="finance-panel-head">
              <h2>Earnings by Campaign</h2>
              <small>Top campaign: {topCampaign.campaign}</small>
            </div>

            <div className="finance-campaign-list">
              {campaignIncome.map((item) => {
                const width = Math.max(
                  18,
                  Math.round((item.amount / topCampaign.amount) * 100),
                );

                return (
                  <article
                    key={item.campaign}
                    className="finance-campaign-item"
                  >
                    <div>
                      <h3>{item.campaign}</h3>
                      <p>{item.brand}</p>
                    </div>
                    <strong>{formatCurrency(item.amount)}</strong>
                    <div className="finance-campaign-bar">
                      <div style={{ width: `${width}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </main>

        <section className="finance-panel" aria-label="Recent activities">
          <div className="finance-panel-head">
            <h2>Recent Activities</h2>
            <small>Cap nhat thu nhap moi nhat</small>
          </div>

          <ul className="finance-activity-list">
            {recentActivities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
