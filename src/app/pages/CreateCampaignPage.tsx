import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { BusinessHeader } from "../components/business/BusinessHeader";
import { campaignsData } from "../components/business/data";
import "../../styles/business-dashboard.css";

type ProjectType = "performance" | "fixed";

interface CollaborationDraft {
  projectName: string;
  objective: string;
  platforms: string[];
  startDate: string;
  endDate: string;
  totalBudget: string;
  kolCount: string;
  basePayPerKol: string;
  bonusPerSale: string;
  milestoneReward: string;
  niche: string;
  followerRange: string;
  regions: string[];
  contentTypes: string[];
  description: string;
  doList: string;
  dontList: string;
  hashtags: string;
  deliverableType: string;
  fixedDescription: string;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  fixedPrice: string;
  quantity: string;
  taskDescription: string;
  fixedDoList: string;
  fixedDontList: string;
  castingMethod: "direct" | "auto";
}

const platformOptions = ["TikTok", "Instagram", "YouTube"] as const;
const nicheOptions = [
  "Beauty",
  "Lifestyle",
  "Food",
  "Fashion",
  "Tech",
] as const;
const contentTypeOptions = ["Review", "Unbox", "Tutorial", "Trend"] as const;
const regionOptions = [
  "Vietnam",
  "Singapore",
  "Thailand",
  "Indonesia",
] as const;
const deliverableOptions = [
  "TikTok Video",
  "Instagram Reel",
  "YouTube Video",
] as const;

const performanceSteps = [
  "Basic Info",
  "Budget & Payment",
  "KOL Requirements",
  "Content Brief",
] as const;

const fixedSteps = [
  "Basic Information",
  "Project Schedule",
  "Budget & Investment",
  "Campaign Requirements",
  "Casting Method",
] as const;

function parseNumber(value: string) {
  const cleaned = value.replace(/[^\d]/g, "");
  return cleaned ? Number(cleaned) : 0;
}

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")} VND`;
}

function getStepDescription(type: ProjectType, step: number) {
  if (type === "performance") {
    if (step === 1) return "Define the core identity and KPI direction.";
    if (step === 2) return "Set clear budget and expected payout logic.";
    if (step === 3) return "Describe ideal creator profile and market focus.";
    return "Write actionable content instructions for creators.";
  }

  if (step === 1) return "Define the scope and deliverable format.";
  if (step === 2) return "Plan a clear timeline for execution.";
  if (step === 3) return "Set fixed fee and quantity commitment.";
  if (step === 4) return "State instructions, do's and don'ts.";
  return "Choose how creators are selected for this project.";
}

export function CreateCampaignPage() {
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<CollaborationDraft>({
    projectName: "",
    objective: "",
    platforms: [],
    startDate: "",
    endDate: "",
    totalBudget: "",
    kolCount: "",
    basePayPerKol: "",
    bonusPerSale: "",
    milestoneReward: "",
    niche: "",
    followerRange: "Micro (10k - 50k)",
    regions: ["Vietnam"],
    contentTypes: [],
    description: "",
    doList: "",
    dontList: "",
    hashtags: "",
    deliverableType: "TikTok Video",
    fixedDescription: "",
    scheduleDate: "",
    startTime: "",
    endTime: "",
    fixedPrice: "",
    quantity: "1",
    taskDescription: "",
    fixedDoList: "",
    fixedDontList: "",
    castingMethod: "direct",
  });

  const activeSteps = projectType === "fixed" ? fixedSteps : performanceSteps;

  const numbers = useMemo(() => {
    const totalBudget = parseNumber(draft.totalBudget);
    const kolCount = parseNumber(draft.kolCount);
    const basePay = parseNumber(draft.basePayPerKol);
    const bonusPerSale = parseNumber(draft.bonusPerSale);
    const milestoneReward = parseNumber(draft.milestoneReward);
    const fixedPrice = parseNumber(draft.fixedPrice);
    const quantity = parseNumber(draft.quantity);

    const estimatedBaseCost = kolCount * basePay;
    const estimatedTotalPayout =
      estimatedBaseCost + kolCount * bonusPerSale + milestoneReward;
    const fixedTotalCost = fixedPrice * Math.max(quantity, 1);

    return {
      totalBudget,
      kolCount,
      basePay,
      bonusPerSale,
      milestoneReward,
      estimatedBaseCost,
      estimatedTotalPayout,
      fixedPrice,
      quantity,
      fixedTotalCost,
    };
  }, [draft]);

  const baseCostExceedsBudget =
    numbers.totalBudget > 0 && numbers.estimatedBaseCost > numbers.totalBudget;

  const setField = <K extends keyof CollaborationDraft>(
    key: K,
    value: CollaborationDraft[K],
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleArrayField = (
    key: "platforms" | "contentTypes" | "regions",
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
    if (!projectType) {
      setErrors({});
      return false;
    }

    const nextErrors: Record<string, string> = {};

    if (projectType === "performance") {
      if (step === 1) {
        if (!draft.projectName.trim())
          nextErrors.projectName = "Project name is required";
        if (!draft.objective.trim())
          nextErrors.objective = "Objective is required";
        if (draft.platforms.length === 0)
          nextErrors.platforms = "Pick at least one platform";
      }

      if (step === 2) {
        if (numbers.totalBudget <= 0)
          nextErrors.totalBudget = "Total budget is required";
        if (numbers.kolCount <= 0)
          nextErrors.kolCount = "KOL count is required";
        if (numbers.basePay <= 0)
          nextErrors.basePayPerKol = "Base pay per KOL is required";
      }

      if (step === 3) {
        if (!draft.niche.trim()) nextErrors.niche = "Please pick a niche";
      }

      if (step === 4) {
        if (draft.contentTypes.length === 0)
          nextErrors.contentTypes = "Pick at least one content type";
        if (!draft.description.trim())
          nextErrors.description = "Content brief is required";
      }
    }

    if (projectType === "fixed") {
      if (step === 1) {
        if (!draft.projectName.trim())
          nextErrors.projectName = "Project title is required";
        if (!draft.deliverableType.trim())
          nextErrors.deliverableType = "Deliverable type is required";
        if (!draft.fixedDescription.trim())
          nextErrors.fixedDescription = "Description is required";
      }

      if (step === 2) {
        if (!draft.scheduleDate)
          nextErrors.scheduleDate = "Schedule date is required";
        if (!draft.startTime) nextErrors.startTime = "Start time is required";
        if (!draft.endTime) nextErrors.endTime = "End time is required";
      }

      if (step === 3) {
        if (numbers.fixedPrice <= 0)
          nextErrors.fixedPrice = "Fixed price is required";
        if (numbers.quantity <= 0)
          nextErrors.quantity = "Quantity must be at least 1";
      }

      if (step === 4) {
        if (!draft.taskDescription.trim())
          nextErrors.taskDescription = "Task description is required";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleBack = () => {
    setErrors({});

    if (!projectType) {
      navigate("/campaigns");
      return;
    }

    if (step === 1) {
      setProjectType(null);
      return;
    }

    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (!projectType) return;
    if (!validateCurrentStep()) return;
    setStep((prev) => Math.min(prev + 1, activeSteps.length));
  };

  const handleSaveDraft = () => {
    navigate("/campaigns");
  };

  const handleCreate = () => {
    if (!projectType) return;
    if (!validateCurrentStep()) return;
    navigate(`/campaigns/${campaignsData[0].id}`);
  };

  const renderPerformanceStep = () => {
    if (step === 1) {
      return (
        <section className="wizard-step-grid" aria-label="Step 1 Basic Info">
          <label>
            Project Name
            <input
              value={draft.projectName}
              onChange={(event) => setField("projectName", event.target.value)}
              placeholder="Example: Summer Solstice Launch"
            />
            {errors.projectName ? <small>{errors.projectName}</small> : null}
          </label>

          <label>
            Objective
            <input
              value={draft.objective}
              onChange={(event) => setField("objective", event.target.value)}
              placeholder="Example: Conversion / Sales"
            />
            {errors.objective ? <small>{errors.objective}</small> : null}
          </label>

          <div className="wizard-field-group">
            <p>Platforms</p>
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
                placeholder="5000000"
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
              placeholder="250000"
            />
            {errors.basePayPerKol ? (
              <small>{errors.basePayPerKol}</small>
            ) : null}
          </label>

          <div className="wizard-inline-grid">
            <label>
              Bonus per Sale
              <input
                inputMode="numeric"
                value={draft.bonusPerSale}
                onChange={(event) =>
                  setField("bonusPerSale", event.target.value)
                }
                placeholder="15000"
              />
            </label>

            <label>
              Milestone Bonus
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

          <article className="wizard-money-feedback">
            <p>
              Estimated base cost: {formatCurrency(numbers.estimatedBaseCost)}
            </p>
            <strong>
              {baseCostExceedsBudget
                ? "Base cost is over budget, consider adjusting budget or KOL count."
                : "Base cost is within planned budget."}
            </strong>
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
            Niche / Category
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
              Follower Range
              <select
                value={draft.followerRange}
                onChange={(event) =>
                  setField("followerRange", event.target.value)
                }
              >
                <option>Micro (10k - 50k)</option>
                <option>Mid (50k - 250k)</option>
                <option>Macro (250k - 1M)</option>
              </select>
            </label>

            <div className="wizard-field-group">
              <p>Region</p>
              <div className="wizard-pill-list compact">
                {regionOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={draft.regions.includes(item) ? "active" : ""}
                    onClick={() => toggleArrayField("regions", item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
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
            placeholder="Briefly explain campaign vibe and objective..."
            rows={4}
          />
          {errors.description ? <small>{errors.description}</small> : null}
        </label>

        <div className="wizard-inline-grid">
          <label>
            The Do's
            <textarea
              value={draft.doList}
              onChange={(event) => setField("doList", event.target.value)}
              placeholder="Clear call to action, natural framing..."
              rows={3}
            />
          </label>

          <label>
            The Don'ts
            <textarea
              value={draft.dontList}
              onChange={(event) => setField("dontList", event.target.value)}
              placeholder="No competitor mention, no profanity..."
              rows={3}
            />
          </label>
        </div>

        <label>
          Campaign Hashtags
          <input
            value={draft.hashtags}
            onChange={(event) => setField("hashtags", event.target.value)}
            placeholder="#SummerVibe #CastMePartner"
          />
        </label>
      </section>
    );
  };

  const renderFixedStep = () => {
    if (step === 1) {
      return (
        <section
          className="wizard-step-grid"
          aria-label="Step 1 Basic Information"
        >
          <label>
            Project Title
            <input
              value={draft.projectName}
              onChange={(event) => setField("projectName", event.target.value)}
              placeholder="Example: Summer Solstice Product Launch"
            />
            {errors.projectName ? <small>{errors.projectName}</small> : null}
          </label>

          <label>
            Deliverable Type
            <select
              value={draft.deliverableType}
              onChange={(event) =>
                setField("deliverableType", event.target.value)
              }
            >
              {deliverableOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Description
            <textarea
              value={draft.fixedDescription}
              onChange={(event) =>
                setField("fixedDescription", event.target.value)
              }
              placeholder="Briefly describe this fixed collaboration..."
              rows={4}
            />
            {errors.fixedDescription ? (
              <small>{errors.fixedDescription}</small>
            ) : null}
          </label>
        </section>
      );
    }

    if (step === 2) {
      return (
        <section
          className="wizard-step-grid"
          aria-label="Step 2 Project Schedule"
        >
          <label>
            Schedule Date
            <input
              type="date"
              value={draft.scheduleDate}
              onChange={(event) => setField("scheduleDate", event.target.value)}
            />
            {errors.scheduleDate ? <small>{errors.scheduleDate}</small> : null}
          </label>

          <div className="wizard-inline-grid">
            <label>
              Start Time
              <input
                type="time"
                value={draft.startTime}
                onChange={(event) => setField("startTime", event.target.value)}
              />
              {errors.startTime ? <small>{errors.startTime}</small> : null}
            </label>

            <label>
              End Time
              <input
                type="time"
                value={draft.endTime}
                onChange={(event) => setField("endTime", event.target.value)}
              />
              {errors.endTime ? <small>{errors.endTime}</small> : null}
            </label>
          </div>
        </section>
      );
    }

    if (step === 3) {
      return (
        <section
          className="wizard-step-grid"
          aria-label="Step 3 Budget and Investment"
        >
          <div className="wizard-inline-grid">
            <label>
              Fixed Price (per deliverable)
              <input
                inputMode="numeric"
                value={draft.fixedPrice}
                onChange={(event) => setField("fixedPrice", event.target.value)}
                placeholder="500000"
              />
              {errors.fixedPrice ? <small>{errors.fixedPrice}</small> : null}
            </label>

            <label>
              Quantity
              <input
                inputMode="numeric"
                value={draft.quantity}
                onChange={(event) => setField("quantity", event.target.value)}
                placeholder="1"
              />
              {errors.quantity ? <small>{errors.quantity}</small> : null}
            </label>
          </div>

          <article className="wizard-money-feedback">
            <p>Estimated total commitment</p>
            <strong>{formatCurrency(numbers.fixedTotalCost)}</strong>
          </article>
        </section>
      );
    }

    if (step === 4) {
      return (
        <section
          className="wizard-step-grid"
          aria-label="Step 4 Campaign Requirements"
        >
          <label>
            Task Description
            <textarea
              value={draft.taskDescription}
              onChange={(event) =>
                setField("taskDescription", event.target.value)
              }
              placeholder="Step-by-step instructions for creator output..."
              rows={4}
            />
            {errors.taskDescription ? (
              <small>{errors.taskDescription}</small>
            ) : null}
          </label>

          <div className="wizard-inline-grid">
            <label>
              The Do's
              <textarea
                value={draft.fixedDoList}
                onChange={(event) =>
                  setField("fixedDoList", event.target.value)
                }
                placeholder="Natural lighting, mention brand values..."
                rows={3}
              />
            </label>

            <label>
              The Don'ts
              <textarea
                value={draft.fixedDontList}
                onChange={(event) =>
                  setField("fixedDontList", event.target.value)
                }
                placeholder="No competitor logos, no profanity..."
                rows={3}
              />
            </label>
          </div>
        </section>
      );
    }

    return (
      <section className="wizard-step-grid" aria-label="Step 5 Casting Method">
        <div className="wizard-inline-grid">
          <button
            type="button"
            className={`casting-card ${draft.castingMethod === "direct" ? "active" : ""}`}
            onClick={() => setField("castingMethod", "direct")}
          >
            <strong>Direct invite</strong>
            <span>Search and select specific creators manually.</span>
          </button>

          <button
            type="button"
            className={`casting-card ${draft.castingMethod === "auto" ? "active" : ""}`}
            onClick={() => setField("castingMethod", "auto")}
          >
            <strong>Auto-match</strong>
            <span>Let CastMe suggest best-fit creators from your brief.</span>
          </button>
        </div>
      </section>
    );
  };

  const renderSummary = () => {
    if (projectType === "fixed") {
      return (
        <aside
          className="project-preview-card"
          aria-label="Live project preview"
        >
          <h3>Project Summary</h3>

          <div className="preview-list">
            <article>
              <small>Type</small>
              <strong>Fixed Collaboration</strong>
            </article>
            <article>
              <small>Deliverable</small>
              <strong>{draft.deliverableType}</strong>
            </article>
            <article>
              <small>Schedule</small>
              <strong>{draft.scheduleDate || "Pick a date"}</strong>
            </article>
            <article>
              <small>Quantity</small>
              <strong>{numbers.quantity || 1}</strong>
            </article>
            <article className="preview-estimated">
              <small>Total Cost</small>
              <strong>{formatCurrency(numbers.fixedTotalCost)}</strong>
            </article>
          </div>

          <div className="preview-note">
            <strong>Quick note</strong>
            <p>
              Projects are billed after creator acceptance. Funds are secured in
              escrow before work starts.
            </p>
          </div>
        </aside>
      );
    }

    return (
      <aside className="project-preview-card" aria-label="Live project preview">
        <h3>Campaign Summary</h3>

        <div className="preview-list">
          <article>
            <small>Project</small>
            <strong>{draft.projectName || "Untitled collaboration"}</strong>
          </article>
          <article>
            <small>Total Budget</small>
            <strong>{formatCurrency(numbers.totalBudget)}</strong>
          </article>
          <article>
            <small>KOL Count</small>
            <strong>{numbers.kolCount || 0} creators</strong>
          </article>
          <article>
            <small>Base Pay</small>
            <strong>{formatCurrency(numbers.basePay)} / creator</strong>
          </article>
          <article>
            <small>Performance Bonus</small>
            <strong>{formatCurrency(numbers.bonusPerSale)} / sale</strong>
          </article>
          <article className="preview-estimated">
            <small>Estimated Payout</small>
            <strong>{formatCurrency(numbers.estimatedTotalPayout)}</strong>
          </article>
        </div>

        {baseCostExceedsBudget ? (
          <p className="preview-warning">
            Base payout is higher than budget. Please adjust cost assumptions.
          </p>
        ) : null}
      </aside>
    );
  };

  if (!projectType) {
    return (
      <div className="business-shell business-route-page">
        <BusinessHeader />

        <Container className="business-content">
          <section
            className="project-type-stage"
            aria-label="Choose project type"
          >
            <header className="project-type-header">
              <span>Step 1: Project Type</span>
              <h1>Choose your objective</h1>
              <p>
                Select the collaboration structure that best fits your business
                goals. You can refine all details in the next steps.
              </p>
            </header>

            <div className="project-type-grid">
              <button
                type="button"
                className="project-type-card"
                onClick={() => setProjectType("performance")}
              >
                <strong>Performance Campaign</strong>
                <p>
                  For measurable outcomes: sales, installs, clicks and views.
                </p>
                <div className="wizard-pill-list">
                  <span>sales</span>
                  <span>installs</span>
                  <span>clicks</span>
                  <span>views</span>
                </div>
              </button>

              <button
                type="button"
                className="project-type-card"
                onClick={() => setProjectType("fixed")}
              >
                <strong>Fixed Collaboration</strong>
                <p>For one-off fixed-price deliverables with clear scope.</p>
                <div className="wizard-pill-list">
                  <span>TikTok video</span>
                  <span>livestream</span>
                  <span>Instagram post</span>
                </div>
              </button>
            </div>

            <footer className="wizard-actions project-type-actions">
              <button
                type="button"
                className="wizard-back-btn"
                onClick={handleBack}
              >
                Back
              </button>
              <div className="wizard-actions-right">
                <button
                  type="button"
                  className="wizard-draft-btn"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </button>
              </div>
            </footer>
          </section>
        </Container>
      </div>
    );
  }

  const isFinalStep = step === activeSteps.length;

  return (
    <div className="business-shell business-route-page">
      <BusinessHeader />

      <Container className="business-content">
        <header className="business-page-head">
          <div>
            <p>Projects</p>
            <h1>
              {projectType === "performance"
                ? "Create Performance Collaboration"
                : "Create Fixed Collaboration"}
            </h1>
          </div>
        </header>

        <div
          className="project-create-layout"
          aria-label="Create collaboration wizard"
        >
          <aside
            className="project-stage-panel"
            aria-label="Project stage list"
          >
            <h3>New Project</h3>
            <p>
              {projectType === "performance" ? "Performance" : "Fixed"} stage
            </p>

            <div className="project-stage-list">
              {activeSteps.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = step === stepNumber;
                const isDone = step > stepNumber;

                return (
                  <button
                    key={label}
                    type="button"
                    className={`project-stage-item ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                    onClick={() => setStep(stepNumber)}
                  >
                    <span>{stepNumber}</span>
                    <strong>{label}</strong>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="wizard-draft-btn project-stage-draft"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>
          </aside>

          <main className="project-form-card">
            <section className="wizard-step-panel">
              <header>
                <h2>
                  {step}. {activeSteps[step - 1]}
                </h2>
                <p>{getStepDescription(projectType, step)}</p>
              </header>

              {projectType === "performance"
                ? renderPerformanceStep()
                : renderFixedStep()}
            </section>

            <footer className="wizard-actions">
              <button
                type="button"
                className="wizard-back-btn"
                onClick={handleBack}
              >
                Back
              </button>

              <div className="wizard-actions-right">
                <button
                  type="button"
                  className="wizard-draft-btn"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </button>

                {isFinalStep ? (
                  <button
                    type="button"
                    className="wizard-create-btn"
                    onClick={handleCreate}
                  >
                    Create Project
                  </button>
                ) : (
                  <button
                    type="button"
                    className="wizard-next-btn"
                    onClick={handleNext}
                  >
                    Continue
                  </button>
                )}
              </div>
            </footer>
          </main>

          {renderSummary()}
        </div>
      </Container>
    </div>
  );
}
