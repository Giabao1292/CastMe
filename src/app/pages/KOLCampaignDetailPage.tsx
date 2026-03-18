import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Copy,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  MessageSquare,
  MousePointerClick,
  PlayCircle,
  ShoppingCart,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

type ContractTask = {
  id: string;
  label: string;
  dueDate: string;
  done: boolean;
};

type ContractDetail = {
  id: string;
  title: string;
  brand: string;
  status: "At risk" | "On track" | "Client review";
  deadline: string;
  basePay: string;
  bonusPay: string;
  totalEarned: string;
  pendingPayout: string;
  affiliateLink: string;
  couponCode: string;
  notes: string;
  tasks: ContractTask[];
  performance: {
    views: string;
    clicks: string;
    sales: string;
    conversionRate: string;
  };
  dailySales: number[];
};

const contractDetails: ContractDetail[] = [
  {
    id: "ac-1",
    title: "TikTok Product Seeding - GlowLab Serum",
    brand: "GlowLab Vietnam",
    status: "At risk",
    deadline: "Mar 27, 2026",
    basePay: "$900",
    bonusPay: "$300",
    totalEarned: "$840",
    pendingPayout: "$360",
    affiliateLink: "https://castme.app/r/glowlab-serum-lebao",
    couponCode: "LEBAO10",
    notes:
      "Prioritize retention hook in first 2 seconds and include serum texture close-up.",
    tasks: [
      {
        id: "task-1",
        label: "Upload draft video #3 (problem/solution angle)",
        dueDate: "Mar 23",
        done: true,
      },
      {
        id: "task-2",
        label: "Record CTA cut with coupon code mention",
        dueDate: "Mar 24",
        done: false,
      },
      {
        id: "task-3",
        label: "Submit final package + caption copy",
        dueDate: "Mar 26",
        done: false,
      },
    ],
    performance: {
      views: "127,340",
      clicks: "8,956",
      sales: "214",
      conversionRate: "2.39%",
    },
    dailySales: [18, 26, 21, 30, 28, 37, 54],
  },
  {
    id: "ac-2",
    title: "Spring Livestream Host - Fashion Capsule",
    brand: "Mode House",
    status: "On track",
    deadline: "Apr 02, 2026",
    basePay: "$700",
    bonusPay: "$250",
    totalEarned: "$475",
    pendingPayout: "$475",
    affiliateLink: "https://castme.app/r/mode-house-live-lebao",
    couponCode: "MODESPRING",
    notes:
      "Pin product links in first 10 minutes and keep segment transitions under 20 seconds.",
    tasks: [
      {
        id: "task-1",
        label: "Finalize livestream agenda",
        dueDate: "Mar 28",
        done: true,
      },
      {
        id: "task-2",
        label: "Rehearse outfit switch timing",
        dueDate: "Mar 30",
        done: false,
      },
      {
        id: "task-3",
        label: "Run livestream and submit replay URL",
        dueDate: "Apr 02",
        done: false,
      },
    ],
    performance: {
      views: "84,915",
      clicks: "5,104",
      sales: "136",
      conversionRate: "2.66%",
    },
    dailySales: [12, 14, 19, 20, 24, 22, 25],
  },
  {
    id: "ac-3",
    title: "UGC Video Batch - Gaming Launch",
    brand: "NovaPlay Studio",
    status: "Client review",
    deadline: "Apr 10, 2026",
    basePay: "$1,200",
    bonusPay: "$300",
    totalEarned: "$1,100",
    pendingPayout: "$400",
    affiliateLink: "https://castme.app/r/novaplay-launch-lebao",
    couponCode: "NOVA5",
    notes:
      "Keep onboarding tutorial section under 35 seconds and highlight first-win moment.",
    tasks: [
      {
        id: "task-1",
        label: "Deliver cut #6 with in-app subtitles",
        dueDate: "Apr 04",
        done: true,
      },
      {
        id: "task-2",
        label: "Address client feedback on audio sync",
        dueDate: "Apr 05",
        done: true,
      },
      {
        id: "task-3",
        label: "Submit final publishing schedule",
        dueDate: "Apr 07",
        done: false,
      },
    ],
    performance: {
      views: "203,441",
      clicks: "14,882",
      sales: "322",
      conversionRate: "2.16%",
    },
    dailySales: [33, 35, 39, 41, 47, 56, 71],
  },
] as const;

export function KOLCampaignDetailPage() {
  const { contractId } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");
  const [copyFeedback, setCopyFeedback] = useState("Copy affiliate link");

  const contract = useMemo(
    () =>
      contractDetails.find((item) => item.id === contractId) ??
      contractDetails[0],
    [contractId],
  );

  const completedTasks = contract.tasks.filter((task) => task.done).length;

  const peakSales = Math.max(...contract.dailySales);

  const handleCopyAffiliateLink = async () => {
    try {
      await navigator.clipboard.writeText(contract.affiliateLink);
      setCopyFeedback("Copied");
      window.setTimeout(() => setCopyFeedback("Copy affiliate link"), 1600);
    } catch {
      setCopyFeedback("Copy failed");
      window.setTimeout(() => setCopyFeedback("Copy affiliate link"), 1600);
    }
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
            <p>Deliver work</p>
            <h1>Campaign detail</h1>
            <small>
              See everything needed to execute this campaign quickly and
              clearly.
            </small>
          </div>
          <Link
            to="/deliver-work/active-contracts"
            className="contracts-header-link"
          >
            Back to active contracts
          </Link>
        </header>

        <section
          className="kol-contract-hero-card"
          aria-label="Campaign summary"
        >
          <div>
            <p>{contract.brand}</p>
            <h2>{contract.title}</h2>
            <span className="kol-contract-deadline">
              <CalendarDays size={15} /> Deadline: {contract.deadline}
            </span>
          </div>
          <span
            className={`contract-status-pill ${contract.status
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {contract.status}
          </span>
        </section>

        <main
          className="kol-contract-grid"
          aria-label="Campaign execution detail"
        >
          <article className="kol-contract-card" aria-label="Earnings">
            <header>
              <h3>
                <CircleDollarSign size={18} /> Earnings
              </h3>
            </header>
            <div className="kol-earnings-grid">
              <div>
                <span>Base pay</span>
                <strong>{contract.basePay}</strong>
              </div>
              <div>
                <span>Bonus potential</span>
                <strong>{contract.bonusPay}</strong>
              </div>
              <div>
                <span>Total earned</span>
                <strong>{contract.totalEarned}</strong>
              </div>
              <div>
                <span>Pending payout</span>
                <strong>{contract.pendingPayout}</strong>
              </div>
            </div>
          </article>

          <article className="kol-contract-card" aria-label="Tasks">
            <header className="kol-card-head-split">
              <h3>
                <ClipboardCheck size={18} /> Tasks
              </h3>
              <strong>
                {completedTasks}/{contract.tasks.length} completed
              </strong>
            </header>
            <ul className="kol-task-list">
              {contract.tasks.map((task) => (
                <li key={task.id} className={task.done ? "is-done" : undefined}>
                  <span>
                    <CheckCircle2 size={15} />
                    {task.label}
                  </span>
                  <small>Due {task.dueDate}</small>
                </li>
              ))}
            </ul>
            <button type="button" className="kol-plain-action-btn">
              <FileText size={14} /> View full brief
            </button>
          </article>

          <article className="kol-contract-card" aria-label="Affiliate link">
            <header>
              <h3>
                <LinkIcon size={18} /> Affiliate link
              </h3>
            </header>
            <label className="kol-affiliate-field">
              <span>Tracking URL</span>
              <div>
                <input value={contract.affiliateLink} readOnly />
                <button type="button" onClick={handleCopyAffiliateLink}>
                  <Copy size={14} /> {copyFeedback}
                </button>
              </div>
            </label>
            <div className="kol-affiliate-meta">
              <p>
                <Target size={14} /> Coupon code: {contract.couponCode}
              </p>
              <p>
                <TrendingUp size={14} /> Use this exact link in caption and bio.
              </p>
            </div>
            <div className="kol-inline-actions">
              <button type="button" className="kol-plain-action-btn">
                <BarChart3 size={14} /> View link stats
              </button>
              <button type="button" className="kol-plain-action-btn">
                <ExternalLink size={14} /> Open preview
              </button>
            </div>
          </article>

          <article className="kol-contract-card" aria-label="Performance">
            <header>
              <h3>
                <PlayCircle size={18} /> Performance
              </h3>
            </header>
            <div className="kol-performance-grid">
              <p>
                <Video size={14} /> {contract.performance.views} views
              </p>
              <p>
                <MousePointerClick size={14} /> {contract.performance.clicks}{" "}
                clicks
              </p>
              <p>
                <ShoppingCart size={14} /> {contract.performance.sales} sales
              </p>
              <p>
                <TrendingUp size={14} /> {contract.performance.conversionRate}{" "}
                conversion
              </p>
            </div>

            <div className="kol-mini-chart" aria-label="Daily sales trend">
              {contract.dailySales.map((sales, index) => (
                <div key={`${contract.id}-day-${index}`}>
                  <span style={{ height: `${(sales / peakSales) * 100}%` }} />
                </div>
              ))}
            </div>

            <p className="kol-contract-note">{contract.notes}</p>
          </article>
        </main>

        <section className="kol-footer-actions" aria-label="Primary actions">
          <button type="button" className="kol-primary-action-btn">
            <Video size={16} /> Submit video
          </button>
          <button type="button" className="kol-secondary-action-btn">
            <MessageSquare size={16} /> Contact business
          </button>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
