import {
  Cormorant_Garamond,
  Lato,
  Bodoni_Moda,
  DM_Sans,
  Libre_Baskerville,
  Source_Sans_3,
  Manrope,
  Inter,
  Space_Grotesk,
  IBM_Plex_Sans,
  Bricolage_Grotesque,
  Outfit,
  Bebas_Neue,
  Hind,
  Syne,
  Nunito_Sans,
  Fraunces,
  Alfa_Slab_One,
  Mulish,
  Poppins,
  Nunito,
  Caveat,
  Karla,
  Fredoka,
  Quicksand,
  Merriweather,
  Open_Sans,
  Montserrat,
} from "next/font/google";

interface NextFont {
  className: string;
  variable: string;
  style: { fontFamily: string; fontWeight?: number; fontStyle?: string };
}

export interface FontPairDefinition {
  id: string;
  name: string;
  description: string;
  group: string;
  heading: NextFont;
  body: NextFont;
}

const cormorantGaramondHeading = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-heading-elegante",
  display: "swap",
});

const latoBody = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-body-elegante",
  display: "swap",
});

const bodoniModaHeading = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-editorial",
  display: "swap",
});

const dmSansBody = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-editorial",
  display: "swap",
});

const libreBaskervilleHeading = Libre_Baskerville({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-heading-atemporal",
  display: "swap",
});

const sourceSans3AtemporalBody = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-atemporal",
  display: "swap",
});

const manropeHeading = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-minimalista",
  display: "swap",
});

const interBody = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-minimalista",
  display: "swap",
});

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-preciso",
  display: "swap",
});

const ibmPlexSansBody = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-preciso",
  display: "swap",
});

const bricolageGrotesqueHeading = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-contemporaneo",
  display: "swap",
});

const outfitBody = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-contemporaneo",
  display: "swap",
});

const bebasNeueHeading = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-heading-audaz",
  display: "swap",
});

const hindBody = Hind({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-audaz",
  display: "swap",
});

const syneHeading = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-urbano",
  display: "swap",
});

const nunitoSansBody = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-urbano",
  display: "swap",
});

const frauncesHeading = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-dramatico",
  display: "swap",
});

const interDramaticoBody = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-dramatico",
  display: "swap",
});

const alfaSlabOneHeading = Alfa_Slab_One({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-heading-llamativo",
  display: "swap",
});

const mulishBody = Mulish({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-llamativo",
  display: "swap",
});

const poppinsHeading = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-heading-amigable",
  display: "swap",
});

const nunitoBody = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-amigable",
  display: "swap",
});

const caveatHeading = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-heading-artesanal",
  display: "swap",
});

const karlaBody = Karla({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-artesanal",
  display: "swap",
});

const fredokaHeading = Fredoka({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-jugueton",
  display: "swap",
});

const quicksandBody = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-jugueton",
  display: "swap",
});

const merriweatherHeading = Merriweather({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-heading-clasico",
  display: "swap",
});

const openSansBody = Open_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-clasico",
  display: "swap",
});

const montserratHeading = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-heading-profesional",
  display: "swap",
});

const sourceSans3ProfesionalBody = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-body-profesional",
  display: "swap",
});

export const fontPairs: Record<string, FontPairDefinition> = {
  elegante: {
    id: "elegante",
    name: "Elegante",
    description: "Lujo silencioso",
    group: "sofisticados",
    heading: cormorantGaramondHeading,
    body: latoBody,
  },
  editorial: {
    id: "editorial",
    name: "Editorial",
    description: "Alta costura tipográfica",
    group: "sofisticados",
    heading: bodoniModaHeading,
    body: dmSansBody,
  },
  atemporal: {
    id: "atemporal",
    name: "Atemporal",
    description: "Clásico que nunca pasa de moda",
    group: "sofisticados",
    heading: libreBaskervilleHeading,
    body: sourceSans3AtemporalBody,
  },
  minimalista: {
    id: "minimalista",
    name: "Minimalista",
    description: "Limpio y sin distracciones",
    group: "modernos",
    heading: manropeHeading,
    body: interBody,
  },
  preciso: {
    id: "preciso",
    name: "Preciso",
    description: "Técnico y ordenado",
    group: "modernos",
    heading: spaceGroteskHeading,
    body: ibmPlexSansBody,
  },
  contemporaneo: {
    id: "contemporaneo",
    name: "Contemporáneo",
    description: "Moderno con carácter propio",
    group: "modernos",
    heading: bricolageGrotesqueHeading,
    body: outfitBody,
  },
  audaz: {
    id: "audaz",
    name: "Audaz",
    description: "Impacto directo",
    group: "expresivos",
    heading: bebasNeueHeading,
    body: hindBody,
  },
  urbano: {
    id: "urbano",
    name: "Urbano",
    description: "Energía de ciudad",
    group: "expresivos",
    heading: syneHeading,
    body: nunitoSansBody,
  },
  dramatico: {
    id: "dramatico",
    name: "Dramático",
    description: "Contraste y tensión visual",
    group: "expresivos",
    heading: frauncesHeading,
    body: interDramaticoBody,
  },
  llamativo: {
    id: "llamativo",
    name: "Llamativo",
    description: "Presencia que no pasa desapercibida",
    group: "expresivos",
    heading: alfaSlabOneHeading,
    body: mulishBody,
  },
  amigable: {
    id: "amigable",
    name: "Amigable",
    description: "Cercano y accesible",
    group: "calidos",
    heading: poppinsHeading,
    body: nunitoBody,
  },
  artesanal: {
    id: "artesanal",
    name: "Artesanal",
    description: "Hecho con las manos",
    group: "calidos",
    heading: caveatHeading,
    body: karlaBody,
  },
  jugueton: {
    id: "jugueton",
    name: "Juguetón",
    description: "Liviano y divertido",
    group: "calidos",
    heading: fredokaHeading,
    body: quicksandBody,
  },
  clasico: {
    id: "clasico",
    name: "Clásico",
    description: "Sobriedad que inspira confianza",
    group: "clasicos",
    heading: merriweatherHeading,
    body: openSansBody,
  },
  profesional: {
    id: "profesional",
    name: "Profesional",
    description: "Serio y corporativo",
    group: "clasicos",
    heading: montserratHeading,
    body: sourceSans3ProfesionalBody,
  },
};

export const fontGroups = [
  { id: "sofisticados", name: "Sofisticados", pairs: ["elegante", "editorial", "atemporal"] },
  { id: "modernos", name: "Modernos", pairs: ["minimalista", "preciso", "contemporaneo"] },
  { id: "expresivos", name: "Expresivos", pairs: ["audaz", "urbano", "dramatico", "llamativo"] },
  { id: "calidos", name: "Cálidos", pairs: ["amigable", "artesanal", "jugueton"] },
  { id: "clasicos", name: "Clásicos", pairs: ["clasico", "profesional"] },
];

export function getFontPair(id: string): FontPairDefinition {
  return fontPairs[id] ?? fontPairs["minimalista"]!;
}
