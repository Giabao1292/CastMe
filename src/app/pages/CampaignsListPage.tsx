import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Container } from "react-bootstrap";
import { BusinessHeader } from "../components/business/BusinessHeader";
import {
  campaignsData,
  type CampaignStatus,
} from "../components/business/data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../../styles/business-dashboard.css";

const filters = ["All", "Active", "Draft", "Completed"] as const;

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

export function CampaignsListPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const filteredCampaigns = useMemo(() => {
    if (activeFilter === "All") return campaignsData;
    return campaignsData.filter(
      (campaign) => campaign.status === (activeFilter as CampaignStatus),
    );
  }, [activeFilter]);

  return (
    <div className="business-shell business-route-page">
      <BusinessHeader />

      <Container className="business-content">
        <header className="business-page-head">
          <div>
            <p>Campaigns</p>
            <h1>Manage all campaigns</h1>
          </div>
          <Link to="/campaigns/new" className="business-head-cta">
            + Create Campaign
          </Link>
        </header>

        <section className="filter-tabs" aria-label="Campaign status filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </section>

        <section className="campaign-card-grid" aria-label="Campaign list">
          {filteredCampaigns.map((campaign) => (
            <article key={campaign.id} className="campaign-card">
              <div className="campaign-card-top">
                <div className="campaign-card-title-wrap">
                  <div className="campaign-product-thumb">
                    <ImageWithFallback
                      src={campaign.productImageUrl}
                      alt={campaign.productImageAlt}
                      className="campaign-product-thumb-image"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h2>{campaign.name}</h2>
                    <p>{campaign.brand}</p>
                  </div>
                </div>
                <span
                  className={`campaign-status ${campaign.status.toLowerCase()}`}
                >
                  {campaign.status}
                </span>
              </div>

              <div className="campaign-card-stats">
                <p>Budget: {formatCurrency(campaign.budget)}</p>
                <p>KOLs: {campaign.kolCount}</p>
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

              <div className="campaign-card-actions">
                <Link to={`/campaigns/${campaign.id}`}>View Detail</Link>
                <button type="button">Edit</button>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </div>
  );
}
