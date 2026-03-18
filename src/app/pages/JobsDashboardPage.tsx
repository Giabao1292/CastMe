import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { JobCard } from "../components/dashboard/JobCard";
import { JobsFiltersPanel } from "../components/dashboard/JobsFiltersPanel";
import { PromoBanner } from "../components/dashboard/PromoBanner";
import { SidebarCard } from "../components/dashboard/SidebarCard";
import { TalentCard } from "../components/dashboard/TalentCard";
import { TalentFiltersPanel } from "../components/dashboard/TalentFiltersPanel";
import { Footer } from "../components/layout/Footer";
import {
  jobTabs,
  jobsData,
  profileSummary,
  promoSlides,
  talentProfiles,
} from "../components/dashboard/data";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

export function JobsDashboardPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");

  const filteredTalents = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) return talentProfiles;

    return talentProfiles.filter((profile) => {
      const haystack = [
        profile.name,
        profile.headline,
        profile.location,
        profile.bio,
        ...profile.skills,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [searchValue]);

  const filteredJobs = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) return jobsData;

    return jobsData.filter((job) => {
      const haystack = [
        job.title,
        job.metadata,
        job.description,
        job.location,
        ...job.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [searchValue]);

  const showTalentResults =
    selectedScope === "Talent" && searchValue.trim().length > 0;
  const showJobResults =
    selectedScope === "Jobs" && searchValue.trim().length > 0;

  return (
    <div className="dashboard-page app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container className="dashboard-content">
        {showTalentResults ? (
          <main className="talent-layout" aria-label="Talent search results">
            <TalentFiltersPanel />

            <section className="talent-results reveal-2">
              <div className="talent-results-head">
                <div>
                  <h2>Top talent matches for "{searchValue}"</h2>
                  <p>
                    Discover creators, studios, and professionals that fit your
                    campaign style.
                  </p>
                </div>

                <button type="button">Advanced search</button>
              </div>

              <div className="talent-chip-list-inline">
                <span>{filteredTalents.length} profiles found</span>
                <span>Best match first</span>
                <span>Verified profiles</span>
              </div>

              {filteredTalents.length > 0 ? (
                filteredTalents.map((profile) => (
                  <TalentCard key={profile.id} profile={profile} />
                ))
              ) : (
                <div className="talent-empty-state">
                  <h3>No talent found for "{searchValue}"</h3>
                  <p>Try another keyword like KOL, makeup, model, or nails.</p>
                </div>
              )}
            </section>
          </main>
        ) : showJobResults ? (
          <main className="jobs-search-layout" aria-label="Jobs search results">
            <JobsFiltersPanel />

            <section className="jobs-search-results reveal-2">
              <div className="jobs-search-results-head">
                <div>
                  <h2>Top jobs for "{searchValue}"</h2>
                  <p>
                    Discover campaigns that match your niche, audience type, and
                    preferred format.
                  </p>
                </div>

                <button type="button">Advanced search</button>
              </div>

              <div className="jobs-search-chip-list-inline">
                <span>{filteredJobs.length} jobs found</span>
                <span>Most relevant first</span>
                <span>Payment verified first</span>
              </div>

              {filteredJobs.length > 0 ? (
                filteredJobs.map((item) => (
                  <JobCard key={item.id} item={item} />
                ))
              ) : (
                <div className="jobs-empty-state">
                  <h3>No jobs found for "{searchValue}"</h3>
                  <p>
                    Try keywords like skincare, livestream, game launch, or
                    fashion campaign.
                  </p>
                </div>
              )}
            </section>
          </main>
        ) : (
          <main className="dashboard-grid" aria-label="Jobs dashboard">
            <section className="dashboard-left-column">
              <PromoBanner slides={promoSlides} />

              <div className="dashboard-job-search reveal-2" role="search">
                <Search size={20} />
                <input
                  placeholder="Search for jobs"
                  aria-label="Search for jobs"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </div>

              <section className="dashboard-job-section">
                <h3 className="dashboard-section-title reveal-2">
                  Jobs you might like
                </h3>

                <div
                  className="dashboard-tabs reveal-2"
                  role="tablist"
                  aria-label="Job filters"
                >
                  {jobTabs.map((tab, index) => (
                    <button
                      key={tab}
                      type="button"
                      className={index === 0 ? "active" : ""}
                      role="tab"
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <p className="dashboard-help-text reveal-2">
                  Browse jobs that match your experience to a client&apos;s
                  hiring preferences. Ordered by most relevant.
                </p>

                {jobsData.map((item) => (
                  <JobCard key={item.id} item={item} />
                ))}
              </section>
            </section>

            <aside
              className="dashboard-right-column"
              aria-label="Profile sidebar"
            >
              <SidebarCard revealClassName="reveal-2">
                <div className="dashboard-profile-top">
                  <div className="dashboard-profile-avatar">GT</div>
                  <div>
                    <h4 className="dashboard-profile-name">
                      {profileSummary.name}
                    </h4>
                    <p>{profileSummary.title}</p>
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/my-profile");
                  }}
                >
                  Complete your profile
                </a>

                <div className="dashboard-progress">
                  <div style={{ width: `${profileSummary.completion}%` }} />
                </div>
                <p className="dashboard-progress-label">
                  {profileSummary.completion}%
                </p>
              </SidebarCard>

              <SidebarCard title="Identity verification">
                <p>
                  Increase your profile visibility in search results and win
                  more work with an IDV Badge.
                </p>
                <a href="#" onClick={(event) => event.preventDefault()}>
                  Get an IDV Badge
                </a>
              </SidebarCard>

              <SidebarCard title="Promote with ads">
                <ul>
                  <li>
                    <span>Availability badge</span>
                    <span>Off</span>
                  </li>
                  <li>
                    <span>Boost your profile</span>
                    <span>Off</span>
                  </li>
                </ul>
                <a href="#" onClick={(event) => event.preventDefault()}>
                  Stats and trends
                </a>
              </SidebarCard>

              <SidebarCard title="Hearts: 0">
                <button
                  type="button"
                  className="dashboard-buy-btn"
                  onClick={() => navigate("/buy-hearts")}
                >
                  Buy Hearts
                </button>
                <a href="#" onClick={(event) => event.preventDefault()}>
                  View details
                </a>
              </SidebarCard>
            </aside>
          </main>
        )}
      </Container>

      <Footer />
    </div>
  );
}
