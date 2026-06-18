import React, { memo } from "react";
import type { SectionRendererProps } from "./types";

export const EditorialSection = memo(function EditorialSection({
  config,
}: SectionRendererProps) {
  const content = config as unknown as {
    content?: { editorialHeading?: string; editorialSubheading?: string; editorialBody?: string };
  };
  const heading = content.content?.editorialHeading ?? "NUESTRO ENFOQUE AL";
  const subheading = content.content?.editorialSubheading ?? "DISEÑO DE MODA";
  const body = content.content?.editorialBody ?? "Cada pieza nace de la observación de lo cotidiano.";

  return (
    <section
      className="py-12 md:py-16 lg:py-20"
      aria-labelledby="editorial-heading"
    >
      <div className="px-4 lg:px-[160px]">
        <div className="text-center max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <h2
            id="editorial-heading"
            className="leading-none mb-4 md:mb-6 text-[28px] md:text-3xl lg:text-4xl"
            style={{
              color: "var(--t-foreground)",
              fontWeight: "var(--t-type-heading-weight, 800)" as React.CSSProperties["fontWeight"],
              textTransform: "var(--t-type-heading-transform, uppercase)" as React.CSSProperties["textTransform"],
              letterSpacing: "2px",
            }}
          >
            {heading}
            <br />
            {subheading}
          </h2>
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
        </div>
      </div>
    </section>
  );
});
