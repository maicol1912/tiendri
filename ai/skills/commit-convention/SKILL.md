---
name: commit-convention
description: >
  Conventional commit format with module scope for all git commits in Tiendri.
  Trigger: When creating any git commit — always load this skill before writing a commit message.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Every time a git commit is created
- When reviewing commit messages for consistency
- When deciding how to split changes into commits

## Commit Format

```
type(scope): description
```

**Max 72 characters** for the subject line. Lowercase. No period at end.

### Types

| Type | When to use | Example |
|------|------------|---------|
| `feat` | New feature or functionality | `feat(auth): add split screen layout with sliding panel` |
| `fix` | Bug fix | `fix(landing): correct timeline line position on mobile` |
| `refactor` | Code restructuring without behavior change | `refactor(landing): move components to (landing) route group` |
| `style` | Visual/CSS changes, no logic change | `style(auth): integrate shelf-to-send video with mask-image blending` |
| `chore` | Config, deps, tooling, skills, agents | `chore(skills): create video-integration skill` |
| `docs` | Documentation only | `docs(agents): add specialist ownership rules to AGENTS.md` |
| `perf` | Performance improvement | `perf(showcase): replace CSS animation with requestAnimationFrame` |
| `test` | Adding or fixing tests | `test(auth): add login form validation tests` |

### Scopes

The scope is the **module/area** touched by the commit:

| Scope | What it covers |
|-------|---------------|
| `landing` | Landing page general (multiple sections) |
| `hero` | Hero section specifically |
| `how-it-works` | How It Works / stepper section |
| `showcase` | Showcase / templates carousel |
| `pricing` | Pricing section |
| `navbar` | Navigation bar |
| `footer` | Footer |
| `cta` | CTA section |
| `auth` | Authentication pages (login, register, confirm) |
| `dashboard` | Dashboard pages |
| `storefront` | Public store pages |
| `onboarding` | Onboarding wizard |
| `ui` | Shared UI components (button, input, skeleton) |
| `design-system` | Design tokens, CSS variables, fonts |
| `skills` | AI agent skills |
| `agents` | AI agent definitions |
| `config` | Next.js config, Tailwind, package.json |
| `db` | Database migrations, Supabase |
| `actions` | Server Actions |
| `seo` | Metadata, structured data, sitemap |

**Multiple modules?** Use the primary one. If truly cross-cutting, use a broader scope:
- `landing` for changes across multiple landing sections
- `auth` for changes across login + register
- `config` for project-wide config changes

### Body (optional)

For complex commits, add a body with bullet points after a blank line:

```
feat(pricing): convert table to vertical cards with expandable

- Replace 12-row comparison table with 3 vertical cards
- Show 6 key features, hide 6 behind "Ver todas" expandable
- Pro card elevated with scale-105 and ember glow
- Mobile: horizontal carousel with scroll-snap and dots
```

## Critical Rules

### DO
- One commit per logical change
- Explain WHAT changed in the subject
- Use body bullets for complex changes
- Keep subject <= 72 characters
- Write in English, lowercase
- Use present tense imperative ("add", not "added" or "adds")

### NEVER
- Add `Co-Authored-By` or AI attribution of any kind
- Write generic messages: "update files", "fix stuff", "changes", "wip"
- Bundle unrelated changes in one commit
- Include file paths in the subject (that's what `git diff` is for)
- Add a period at the end of the subject
- Capitalize the first word after the colon

## Decision Tree — How to Split Commits

```
Did you change ONE logical thing?
  YES -> One commit
  NO down

Are the changes in the SAME module?
  YES -> Can you describe them in one subject <= 72 chars?
    YES -> One commit with body bullets
    NO -> Split into separate commits
  NO -> Split into separate commits (different scopes)
```

## Examples — Good vs Bad

| Good | Bad |
|------|-----|
| `feat(auth): add split screen layout with sliding panel` | `update auth pages` |
| `fix(how-it-works): show clay icons on mobile` | `fix mobile` |
| `style(auth): increase video size and fix mask blending` | `css changes` |
| `refactor(landing): move components to (landing) route group` | `refactor` |
| `chore(skills): create responsive-design and ai-asset-pipeline` | `add new files` |
| `feat(pricing): add horizontal carousel for mobile` | `pricing mobile fix` |
| `fix(navbar): suppress hydration warning on body` | `fix error` |
| `docs(agents): add validation rules before delivery` | `update docs` |

## Commands

```bash
# Commit with subject only
git commit -m "feat(auth): add split screen layout with sliding panel"

# Commit with subject + body
git commit -m "$(cat <<'EOF'
feat(pricing): convert table to vertical cards with expandable

- Replace 12-row comparison table with 3 vertical cards
- Show 6 key features, hide 6 behind "Ver todas" expandable
- Pro card elevated with scale-105 and ember glow
- Mobile: horizontal carousel with scroll-snap and dots
EOF
)"

# Check recent commits for style consistency
git log --oneline -20
```

## Resources

- **Git workflow**: `develop` (work) -> `main` (production)
- **Branch naming**: feature/{scope}-{description} (e.g., `feature/auth-split-screen`)
