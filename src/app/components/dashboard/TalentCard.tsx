import {
  BadgeCheck,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  Music2,
  Sparkles,
  Youtube,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { TalentProfile } from "./types";

interface TalentCardProps {
  profile: TalentProfile;
}

function getPlatformIcon(platform: string) {
  const normalized = platform.toLowerCase();
  if (normalized.includes("tiktok")) return Music2;
  if (normalized.includes("instagram")) return Instagram;
  if (normalized.includes("facebook")) return Facebook;
  if (normalized.includes("youtube")) return Youtube;
  return Globe;
}

function getPlatformClassName(platform: string) {
  return `platform-${platform.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function TalentCard({ profile }: TalentCardProps) {
  const navigate = useNavigate();

  return (
    <article className="talent-card reveal-2">
      <header className="talent-card-head">
        <div className="talent-visual" aria-hidden="true">
          <ImageWithFallback
            src={profile.portraitImageUrl}
            alt={profile.imageAlt}
            className="talent-portrait-image"
            loading="lazy"
          />
          <ImageWithFallback
            src={profile.avatarImageUrl}
            alt={`${profile.name} avatar`}
            className="talent-avatar-image"
            loading="lazy"
          />
        </div>

        <div className="talent-main-info">
          <h3>{profile.name}</h3>
          <p>{profile.headline}</p>
          <div className="talent-meta-line">
            <span>
              <MapPin size={14} />
              {profile.location}
            </span>
            <span className="talent-job-success">
              <BadgeCheck size={14} />
              {profile.jobSuccess}% Job Success
            </span>
            <span className="talent-availability">{profile.availability}</span>
          </div>
        </div>

        <div className="talent-price-box">
          <strong>{profile.hourlyRate}</strong>
          <span>{profile.earned}</span>
        </div>
      </header>

      <div className="talent-highlight-row">
        {profile.badges.map((badge) => (
          <span key={badge}>
            <Sparkles size={13} />
            {badge}
          </span>
        ))}
      </div>

      <p className="talent-bio">{profile.bio}</p>

      <div className="talent-chip-list">
        {profile.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <footer className="talent-card-footer">
        <div>
          <small>Audience</small>
          <strong>{profile.audience}</strong>
        </div>
        <div className="talent-platform-field">
          <small>Platforms</small>
          <div className="talent-platform-list">
            {profile.platforms.map((platform) => {
              const PlatformIcon = getPlatformIcon(platform);
              return (
                <span
                  key={platform}
                  className={`talent-platform-pill ${getPlatformClassName(platform)}`}
                >
                  <PlatformIcon size={13} />
                  {platform}
                </span>
              );
            })}
          </div>
        </div>
        <button type="button" onClick={() => navigate("/profile")}>
          View Profile
        </button>
      </footer>
    </article>
  );
}
