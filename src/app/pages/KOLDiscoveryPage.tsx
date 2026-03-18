import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { BusinessHeader } from "../components/business/BusinessHeader";
import { TalentCard } from "../components/dashboard/TalentCard";
import { TalentFiltersPanel } from "../components/dashboard/TalentFiltersPanel";
import { talentProfiles } from "../components/dashboard/data";
import "../../styles/business-dashboard.css";
import "../../styles/jobs-dashboard.css";

export function KOLDiscoveryPage() {
  const [searchValue, setSearchValue] = useState("");

  const filteredKols = useMemo(() => {
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

  return (
    <div className="business-shell business-route-page">
      <BusinessHeader />

      <Container className="business-content">
        <div className="business-talent-shell">
          <div className="find-talents-search-head" role="search">
            <label
              className="find-talents-search-box"
              aria-label="Search talents"
            >
              <Search size={22} />
              <input
                placeholder="Search talents"
                aria-label="Search for talents"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchValue("")}
              >
                <X size={16} />
              </button>
            </label>
          </div>

          <main className="talent-layout" aria-label="Find talents results">
            <TalentFiltersPanel />

            <section
              className="talent-results reveal-2"
              aria-label="Talent list"
            >
              <h3 className="dashboard-section-title">
                Talents you might like
              </h3>

              <div
                className="dashboard-tabs"
                role="tablist"
                aria-label="Talent filters"
              >
                <button type="button" className="active" role="tab">
                  Best Matches
                </button>
                <button type="button" role="tab">
                  Most Relevant
                </button>
                <button type="button" role="tab">
                  KOL / KOC / Model / Nails
                </button>
              </div>

              <p className="dashboard-help-text">
                Browse KOL, KOC, model, and nails talents that match your
                campaign style.
              </p>

              <div className="business-talent-list">
                {filteredKols.length > 0 ? (
                  filteredKols.map((profile) => (
                    <TalentCard key={profile.id} profile={profile} />
                  ))
                ) : (
                  <div className="talent-empty-state">
                    <h3>No talents found for "{searchValue}"</h3>
                    <p>Try keywords like KOL, KOC, model, nails, makeup.</p>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </Container>
    </div>
  );
}
