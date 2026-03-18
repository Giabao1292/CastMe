import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { BusinessHeader } from "../components/business/BusinessHeader";
import { campaignsData } from "../components/business/data";
import "../../styles/business-dashboard.css";

type WizardStep = 1 | 2 | 3 | 4;

interface CampaignDraft {
  campaignName: string;
  goal: string;
  platforms: string[];
  startDate: string;
  endDate: string;
  totalBudget: string;
  kolCount: string;
  basePayPerKol: string;
  bonusPerSale: string;
  milestoneCondition: string;
  milestoneReward: string;
  niche: string;
  followersMin: string;
  followersMax: string;
  location: string;
  requirementPlatforms: string[];
  contentTypes: string[];
  description: string;
  doList: string;
  dontList: string;
  hashtags: string;
}

const stepTitles: Record<WizardStep, string> = {
  1: "Basic Info",
  2: "Budget & Payment",
  3: "KOL Requirements",
  4: "Content Brief",
};

const platformOptions = ["TikTok", "Instagram", "YouTube"] as const;
const nicheOptions = ["Beauty", "Food", "Fashion", "Tech"] as const;
const contentTypeOptions = ["Review", "Unbox", "Tutorial", "Trend"] as const;

function parseNumber(value: string) {
  const cleaned = value.replace(/[^\d]/g, "");
  return cleaned ? Number(cleaned) : 0;
}

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

export function CreateCampaignPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<WizardStep>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<CampaignDraft>({
    campaignName: "",
    goal: "",
    platforms: [],
    startDate: "",
    endDate: "",
    totalBudget: "",
    kolCount: "",
    basePayPerKol: "",
    bonusPerSale: "",
    milestoneCondition: "",
    milestoneReward: "",
    niche: "",
    followersMin: "",
    followersMax: "",
    location: "",
    requirementPlatforms: [],
    contentTypes: [],
    description: "",
    doList: "",
    dontList: "",
    hashtags: "",
  });

  const numbers = useMemo(() => {
    const totalBudget = parseNumber(draft.totalBudget);
    const kolCount = parseNumber(draft.kolCount);
    const basePay = parseNumber(draft.basePayPerKol);
    const bonusPerSale = parseNumber(draft.bonusPerSale);
    const milestoneReward = parseNumber(draft.milestoneReward);

    const estimatedBaseCost = kolCount * basePay;
    const estimatedTotalPayout =
      estimatedBaseCost + kolCount * bonusPerSale + milestoneReward;

    return {
      totalBudget,
      kolCount,
      basePay,
      bonusPerSale,
      milestoneReward,
      estimatedBaseCost,
      estimatedTotalPayout,
    };
  }, [draft]);

  const baseCostExceedsBudget =
    numbers.totalBudget > 0 && numbers.estimatedBaseCost > numbers.totalBudget;

  const setField = <K extends keyof CampaignDraft>(
    key: K,
    value: CampaignDraft[K],
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleArrayField = (
    key: "platforms" | "requirementPlatforms" | "contentTypes",
    value: string,
  ) => {
    setDraft((prev) => {
      const exists = prev[key].includes(value);
      const next = exists
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];
      return { ...prev, [key]: next };
    });
  };

  const validateCurrentStep = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (!draft.campaignName.trim())
        nextErrors.campaignName = "Campaign name is required";
      if (!draft.goal.trim()) nextErrors.goal = "Goal is required";
      if (draft.platforms.length === 0)
        nextErrors.platforms = "Pick at least one platform";
    }

    if (step === 2) {
      if (numbers.totalBudget <= 0)
        nextErrors.totalBudget = "Total budget is required";
      if (numbers.kolCount <= 0)
        nextErrors.kolCount = "Number of KOLs is required";
      if (numbers.basePay <= 0)
        nextErrors.basePayPerKol = "Base pay per KOL is required";
    }

    if (step === 3) {
      if (!draft.niche) nextErrors.niche = "Please pick a niche";
    }

    if (step === 4) {
      if (!draft.description.trim())
        nextErrors.description = "Content brief is required";
      if (draft.contentTypes.length === 0)
        nextErrors.contentTypes = "Pick at least one content type";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setStep((prev) => (prev < 4 ? ((prev + 1) as WizardStep) : prev));
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => (prev > 1 ? ((prev - 1) as WizardStep) : prev));
  };

  const handleSaveDraft = () => {
    navigate("/campaigns");
  };

  const handleCreate = () => {
    if (!validateCurrentStep()) return;
    navigate(`/campaigns/${campaignsData[0].id}`);
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <section className="wizard-step-grid" aria-label="Step 1 Basic Info">
          <label>
            Campaign Name
            <input
              value={draft.campaignName}
              onChange={(event) => setField("campaignName", event.target.value)}
              placeholder="Example: Spring Lip Tint Launch"
            />
            {errors.campaignName ? <small>{errors.campaignName}</small> : null}
          </label>

          <label>
            Goal
            <input
              value={draft.goal}
              onChange={(event) => setField("goal", event.target.value)}
              placeholder="Example: Sell 1000 products"
            />
            {errors.goal ? <small>{errors.goal}</small> : null}
          </label>

          <div className="wizard-field-group">
            <p>Platform</p>
            <div className="wizard-pill-list">
              {platformOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={draft.platforms.includes(item) ? "active" : ""}
                  onClick={() => toggleArrayField("platforms", item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {errors.platforms ? <small>{errors.platforms}</small> : null}
          </div>

          <div className="wizard-inline-grid">
            <label>
              Start Date
              <input
                type="date"
                value={draft.startDate}
                onChange={(event) => setField("startDate", event.target.value)}
              />
            </label>

            <label>
              End Date
              <input
                type="date"
                value={draft.endDate}
                onChange={(event) => setField("endDate", event.target.value)}
              />
            </label>
          </div>
        </section>
      );
    }

    if (step === 2) {
      return (
        <section
          className="wizard-step-grid"
          aria-label="Step 2 Budget and Payment"
        >
          <div className="wizard-inline-grid">
            <label>
              Total Budget
              <input
                inputMode="numeric"
                value={draft.totalBudget}
                onChange={(event) =>
                  setField("totalBudget", event.target.value)
                }
                placeholder="12000000"
              />
              {errors.totalBudget ? <small>{errors.totalBudget}</small> : null}
            </label>

            <label>
              Number of KOLs
              <input
                inputMode="numeric"
                value={draft.kolCount}
                onChange={(event) => setField("kolCount", event.target.value)}
                placeholder="10"
              />
              {errors.kolCount ? <small>{errors.kolCount}</small> : null}
            </label>
          </div>

          <label>
            Base Pay per KOL
            <input
              inputMode="numeric"
              value={draft.basePayPerKol}
              onChange={(event) =>
                setField("basePayPerKol", event.target.value)
              }
              placeholder="500000"
            />
            {errors.basePayPerKol ? (
              <small>{errors.basePayPerKol}</small>
            ) : null}
          </label>

          <div className="wizard-inline-grid">
            <label>
              Bonus per sale (optional)
              <input
                inputMode="numeric"
                value={draft.bonusPerSale}
                onChange={(event) =>
                  setField("bonusPerSale", event.target.value)
                }
                placeholder="10000"
              />
            </label>

            <label>
              Bonus per milestone (optional)
              <input
                inputMode="numeric"
                value={draft.milestoneReward}
                onChange={(event) =>
                  setField("milestoneReward", event.target.value)
                }
                placeholder="500000"
              />
            </label>
          </div>

          <label>
            Milestone condition (optional)
            <input
              value={draft.milestoneCondition}
              onChange={(event) =>
                setField("milestoneCondition", event.target.value)
              }
              placeholder="Example: Reach 50k views"
            />
          </label>

          <article className="wizard-money-feedback">
            <p>
              Estimated base cost: {formatCurrency(numbers.estimatedBaseCost)}
            </p>
            {baseCostExceedsBudget ? (
              <strong>Warning: Base cost is higher than total budget.</strong>
            ) : (
              <strong>Base cost fits within your budget.</strong>
            )}
          </article>
        </section>
      );
    }

    if (step === 3) {
      return (
        <section
          className="wizard-step-grid"
          aria-label="Step 3 KOL Requirements"
        >
          <label>
            Niche
            <select
              value={draft.niche}
              onChange={(event) => setField("niche", event.target.value)}
            >
              <option value="">Select niche</option>
              {nicheOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.niche ? <small>{errors.niche}</small> : null}
          </label>

          <div className="wizard-inline-grid">
            <label>
              Followers Min
              <input
                inputMode="numeric"
                value={draft.followersMin}
                onChange={(event) =>
                  setField("followersMin", event.target.value)
                }
                placeholder="50000"
              />
            </label>

            <label>
              Followers Max
              <input
                inputMode="numeric"
                value={draft.followersMax}
                onChange={(event) =>
                  setField("followersMax", event.target.value)
                }
                placeholder="300000"
              />
            </label>
          </div>

          <label>
            Location (optional)
            <input
              value={draft.location}
              onChange={(event) => setField("location", event.target.value)}
              placeholder="Vietnam"
            />
          </label>

          <div className="wizard-field-group">
            <p>Platform (editable)</p>
            <div className="wizard-pill-list">
              {platformOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    (draft.requirementPlatforms.length > 0
                      ? draft.requirementPlatforms
                      : draft.platforms
                    ).includes(item)
                      ? "active"
                      : ""
                  }
                  onClick={() => toggleArrayField("requirementPlatforms", item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="wizard-step-grid" aria-label="Step 4 Content Brief">
        <div className="wizard-field-group">
          <p>Content Type</p>
          <div className="wizard-pill-list">
            {contentTypeOptions.map((item) => (
              <button
                key={item}
                type="button"
                className={draft.contentTypes.includes(item) ? "active" : ""}
                onClick={() => toggleArrayField("contentTypes", item)}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.contentTypes ? <small>{errors.contentTypes}</small> : null}
        </div>

        <label>
          Description
          <textarea
            value={draft.description}
            onChange={(event) => setField("description", event.target.value)}
            placeholder="Write a short and clear brief for KOL/KOC..."
            rows={4}
          />
          {errors.description ? <small>{errors.description}</small> : null}
        </label>

        <label>
          Do
          <textarea
            value={draft.doList}
            onChange={(event) => setField("doList", event.target.value)}
            placeholder="One item per line"
            rows={3}
          />
        </label>

        <label>
          Don't
          <textarea
            value={draft.dontList}
            onChange={(event) => setField("dontList", event.target.value)}
            placeholder="One item per line"
            rows={3}
          />
        </label>

        <label>
          Hashtags (optional)
          <input
            value={draft.hashtags}
            onChange={(event) => setField("hashtags", event.target.value)}
            placeholder="#castme #beauty"
          />
        </label>
      </section>
    );
  };

  return (
    <div className="business-shell business-route-page">
      <BusinessHeader />

      <Container className="business-content">
        <header className="business-page-head">
          <div>
            <p>Campaigns</p>
            <h1>Create Campaign</h1>
          </div>
        </header>

        <div
          className="create-campaign-layout"
          aria-label="Create campaign wizard"
        >
          <main className="create-campaign-form-card">
            <div className="wizard-progress" aria-label="Progress indicator">
              {[1, 2, 3, 4].map((item) => (
                <article
                  key={item}
                  className={`wizard-step-pill ${step >= item ? "active" : ""}`}
                >
                  <span>Step {item}</span>
                  <strong>{stepTitles[item as WizardStep]}</strong>
                </article>
              ))}
            </div>

            <section className="wizard-step-panel">
              <header>
                <h2>{stepTitles[step]}</h2>
                <p>Step {step} of 4</p>
              </header>
              {renderStepContent()}
            </section>

            <footer className="wizard-actions">
              <div>
                {step > 1 ? (
                  <button
                    type="button"
                    className="wizard-back-btn"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                ) : null}
              </div>

              <div className="wizard-actions-right">
                <button
                  type="button"
                  className="wizard-draft-btn"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    className="wizard-next-btn"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="wizard-create-btn"
                    onClick={handleCreate}
                  >
                    Create Campaign
                  </button>
                )}
              </div>
            </footer>
          </main>

          <aside
            className="create-campaign-preview-card"
            aria-label="Live campaign preview"
          >
            <h3>Live Preview</h3>

            <div className="preview-list">
              <article>
                <small>Campaign Name</small>
                <strong>{draft.campaignName || "Your campaign name"}</strong>
              </article>
              <article>
                <small>Goal</small>
                <strong>{draft.goal || "Your campaign goal"}</strong>
              </article>
              <article>
                <small>Platform</small>
                <strong>
                  {(draft.requirementPlatforms.length > 0
                    ? draft.requirementPlatforms
                    : draft.platforms
                  ).join(", ") || "TikTok, Instagram, YouTube"}
                </strong>
              </article>
              <article>
                <small>Total Budget</small>
                <strong>{formatCurrency(numbers.totalBudget)}</strong>
              </article>
              <article>
                <small>KOL Count</small>
                <strong>{numbers.kolCount || 0}</strong>
              </article>
              <article>
                <small>Base Pay / KOL</small>
                <strong>{formatCurrency(numbers.basePay)}</strong>
              </article>
              <article>
                <small>Bonus / Sale</small>
                <strong>{formatCurrency(numbers.bonusPerSale)}</strong>
              </article>
              <article>
                <small>Milestone Bonus</small>
                <strong>{formatCurrency(numbers.milestoneReward)}</strong>
              </article>
              <article className="preview-estimated">
                <small>Estimated Total Payout</small>
                <strong>{formatCurrency(numbers.estimatedTotalPayout)}</strong>
              </article>
            </div>

            {baseCostExceedsBudget ? (
              <p className="preview-warning">
                Base payout is over budget. Please adjust budget or KOL setup.
              </p>
            ) : null}
          </aside>
        </div>
      </Container>
    </div>
  );
}
