import { ChevronDown, CircleHelp } from "lucide-react";

const badgeOptions = [
  { name: "Top Rated Plus", tone: "pink" },
  { name: "Top Rated", tone: "blue" },
  { name: "Rising Talent", tone: "green" },
] as const;

const categoryOptions = [
  "KOL",
  "KOC",
  "Model",
  "Makeup Artist",
  "Nail Salon",
  "Enterprise & Shop",
] as const;

const platformOptions = [
  "TikTok",
  "Instagram",
  "Facebook",
  "YouTube",
  "Shopee Live",
] as const;

const skillsOptions = [
  "Product Review",
  "Livestream",
  "Photo Shooting",
  "UGC Video",
  "Campaign Seeding",
  "Script Writing",
] as const;

const collapsedSections = [
  "Job success",
  "Earned amount",
  "Hours billed",
  "English level",
  "Other languages",
] as const;

export function TalentFiltersPanel() {
  return (
    <aside className="talent-filters reveal-1" aria-label="Talent filters">
      <section className="talent-filter-group talent-filter-group-flat">
        <div className="talent-filter-headline">
          <h3>Talent badge</h3>
          <div className="talent-headline-tools">
            <CircleHelp size={13} />
            <button type="button" aria-label="Collapse talent badge">
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {badgeOptions.map((item) => (
          <label key={item.name}>
            <input type="checkbox" />
            <span className={`badge-dot badge-dot-${item.tone}`} />
            <span>{item.name}</span>
          </label>
        ))}
      </section>

      <section className="talent-filter-group talent-filter-group-flat">
        <div className="talent-filter-headline">
          <h3>Category</h3>
          <button type="button" aria-label="Collapse category">
            <ChevronDown size={16} />
          </button>
        </div>

        {categoryOptions.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </section>

      <section className="talent-filter-group talent-filter-group-flat">
        <div className="talent-filter-headline">
          <h3>Main platforms</h3>
          <button type="button" aria-label="Collapse platforms">
            <ChevronDown size={16} />
          </button>
        </div>

        {platformOptions.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </section>

      <section className="talent-filter-group talent-filter-group-flat">
        <div className="talent-filter-headline">
          <h3>Hourly rate</h3>
          <button type="button" aria-label="Collapse hourly rate">
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="talent-rate-range">$0-$20</div>
      </section>

      <section className="talent-filter-group talent-filter-group-flat">
        <div className="talent-filter-headline">
          <h3>Skills</h3>
          <button type="button" aria-label="Collapse skills">
            <ChevronDown size={16} />
          </button>
        </div>

        {skillsOptions.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}

        <button type="button" className="talent-see-more">
          See more
        </button>
      </section>

      <section className="talent-filter-group">
        <div className="talent-filter-headline">
          <h3>Location</h3>
          <button type="button" aria-label="Collapse location">
            <ChevronDown size={16} />
          </button>
        </div>

        <select defaultValue="">
          <option value="" disabled>
            City, country or region
          </option>
          <option>Ho Chi Minh City, Vietnam</option>
          <option>Hanoi, Vietnam</option>
          <option>Da Nang, Vietnam</option>
        </select>
      </section>

      <section className="talent-filter-group">
        <div className="talent-filter-headline">
          <h3>Talent time zones</h3>
          <button type="button" aria-label="Collapse time zones">
            <ChevronDown size={16} />
          </button>
        </div>

        <select defaultValue="">
          <option value="" disabled>
            Select talent time zones
          </option>
          <option>GMT+7 Vietnam</option>
          <option>GMT+8 Singapore</option>
          <option>GMT+9 Korea/Japan</option>
        </select>
      </section>

      <section className="talent-filter-group">
        <div className="talent-filter-headline">
          <h3>Talent type</h3>
          <button type="button" aria-label="Collapse talent type">
            <ChevronDown size={16} />
          </button>
        </div>

        <label>
          <input type="radio" name="talent-type" defaultChecked />
          <span>Creators & Studios</span>
        </label>
        <label>
          <input type="radio" name="talent-type" />
          <span>Individual creators</span>
        </label>
        <label>
          <input type="radio" name="talent-type" />
          <span>Businesses & shops</span>
        </label>

        <label>
          <input type="checkbox" />
          <span>Open to contract-to-hire</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Offers consultations</span>
        </label>
      </section>

      {collapsedSections.map((section) => (
        <section key={section} className="talent-filter-collapsed-row">
          <span>{section}</span>
          <ChevronDown size={14} />
        </section>
      ))}
    </aside>
  );
}
