import type { PropsWithChildren, ReactNode } from "react";

interface SidebarCardProps extends PropsWithChildren {
  title?: string;
  revealClassName?: string;
  headerAction?: ReactNode;
}

export function SidebarCard({
  title,
  revealClassName = "reveal-3",
  headerAction,
  children,
}: SidebarCardProps) {
  return (
    <section className={`dashboard-side-card ${revealClassName}`}>
      {(title || headerAction) && (
        <div className="dashboard-side-card-header">
          {title && <h4>{title}</h4>}
          {headerAction}
        </div>
      )}
      {children}
    </section>
  );
}
