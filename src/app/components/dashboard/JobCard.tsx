import { Heart, MessageCircle, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { JobItem } from "./types";

interface JobCardProps {
  item: JobItem;
}

export function JobCard({ item }: JobCardProps) {
  const navigate = useNavigate();

  const goToDetail = () => navigate(`/jobs/${item.id}`);

  return (
    <article
      className="dashboard-job-card reveal-3"
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToDetail();
        }
      }}
    >
      <div className="dashboard-job-header">
        <p>{item.postedAt}</p>
        <div className="dashboard-job-actions">
          <button
            type="button"
            aria-label="Comments"
            onClick={(event) => event.stopPropagation()}
          >
            <MessageCircle size={18} />
          </button>
          <button
            type="button"
            aria-label="Save job"
            onClick={(event) => event.stopPropagation()}
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      <h2>{item.title}</h2>
      <p className="dashboard-job-meta">{item.metadata}</p>

      {item.campaignImageUrl && (
        <div className="dashboard-job-preview">
          <ImageWithFallback
            src={item.campaignImageUrl}
            alt={item.campaignImageAlt ?? `${item.title} campaign preview`}
            className="dashboard-job-preview-image"
            loading="lazy"
          />
        </div>
      )}

      <p className="dashboard-job-description">{item.description}</p>

      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          goToDetail();
        }}
      >
        more
      </a>

      <div className="dashboard-job-tags">
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="dashboard-job-footer">
        <span>
          {item.paymentVerified ? "Payment verified" : "Payment pending"}
        </span>
        <div className="dashboard-job-rating" aria-label="Client rating">
          {Array.from({ length: item.rating }).map((_, index) => (
            <Star key={`star-${index}`} size={14} fill="currentColor" />
          ))}
        </div>
        <span>{item.location}</span>
      </div>

      <p className="dashboard-job-proposals">Proposals: {item.proposals}</p>
    </article>
  );
}
