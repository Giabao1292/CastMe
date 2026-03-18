import { ArrowLeft, CircleHelp, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

const basicFeatures = [
  "5% service fee on Direct Contracts",
  "Limited access to Uma",
  "10 Hearts per month",
] as const;

const plusFeatures = [
  "0% service fee on Direct Contracts",
  "Unlimited access to Uma",
  "100 Hearts per month",
  "Personalized job alerts",
  "Proposal insights",
  "Custom profile URL",
  "Always-active profile",
  "Private earnings setting",
] as const;

export function MembershipPlansPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");

  return (
    <div className="dashboard-page app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container className="membership-content">
        <Link to="/buy-hearts" className="membership-back-link">
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1>Membership plans</h1>

        <main className="membership-grid" aria-label="Membership plans">
          <article className="membership-card basic">
            <h2>Basic</h2>
            <p className="membership-price">Free</p>
            <p className="membership-subtitle">
              Essential features to build your freelance career
            </p>
            <button type="button" disabled>
              Current plan
            </button>

            <ul>
              {basicFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="membership-card plus">
            <span className="membership-popular-pill">POPULAR</span>
            <h2>Plus</h2>
            <p className="membership-price">
              <del>$19.99 per month*</del>
              <strong>Try one month for $9.99</strong>
            </p>
            <p className="membership-subtitle">
              Win more work with competitive tools
            </p>
            <button type="button">Upgrade</button>

            <ul>
              {plusFeatures.map((item) => (
                <li key={item}>
                  {item}
                  {(item.includes("Uma") ||
                    item.includes("Direct Contracts")) && (
                    <CircleHelp size={13} />
                  )}
                </li>
              ))}
            </ul>
          </article>
        </main>

        <section className="membership-footnote" aria-label="Plan benefit note">
          <Star size={14} fill="currentColor" />
          Plus plan members receive priority support and campaign-level bidding
          analytics.
        </section>
      </Container>

      <Footer />
    </div>
  );
}
