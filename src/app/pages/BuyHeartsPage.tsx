import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

const buyOptions = [
  {
    value: "100",
    label: "100 for $15.00",
    priceText: "$15.00 + Tax",
    newBalance: 100,
  },
  {
    value: "200",
    label: "200 for $27.00",
    priceText: "$27.00 + Tax",
    newBalance: 200,
  },
  {
    value: "400",
    label: "400 for $50.00",
    priceText: "$50.00 + Tax",
    newBalance: 400,
  },
] as const;

export function BuyHeartsPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");
  const [selectedAmount, setSelectedAmount] =
    useState<(typeof buyOptions)[number]["value"]>("100");

  const selectedOption =
    buyOptions.find((item) => item.value === selectedAmount) ?? buyOptions[0];

  return (
    <div className="dashboard-page app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container className="buy-hearts-content">
        <main className="buy-hearts-card" aria-label="Buy Hearts">
          <div className="buy-hearts-main">
            <h1>Buy Hearts</h1>

            <div className="buy-hearts-field-block">
              <h2>Your available Hearts</h2>
              <p>0</p>
            </div>

            <div className="buy-hearts-field-block">
              <h2>Select the amount to buy</h2>
              <select
                value={selectedAmount}
                onChange={(event) =>
                  setSelectedAmount(
                    event.target.value as (typeof buyOptions)[number]["value"],
                  )
                }
              >
                {buyOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="buy-hearts-field-block">
              <h2>Your account will be charged</h2>
              <p>{selectedOption.priceText}</p>
            </div>

            <div className="buy-hearts-field-block">
              <h2>Your new Hearts balance will be</h2>
              <p>{selectedOption.newBalance}</p>
            </div>

            <div className="buy-hearts-field-block">
              <h2>These Hearts will expire on</h2>
              <p>March 18, 2027</p>
            </div>

            <div className="buy-hearts-field-block">
              <h2>Promo code</h2>
              <div className="buy-hearts-promo-row">
                <input placeholder="Enter code" aria-label="Promo code" />
                <button type="button">Apply</button>
              </div>
            </div>

            <p className="buy-hearts-note">
              This bundle of Hearts will expire 1 year from today. Unused Hearts
              rollover to the next month.{" "}
              <a href="#" onClick={(event) => event.preventDefault()}>
                Learn more
              </a>
            </p>
            <p className="buy-hearts-note">
              You&apos;re authorizing CastMe to charge your account. If you have
              sufficient funds, we will withdraw from your account balance. If
              not, the full amount will be charged to your primary billing
              method.{" "}
              <a href="#" onClick={(event) => event.preventDefault()}>
                Learn more
              </a>
            </p>

            <div className="buy-hearts-footer-actions">
              <button type="button" className="buy-hearts-cancel">
                Cancel
              </button>
              <button type="button" className="buy-hearts-confirm">
                Buy Hearts
              </button>
            </div>
          </div>

          <aside className="buy-hearts-side">
            <article className="membership-promo-box">
              <p>
                <Sparkles size={14} />
                Membership plans available
              </p>
              <h3>
                Upgrade to Plus for more monthly Hearts and better bidding
                insights.
              </h3>
              <button
                type="button"
                onClick={() => navigate("/membership-plans")}
              >
                View Membership Plans
                <ArrowRight size={16} />
              </button>
            </article>

            <Link to="/membership-plans" className="buy-hearts-back-link">
              <ArrowLeft size={16} />
              Compare all plans
            </Link>
          </aside>
        </main>
      </Container>

      <Footer />
    </div>
  );
}
