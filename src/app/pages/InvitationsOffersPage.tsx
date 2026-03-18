import { CalendarDays, CircleDollarSign, Goal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

type InvitationItem = {
  id: string;
  campaignName: string;
  basePayment: number;
  bonusPayment: number;
  shortGoal: string;
  duration: string;
  deadline: string;
  tasks: string[];
  contentBrief: string;
};

const invitations: InvitationItem[] = [
  {
    id: "inv-1",
    campaignName: "GlowLab Serum Spring Push",
    basePayment: 800,
    bonusPayment: 250,
    shortGoal: "Drive first-time purchases with affiliate code",
    duration: "14 days",
    deadline: "Apr 05, 2026",
    tasks: [
      "Create 2 short videos (15-30s)",
      "Post 1 story with swipe-up link",
      "Pin affiliate link in bio for campaign period",
    ],
    contentBrief:
      "Show before/after skin texture and include a direct call-to-action in first 5 seconds.",
  },
  {
    id: "inv-2",
    campaignName: "Mode House Live Capsule Drop",
    basePayment: 650,
    bonusPayment: 200,
    shortGoal: "Increase livestream click-through to product pages",
    duration: "10 days",
    deadline: "Apr 08, 2026",
    tasks: [
      "Host 1 livestream session (45 minutes)",
      "Mention promo code at least 3 times",
      "Upload recap post after livestream",
    ],
    contentBrief:
      "Focus on fit, styling tips, and quick product comparisons to support fast buying decisions.",
  },
  {
    id: "inv-3",
    campaignName: "NovaPlay New Season Launch",
    basePayment: 1000,
    bonusPayment: 300,
    shortGoal: "Drive installs from gameplay highlight content",
    duration: "21 days",
    deadline: "Apr 16, 2026",
    tasks: [
      "Record 3 gameplay shorts",
      "Add install CTA in every caption",
      "Share one weekly performance screenshot",
    ],
    contentBrief:
      "Show early win moments, simple onboarding, and clear install steps to reduce drop-off.",
  },
];

function formatMoney(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function InvitationsOffersPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");
  const [activeInvitation, setActiveInvitation] =
    useState<InvitationItem | null>(null);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);

  const totalPotential = useMemo(
    () =>
      invitations.reduce(
        (sum, item) => sum + item.basePayment + item.bonusPayment,
        0,
      ),
    [],
  );

  const handleAccept = (id: string) => {
    setAcceptedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveInvitation((current) => (current?.id === id ? null : current));
  };

  const handleDecline = () => {
    setActiveInvitation(null);
  };

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
            <p>Find work</p>
            <h1>Invitations and offers</h1>
            <small>Quickly decide based on money, tasks, and deadline.</small>
          </div>
        </header>

        <section className="contracts-kpi-grid" aria-label="Invitation summary">
          <article className="contracts-kpi-card">
            <Goal size={16} />
            <span>{invitations.length} invitations</span>
          </article>
          <article className="contracts-kpi-card">
            <CircleDollarSign size={16} />
            <span>{formatMoney(totalPotential)} max potential</span>
          </article>
          <article className="contracts-kpi-card">
            <CalendarDays size={16} />
            <span>{acceptedIds.length} accepted</span>
          </article>
        </section>

        <main
          className="invitation-list"
          aria-label="Invitations and offers list"
        >
          {invitations.map((item) => {
            const isAccepted = acceptedIds.includes(item.id);
            return (
              <article className="invitation-card" key={item.id}>
                <div className="invitation-card-head">
                  <div>
                    <h2>{item.campaignName}</h2>
                    <p>
                      {formatMoney(item.basePayment)} base +{" "}
                      {formatMoney(item.bonusPayment)} bonus
                    </p>
                  </div>
                  {isAccepted && (
                    <span className="invitation-accepted-pill">Accepted</span>
                  )}
                </div>

                <div className="invitation-meta-grid">
                  <p>
                    <Goal size={14} /> Goal: {item.shortGoal}
                  </p>
                  <p>
                    <CalendarDays size={14} /> Duration: {item.duration}
                  </p>
                </div>

                <div className="invitation-card-actions">
                  <button
                    type="button"
                    className="invitation-secondary-btn"
                    onClick={() => setActiveInvitation(item)}
                  >
                    View detail
                  </button>
                  <button
                    type="button"
                    className="invitation-primary-btn"
                    onClick={() => handleAccept(item.id)}
                    disabled={isAccepted}
                  >
                    {isAccepted ? "Accepted" : "Accept"}
                  </button>
                </div>
              </article>
            );
          })}
        </main>
      </Container>

      {activeInvitation && (
        <div className="invitation-modal-backdrop" role="presentation">
          <section
            className="invitation-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Invitation detail"
          >
            <header className="invitation-modal-head">
              <h2>{activeInvitation.campaignName}</h2>
              <button
                type="button"
                className="invitation-close-btn"
                onClick={() => setActiveInvitation(null)}
                aria-label="Close detail"
              >
                <X size={16} />
              </button>
            </header>

            <section className="invitation-modal-block">
              <h3>Payment breakdown</h3>
              <p>Base: {formatMoney(activeInvitation.basePayment)}</p>
              <p>Bonus: {formatMoney(activeInvitation.bonusPayment)}</p>
              <p>
                Total potential:{" "}
                {formatMoney(
                  activeInvitation.basePayment + activeInvitation.bonusPayment,
                )}
              </p>
            </section>

            <section className="invitation-modal-block">
              <h3>Tasks</h3>
              <ul>
                {activeInvitation.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </section>

            <section className="invitation-modal-block">
              <h3>Deadline</h3>
              <p>{activeInvitation.deadline}</p>
            </section>

            <section className="invitation-modal-block">
              <h3>Content brief</h3>
              <p>{activeInvitation.contentBrief}</p>
            </section>

            <footer className="invitation-modal-actions">
              <button
                type="button"
                className="invitation-primary-btn"
                onClick={() => handleAccept(activeInvitation.id)}
              >
                Accept
              </button>
              <button
                type="button"
                className="invitation-secondary-btn"
                onClick={handleDecline}
              >
                Decline
              </button>
            </footer>
          </section>
        </div>
      )}

      <Footer />
    </div>
  );
}
