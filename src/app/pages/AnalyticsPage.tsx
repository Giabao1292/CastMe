import { Container } from "react-bootstrap";
import { BusinessHeader } from "../components/business/BusinessHeader";
import "../../styles/business-dashboard.css";

export function AnalyticsPage() {
  return (
    <div className="business-shell business-route-page">
      <BusinessHeader />

      <Container className="business-content">
        <header className="business-page-head">
          <div>
            <p>Analytics</p>
            <h1>Cross-campaign insights</h1>
          </div>
        </header>

        <section
          className="business-panel analytics-placeholder"
          aria-label="Analytics overview"
        >
          <h2>Analytics dashboard coming next</h2>
          <p>
            Use Dashboard and Campaign Detail to track views, sales, and payout
            performance today.
          </p>
        </section>
      </Container>
    </div>
  );
}
