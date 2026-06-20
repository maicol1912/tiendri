// Editorial variant: DEFAULT
// Centered text block with uppercase heading + optional subheading + body copy.
// Extracted from EditorialSection inline rendering.

import React, { memo } from "react";
import { getSectionField } from "@/templates/_core/sections/get-section-field";
import type { EditorialSlotProps } from "./types";

function EditorialDefault({ config, sectionConfig }: EditorialSlotProps) {
  const heading = getSectionField<string | undefined>("heading", sectionConfig, config.content?.editorialHeading, undefined);
  const subheading = getSectionField<string | undefined>("subheading", sectionConfig, config.content?.editorialSubheading, undefined);
  const body = getSectionField<string | undefined>("body", sectionConfig, config.content?.editorialBody, undefined);
  const textAlignment = getSectionField<string>("textAlignment", sectionConfig, undefined, "center");

  const sectionTitle = getSectionField<string | undefined>("title", sectionConfig, undefined, undefined);
  const sectionSubtitle = getSectionField<string | undefined>("subtitle", sectionConfig, undefined, undefined);

  if (!heading && !body) return null;

  return (
    <section
      className="py-12 md:py-16 lg:py-20"
      aria-labelledby="home-editorial-heading"
    >
      <div className="max-w-[92%] lg:max-w-[65%] mx-auto">
        {(sectionTitle || sectionSubtitle) && (
          <div className="text-center mb-8 md:mb-10">
            {sectionTitle && (
              <h2
                className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2"
                style={{ color: "var(--t-foreground)" }}
              >
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p
                className="text-sm md:text-base"
                style={{ color: "var(--t-muted)" }}
              >
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}
        <div
          className="max-w-md md:max-w-lg lg:max-w-xl mx-auto"
          style={{ textAlign: textAlignment as React.CSSProperties["textAlign"] }}
        >
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
            {heading}
            {subheading && (
              <>
                <br />
                {subheading}
              </>
            )}
          </h2>
          {body && (
            <p
              className="text-[13px] md:text-sm lg:text-base"
              style={{
                color: "var(--t-muted)",
                fontWeight: 400,
                lineHeight: 1.75,
              }}
            >
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(EditorialDefault);
