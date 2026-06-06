/**
 * Next.js App Router page wrapper.
 *
 * To integrate into the project:
 *   1. Copy this entire `clone-page/` directory to `src/app/clone/`
 *      (or to your desired route path)
 *   2. This file becomes the page.tsx for that route
 *   3. Run: pnpm dev → visit /clone
 *
 * The LandingPage itself is a client component ('use client') because it
 * needs scroll listeners. This server page wrapper lets Next.js handle
 * RSC caching and streaming for everything above the fold.
 */
import LandingPage from './LandingPage';

export const metadata = {
  title: 'EventBeds™ by NuBreed Hotels',
  description: 'Discover the web\'s best hotel deals for events. Event-exclusive rates, flexible booking and 1M+ properties.',
};

export default function Page() {
  return <LandingPage />;
}
