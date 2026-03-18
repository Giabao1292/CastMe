import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { BusinessHeader } from "../components/business/BusinessHeader";
import { campaignKols, campaignsData } from "../components/business/data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../../styles/business-dashboard.css";

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

export function CampaignDetailPage() {
  const { campaignId } = useParams();
  const campaign =
    campaignsData.find((item) => item.id === campaignId) ?? campaignsData[0];
  const kols = campaignKols[campaign.id] ?? [];

  const performanceSummary = useMemo(() => {
    const totalViews = kols.reduce((sum, kol) => sum + kol.views, 0);
    const totalSales = kols.reduce((sum, kol) => sum + kol.sales, 0);
    const totalCost = kols.reduce(
      (sum, kol) =>
        sum + campaign.basePayPerKol + kol.sales * campaign.bonusPerSale,
      0,
    );

    return {
      totalViews,
      totalSales,
      totalCost,
    };
  }, [kols, campaign.basePayPerKol, campaign.bonusPerSale]);

  return (
    <div className="business-shell business-route-page">
      <BusinessHeader />

      <Container className="business-content">
        <header className="business-page-head detail-head">
          <div>
            <p>Campaign Detail</p>
            <h1>{campaign.name}</h1>
            <small>{campaign.brand}</small>
          </div>
          <Link to="/campaigns" className="business-head-cta secondary">
            Back to campaigns
          </Link>
        </header>

        <section className="business-panel" aria-label="Campaign overview">
          <header className="business-panel-head">
            <h2>Campaign overview</h2>
            <small>Money + performance in one place</small>
          </header>

          <div className="campaign-detail-product">
            <ImageWithFallback
              src={campaign.productImageUrl}
              alt={campaign.productImageAlt}
              className="campaign-detail-product-image"
              loading="lazy"
            />
          </div>

          <div className="overview-grid">
            <article>
              <small>Goal</small>
              <strong>{campaign.goal}</strong>
            </article>
            <article>
              <small>Budget</small>
              <strong>{formatCurrency(campaign.budget)}</strong>
            </article>
            <article>
              <small>Duration</small>
              <strong>{campaign.duration}</strong>
            </article>
            <article>
              <small>Payment model</small>
              <strong>
                Base {formatCurrency(campaign.basePayPerKol)} / KOL + Bonus{" "}
                {formatCurrency(campaign.bonusPerSale)} / sale
              </strong>
            </article>
          </div>
        </section>

        <section className="business-panel" aria-label="Performance summary">
          <header className="business-panel-head">
            <h2>Performance summary</h2>
            <small>Live total from KOL submissions</small>
          </header>

          <div className="metric-grid compact">
            <article className="metric-card">
              <span>Total Views</span>
              <strong>
                {performanceSummary.totalViews.toLocaleString("en-US")}
              </strong>
            </article>
            <article className="metric-card">
              <span>Total Sales</span>
              <strong>
                {performanceSummary.totalSales.toLocaleString("en-US")}
              </strong>
            </article>
            <article className="metric-card">
              <span>Total Cost</span>
              <strong>{formatCurrency(performanceSummary.totalCost)}</strong>
            </article>
          </div>
        </section>

        <section className="business-panel" aria-label="KOL list">
          <header className="business-panel-head">
            <h2>KOL list</h2>
            <div className="detail-actions">
              <button type="button" className="business-head-cta secondary">
                Invite KOL
              </button>
              <button type="button" className="business-head-cta">
                Pay KOL
              </button>
            </div>
          </header>

          <div className="table-wrap">
            <table className="business-table">
              <thead>
                <tr>
                  <th>KOL</th>
                  <th>Video link</th>
                  <th>Views</th>
                  <th>Sales</th>
                  <th>Earnings</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {kols.map((kol) => {
                  const earnings =
                    campaign.basePayPerKol + kol.sales * campaign.bonusPerSale;
                  return (
                    <tr key={kol.id}>
                      <td>
                        <div className="table-kol-name">
                          <span>{kol.avatar}</span>
                          <strong>{kol.name}</strong>
                        </div>
                      </td>
                      <td>{kol.videoLink}</td>
                      <td>{kol.views.toLocaleString("en-US")}</td>
                      <td>{kol.sales.toLocaleString("en-US")}</td>
                      <td className="money-cell">{formatCurrency(earnings)}</td>
                      <td>
                        <span
                          className={`campaign-status ${kol.status.toLowerCase()}`}
                        >
                          {kol.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </div>
  );
}
