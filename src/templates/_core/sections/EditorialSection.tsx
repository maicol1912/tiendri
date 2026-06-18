import React, { memo } from "react";
import type { SectionRendererProps } from "./types";

export const EditorialSection = memo(function EditorialSection({
  config,
}: SectionRendererProps) {
  const editorialHeading = config.content?.editorialHeading;
  const editorialSubheading = config.content?.editorialSubheading;
  const editorialBody = config.content?.editorialBody;

  if (!editorialHeading && !editorialBody) return null;

  return (
    <section
      className="py-12 md:py-16 lg:py-20"
      aria-labelledby="home-editorial-heading"
    >
      <div className="max-w-[92%] lg:max-w-[65%] mx-auto">
        <div className="text-center max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <h2
            id="home-editorial-heading"
            className="leading-none mb-4 md:mb-6 text-[28px] md:text-3xl lg:text-4xl"
            style={{
              color: "var(--t-foreground)",
              fontWeight: "var(--t-type-heading-weight, 800)" as React.CSSProperties["fontWeight"],
              textTransform: "uppercase" as React.CSSProperties["textTransform"],
              letterSpacing: "2px",
            }}
          >
            {editorialHeading}
            {editorialSubheading && (
              <>
                <br />
                {editorialSubheading}
              </>
            )}
          </h2>
          {editorialBody && (
            <p
              className="text-[13px] md:text-sm lg:text-base"
              style={{
                color: "var(--t-muted)",
                fontWeight: 400,
                lineHeight: 1.75,
              }}
            >
              {editorialBody}
            </p>
          )}
        </div>
      </div>
    </section>
  );
});
