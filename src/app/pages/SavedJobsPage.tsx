import { Heart, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Footer } from "../components/layout/Footer";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

const savedJobs = [
  {
    id: "saved-job-1",
    postedAt: "Posted 4 weeks ago",
    title: "Data Entry Specialist",
    meta: "Hourly: $15.00 - $47.00 - Intermediate - Est. time: Less than 1 month, Less than 30 hrs/week",
    description:
      "We are seeking a detail-oriented Data Entry Specialist to assist with accurate data handling. The ideal candidate will have experience in data entry and be proficient in using Microsoft Excel and Word. This is a one-time project with part-time engagement.",
    unavailable: false,
  },
  {
    id: "saved-job-2",
    postedAt: "Posted last quarter",
    title: "Simple Website Development for Business Plan",
    meta: "Fixed price - Intermediate - Est. budget: $350.00",
    description:
      "I'd like to create a 3-4 page website for my padel consulting company, focused on the management, development, and business growth of padel projects in the U.S. and internationally.",
    unavailable: true,
  },
] as const;

export function SavedJobsPage() {
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

      <Container className="saved-jobs-content">
        <Link to="/jobs" className="saved-jobs-return-link">
          &lt; return to search
        </Link>

        <section className="saved-jobs-list" aria-label="Saved jobs list">
          {savedJobs.map((job) => (
            <article
              key={job.id}
              className={`saved-job-card ${job.unavailable ? "unavailable" : ""}`}
            >
              <div className="saved-job-head-row">
                <div>
                  {job.unavailable && (
                    <p className="saved-job-unavailable">
                      Job is no longer available
                    </p>
                  )}
                  <p className="saved-job-posted">{job.postedAt}</p>
                  <h2>{job.title}</h2>
                </div>

                <div
                  className="saved-job-actions"
                  aria-label="Saved job actions"
                >
                  <button type="button" aria-label="Not interested">
                    <ThumbsDown size={18} />
                  </button>
                  <button type="button" aria-label="Saved job">
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
              </div>

              <p className="saved-job-payment">
                Payment unverified · 0 · $0 spent
              </p>
              <p className="saved-job-meta">{job.meta}</p>
              <p className="saved-job-description">{job.description}</p>
            </article>
          ))}
        </section>
      </Container>

      <Footer />
    </div>
  );
}
