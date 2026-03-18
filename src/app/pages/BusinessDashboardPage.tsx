import { BarChart3, CircleDollarSign, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Container } from "react-bootstrap";
import { BusinessHeader } from "../components/business/BusinessHeader";
import {
  campaignsData,
  monthlyViews,
  recentActivities,
} from "../components/business/data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../../styles/business-dashboard.css";

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

function formatCompact(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return `${value}`;
}

export function BusinessDashboardPage() {
  const totalBudget = campaignsData.reduce(
    (sum, campaign) => sum + campaign.budget,
    0,
  );
  const activeCampaigns = campaignsData.filter(
    (campaign) => campaign.status === "Active",
  ).length;
  const totalViews = campaignsData.reduce(
    (sum, campaign) => sum + campaign.views,
    0,
  );
  const totalSales = campaignsData.reduce(
    (sum, campaign) => sum + campaign.sales,
    0,
  );

  const maxViews = Math.max(...monthlyViews.map((point) => point.views));
  const chartPoints = monthlyViews
    .map((point, index) => {
      const x = 26 + index * 72;
      const y = 184 - (point.views / maxViews) * 140;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="business-shell business-route-page">
      <BusinessHeader />

      <Container className="business-content">
        <header className="business-page-head">
          <div>
            <p>Business Dashboard</p>
            <h1>Campaign performance at a glance</h1>
          </div>
          <Link to="/campaigns" className="business-head-cta">
            Manage Campaigns
          </Link>
        </header>

        <section className="metric-grid" aria-label="Top summary cards">
          <article className="metric-card">
            <span>
              <CircleDollarSign size={15} /> Total Budget
            </span>
            <strong>{formatCurrency(totalBudget)}</strong>
          </article>
          <article className="metric-card">
            <span>
              <BarChart3 size={15} /> Active Campaigns
            </span>
            <strong>{activeCampaigns}</strong>
          </article>
          <article className="metric-card">
            <span>
              <Eye size={15} /> Total Views
            </span>
            <strong>{formatCompact(totalViews)}</strong>
          </article>
          <article className="metric-card">
            <span>
              <ShoppingBag size={15} /> Total Sales
            </span>
            <strong>{totalSales.toLocaleString("en-US")}</strong>
          </article>
        </section>

        <section className="business-grid-2">
          <article className="business-panel">
            <header className="business-panel-head">
              <h2>Views over time</h2>
              <small>Last 6 months</small>
            </header>
            <div className="views-chart-wrap">
              <svg
                className="views-chart"
                viewBox="0 0 420 210"
                role="img"
                aria-label="Views line chart"
              >
                <line x1="20" y1="184" x2="400" y2="184" />
                <polyline points={chartPoints} />
                {monthlyViews.map((point, index) => {
                  const x = 26 + index * 72;
                  const y = 184 - (point.views / maxViews) * 140;
                  return <circle key={point.month} cx={x} cy={y} r="4" />;
                })}
              </svg>
              <div className="views-chart-labels">
                {monthlyViews.map((point) => (
                  <span key={point.month}>{point.month}</span>
                ))}
              </div>
            </div>
          </article>

          <article className="business-panel">
            <header className="business-panel-head">
              <h2>Recent activity</h2>
              <small>Live updates</small>
            </header>
            <ul className="activity-timeline">
              {recentActivities.map((activity) => (
                <li key={activity.id}>
                  <h3>{activity.type}</h3>
                  <p>{activity.detail}</p>
                  <small>{activity.time}</small>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="business-panel" aria-label="Active campaigns">
          <header className="business-panel-head">
            <h2>Active campaigns</h2>
            <small>Track progress and spending</small>
          </header>

          <div className="campaign-list">
            {campaignsData
              .filter((campaign) => campaign.status === "Active")
              .map((campaign) => (
                <article key={campaign.id} className="campaign-row-card">
                  <div className="campaign-row-top">
                    <div className="campaign-product-thumb">
                      <ImageWithFallback
                        src={campaign.productImageUrl}
                        alt={campaign.productImageAlt}
                        className="campaign-product-thumb-image"
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <h3>{campaign.name}</h3>
                      <p>{campaign.brand}</p>
                    </div>
                  </div>

                  <div className="campaign-row-meta">
                    <span>Budget: {formatCurrency(campaign.budget)}</span>
                    <span>{campaign.kolCount} KOLs</span>
                  </div>

                  <div className="campaign-progress-block">
                    <div>
                      <small>Progress</small>
                      <strong>{campaign.progress}%</strong>
                    </div>
                    <div className="campaign-progress-track">
                      <div style={{ width: `${campaign.progress}%` }} />
                    </div>
                  </div>

                  <Link
                    to={`/campaigns/${campaign.id}`}
                    className="campaign-detail-btn"
                  >
                    View Detail
                  </Link>
                </article>
              ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
