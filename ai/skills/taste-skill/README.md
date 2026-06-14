# taste-skill

Anti-slop frontend & design skill collection. Used by Lucas, Valentina, and Camilo.

---

## ACTIVE (production-ready, referenced by agents)

| Sub-skill | Path | Used by |
|-----------|------|---------|
| `design-taste-frontend` | `design-taste-frontend/SKILL.md` | Lucas, Valentina, Camilo |
| `high-end-visual-design` | `high-end-visual-design/SKILL.md` | Lucas, Valentina |
| `redesign-existing-projects` | `redesign-existing-projects/SKILL.md` | Lucas, Camilo |

---

## ARCHIVED (deprecated stubs — do not load)

Moved to `_archived/`. These were superseded, incomplete, or orthogonal to the main skill line.

| Sub-skill | Reason |
|-----------|--------|
| `brandkit` | Image-gen niche, not used by any agent in this project |
| `design-taste-frontend-v1` | Superseded by `design-taste-frontend` (v2). Self-described as backward-compat only |
| `industrial-brutalist-ui` | Highly specific aesthetic stub, zero agent references |
| `minimalist-ui` | Covered by `design-taste-frontend` + `high-end-visual-design`, zero agent references |
| `full-output-enforcement` | Meta-enforcement cross-cut, not a design skill — better placed in system prompt or global rules |

---

## Loading order (for agents)

When loading taste-skill, load in this order based on task:

1. **All frontend/design tasks** → `design-taste-frontend/`
2. **Agency-tier premium brief** → also load `high-end-visual-design/`
3. **Existing project upgrade** → also load `redesign-existing-projects/`
4. **Never load** `_archived/` skills unless you know exactly why you need that behavior
