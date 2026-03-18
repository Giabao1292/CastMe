import {
  BadgeCheck,
  Flag,
  Heart,
  Link as LinkIcon,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Footer } from "../components/layout/Footer";
import { jobsData } from "../components/dashboard/data";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

export function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");

  const job = useMemo(
    () => jobsData.find((item) => item.id === jobId) ?? jobsData[0],
    [jobId],
  );

  return (
    <div className="dashboard-page app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container className="job-detail-content">
        <main className="job-detail-layout" aria-label="Job detail">
          <section className="job-detail-main">
            <Link to="/jobs" className="job-detail-return-link">
              &lt; return to search
            </Link>

            <article className="job-detail-card">
              <header className="job-detail-header">
                <h1>{job.title}</h1>
                <div className="job-detail-meta-top">
                  <span>{job.postedAt}</span>
                  <span>
                    <MapPin size={14} />
                    {job.location}
                  </span>
                </div>
              </header>

              <section className="job-detail-block">
                <h2>Summary</h2>
                <p>{job.description}</p>

                {job.campaignImageUrl && (
                  <div className="job-detail-media">
                    <ImageWithFallback
                      src={job.campaignImageUrl}
                      alt={
                        job.campaignImageAlt ?? `${job.title} campaign image`
                      }
                      className="job-detail-media-image"
                      loading="lazy"
                    />
                  </div>
                )}
              </section>

              <section className="job-detail-split-block">
                <div>
                  <h3>
                    {job.metadata.includes("Fixed")
                      ? "$350.00"
                      : "$25 - $45/hr"}
                  </h3>
                  <p>
                    {job.metadata.includes("Fixed")
                      ? "Fixed price"
                      : "Hourly rate"}
                  </p>
                </div>
                <div>
                  <h3>
                    {job.metadata.includes("Expert")
                      ? "Expert"
                      : "Intermediate"}
                  </h3>
                  <p>Experience level</p>
                </div>
                <div>
                  <h3>One-time project</h3>
                  <p>Project type</p>
                </div>
              </section>

              <section className="job-detail-block">
                <h2>Skills and expertise</h2>
                <p className="job-detail-small-title">Mandatory skills</p>
                <div className="job-detail-skill-chips">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>

              <section className="job-detail-grid-info">
                <div>
                  <h3>Preferred qualifications</h3>
                  <p>
                    Creators with proven campaign performance and clear
                    brand-safe communication.
                  </p>
                </div>
                <div>
                  <h3>Activity on this job</h3>
                  <ul>
                    <li>Proposals: {job.proposals}</li>
                    <li>Interviewing: 2</li>
                    <li>Invites sent: 4</li>
                    <li>Unanswered invites: 1</li>
                  </ul>
                </div>
              </section>
            </article>
          </section>

          <aside
            className="job-detail-side"
            aria-label="Client and apply panel"
          >
            <section className="job-detail-side-card">
              <p className="job-detail-connect-note">
                You&apos;ll need Hearts to bid. They&apos;re like credits that
                show clients you&apos;re serious.
              </p>
              <a href="#" onClick={(event) => event.preventDefault()}>
                Learn more
              </a>
            </section>

            <section className="job-detail-side-card">
              <button
                type="button"
                className="job-detail-primary-btn"
                onClick={() => navigate("/buy-hearts")}
              >
                Buy Hearts to apply
              </button>
              <button type="button" className="job-detail-secondary-btn">
                <Heart size={16} />
                Save job
              </button>
              <button type="button" className="job-detail-flag-btn">
                <Flag size={14} />
                Flag as inappropriate
              </button>

              <div className="job-detail-connect-stats">
                <p>Required Hearts to submit a proposal: 20</p>
                <p>Available Hearts: 0</p>
              </div>
            </section>

            <section className="job-detail-side-card">
              <h3>About the client</h3>
              <ul className="job-detail-client-points">
                <li>
                  <ShieldCheck size={14} />
                  Payment method verified
                </li>
                <li>
                  <BadgeCheck size={14} />
                  Phone number verified
                </li>
                <li>
                  <Star size={14} fill="currentColor" />
                  5.0 of 2 reviews
                </li>
              </ul>

              <p>USA</p>
              <p>8 jobs posted</p>
              <p>$3.3K total spent</p>
              <p>Member since Jan 10, 2024</p>

              <button type="button" className="job-detail-link-btn">
                <LinkIcon size={14} />
                Copy job link
              </button>
            </section>
          </aside>
        </main>
      </Container>

      <Footer />
    </div>
  );
}
