import { ArrowLeft, Camera, Pencil, Share2, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { Container } from "react-bootstrap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Footer } from "../components/layout/Footer";
import { talentProfiles } from "../components/dashboard/data";
import type { SearchScope } from "../components/dashboard/types";
import "../../styles/jobs-dashboard.css";

const galleryFallback = [
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80",
] as const;

function ProfileShowcase({ isEditable }: { isEditable: boolean }) {
  const profile = talentProfiles[0];

  const galleryImages = useMemo(
    () => [
      profile.portraitImageUrl,
      profile.avatarImageUrl,
      ...galleryFallback,
    ],
    [profile.avatarImageUrl, profile.portraitImageUrl],
  );

  return (
    <main className="profile-demo" aria-label="Profile showcase">
      <section className="profile-demo-hero">
        <div className="profile-demo-banner" />

        <div className="profile-demo-summary">
          <ImageWithFallback
            src={profile.avatarImageUrl}
            alt={`${profile.name} avatar`}
            className="profile-demo-avatar"
            loading="eager"
          />

          <div className="profile-demo-meta">
            <h1>{profile.name}</h1>
            <p>{profile.headline}</p>
            <div className="profile-demo-socials">
              {profile.platforms.map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
            </div>
          </div>

          <div className="profile-demo-actions">
            <button type="button" className="profile-action-primary">
              {isEditable ? "Save Profile" : "Book Now"}
            </button>
            {isEditable ? (
              <>
                <button type="button" className="profile-action-secondary">
                  <Pencil size={15} />
                  Edit profile
                </button>
                <button type="button" className="profile-action-secondary">
                  <Camera size={15} />
                  Add images
                </button>
              </>
            ) : (
              <button
                type="button"
                className="profile-action-icon"
                aria-label="Share profile"
              >
                <Share2 size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="profile-demo-body">
        <aside className="profile-demo-left">
          <article className="profile-panel">
            <h3>About me & vibe</h3>
            <p>{profile.bio}</p>
            <div className="profile-chip-list">
              {profile.skills.slice(0, 4).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>

          <article className="profile-panel">
            <h3>Audience insights</h3>
            <div className="profile-stats">
              <div>
                <small>Followers</small>
                <strong>{profile.audience}</strong>
              </div>
              <div>
                <small>Engagement</small>
                <strong>4.8%</strong>
              </div>
              <div>
                <small>Job success</small>
                <strong>{profile.jobSuccess}%</strong>
              </div>
            </div>
          </article>
        </aside>

        <section className="profile-demo-right">
          <article className="profile-panel">
            <div className="profile-panel-head">
              <h3>Portfolio Gallery</h3>
              {isEditable && (
                <button type="button" className="profile-inline-btn">
                  <Camera size={14} />
                  Add media
                </button>
              )}
            </div>

            <div className="profile-gallery-grid">
              {galleryImages.map((image, index) => (
                <ImageWithFallback
                  key={`${image}-${index}`}
                  src={image}
                  alt={`Portfolio item ${index + 1}`}
                  className="profile-gallery-item"
                  loading="lazy"
                />
              ))}
            </div>
          </article>

          <article className="profile-panel">
            <h3>Brand feedback</h3>
            <div className="profile-feedback-grid">
              <div className="profile-feedback-card">
                <p className="profile-stars" aria-label="Rated 5 out of 5">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span>5.0</span>
                </p>
                <p>
                  Great communication and premium visual output. Delivered ahead
                  of schedule.
                </p>
                <span className="profile-feedback-author">
                  Lumina Electronics
                </span>
              </div>

              <div className="profile-feedback-card">
                <p className="profile-stars" aria-label="Rated 5 out of 5">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span>5.0</span>
                </p>
                <p>
                  The campaign assets were elegant and on-brand. We will book
                  again.
                </p>
                <span className="profile-feedback-author">
                  Nordic Collective
                </span>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

export function ProfilePage() {
  const { pathname } = useLocation();
  const isEditable = pathname === "/my-profile";
  const [searchValue, setSearchValue] = useState("");
  const [selectedScope, setSelectedScope] = useState<SearchScope>("Jobs");

  return (
    <div className="profile-page-shell app-route-page">
      <DashboardHeader
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        selectedScope={selectedScope}
        onScopeChange={setSelectedScope}
      />

      <Container className="profile-page-topbar">
        <Link to="/jobs" className="profile-back-link">
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>
      </Container>

      <Container>
        <ProfileShowcase isEditable={isEditable} />
      </Container>

      <Footer />
    </div>
  );
}
