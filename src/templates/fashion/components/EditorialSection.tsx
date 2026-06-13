// Fashion Template — Editorial Section
// Minimal editorial text block. Centered, uppercase heading, descriptive body.
// No local state — purely presentational.

interface EditorialSectionProps {
  heading?: string;
  subheading?: string;
  body?: string;
}

export function EditorialSection({
  heading = "NUESTRO ENFOQUE AL",
  subheading = "DISEÑO DE MODA",
  body = "Cada pieza nace de la observación de lo cotidiano. Trabajamos con materiales sostenibles y procesos artesanales para crear ropa que no sigue tendencias.",
}: EditorialSectionProps) {
  return (
    <section
      className="py-12 md:py-16 lg:py-20"
      aria-labelledby="editorial-heading"
    >
      <div className="px-5 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Editorial text block */}
        <div className="text-center max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <h2
            id="editorial-heading"
            className="leading-none mb-4 md:mb-6 text-[28px] md:text-3xl lg:text-4xl text-[var(--t-foreground)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {heading}
            <br />
            {subheading}
          </h2>
          <p
            className="text-[13px] md:text-sm lg:text-base text-[var(--t-muted)]"
            style={{
              fontFamily: "var(--font-sans)",
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
}
