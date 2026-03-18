import {
  BriefcaseBusiness,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Gamepad2,
  MapPin,
  Megaphone,
  Sparkles,
  Video,
} from "lucide-react";

const campaignTypes = [
  "Product review",
  "Game promotion",
  "Brand launch",
  "Livestream sales",
] as const;

const platforms = ["TikTok", "Instagram", "YouTube", "Facebook"] as const;

const contentFormats = [
  "Short video",
  "Livestream",
  "Photo post",
  "Story set",
] as const;

const durations = [
  "Less than 1 week",
  "1 to 4 weeks",
  "1 to 3 months",
  "More than 3 months",
] as const;

const collapsedSections = [
  "Client history",
  "Payment verified",
  "Language",
] as const;

export function JobsFiltersPanel() {
  return (
    <aside className="jobs-filters reveal-1" aria-label="Jobs filters">
      <section className="jobs-filter-group jobs-filter-group-flat">
        <div className="jobs-filter-headline">
          <h3>
            <Megaphone size={14} />
            Campaign type
          </h3>
          <button type="button" aria-label="Collapse campaign type">
            <ChevronDown size={16} />
          </button>
        </div>

        {campaignTypes.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </section>

      <section className="jobs-filter-group">
        <div className="jobs-filter-headline">
          <h3>
            <Video size={14} />
            Content format
          </h3>
          <button type="button" aria-label="Collapse content format">
            <ChevronDown size={16} />
          </button>
        </div>

        {contentFormats.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </section>

      <section className="jobs-filter-group">
        <div className="jobs-filter-headline">
          <h3>
            <Gamepad2 size={14} />
            Platform focus
          </h3>
          <button type="button" aria-label="Collapse platform focus">
            <ChevronDown size={16} />
          </button>
        </div>

        {platforms.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </section>

      <section className="jobs-filter-group">
        <div className="jobs-filter-headline">
          <h3>
            <CircleDollarSign size={14} />
            Budget range
          </h3>
          <button type="button" aria-label="Collapse budget range">
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="jobs-rate-range">$100 - $1,000+</div>
      </section>

      <section className="jobs-filter-group">
        <div className="jobs-filter-headline">
          <h3>
            <Clock3 size={14} />
            Project duration
          </h3>
          <button type="button" aria-label="Collapse project duration">
            <ChevronDown size={16} />
          </button>
        </div>

        {durations.map((item) => (
          <label key={item}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </section>

      <section className="jobs-filter-group">
        <div className="jobs-filter-headline">
          <h3>
            <MapPin size={14} />
            Target market
          </h3>
          <button type="button" aria-label="Collapse target market">
            <ChevronDown size={16} />
          </button>
        </div>

        <select defaultValue="">
          <option value="" disabled>
            Select country or region
          </option>
          <option>Vietnam</option>
          <option>Singapore</option>
          <option>Thailand</option>
          <option>Global</option>
        </select>
      </section>

      <section className="jobs-filter-group">
        <div className="jobs-filter-headline">
          <h3>
            <BriefcaseBusiness size={14} />
            Experience level
          </h3>
          <button type="button" aria-label="Collapse experience level">
            <ChevronDown size={16} />
          </button>
        </div>

        <label>
          <input type="radio" name="job-level" defaultChecked />
          <span>Entry</span>
        </label>
        <label>
          <input type="radio" name="job-level" />
          <span>Intermediate</span>
        </label>
        <label>
          <input type="radio" name="job-level" />
          <span>Expert</span>
        </label>
      </section>

      <section className="jobs-filter-group">
        <div className="jobs-filter-headline">
          <h3>
            <Sparkles size={14} />
            Priority features
          </h3>
          <button type="button" aria-label="Collapse priority features">
            <ChevronDown size={16} />
          </button>
        </div>

        <label>
          <input type="checkbox" />
          <span>Fast response clients</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Verified payment only</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>High conversion campaigns</span>
        </label>
      </section>

      {collapsedSections.map((section) => (
        <section key={section} className="jobs-filter-collapsed-row">
          <span>{section}</span>
          <ChevronDown size={14} />
        </section>
      ))}
    </aside>
  );
}
