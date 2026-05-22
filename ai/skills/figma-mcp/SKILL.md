---
name: figma-mcp
description: >
  Best practices for extracting designs from Figma using the MCP server. Covers connection setup, tool selection to minimize API calls, asset bank organization, and the complete extraction workflow.
  Trigger: When extracting designs from Figma, using Figma MCP tools, or building an asset bank (screenshots, design tokens, metadata).
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Extracting designs from Figma Community files
- Building the storefront template asset bank
- Capturing screenshots, color palettes, design tokens, and metadata from Figma
- Any task involving `mcp__figma__*` tools

> **SCOPE BOUNDARY — READ FIRST**
> This skill covers **design extraction only**: screenshots, color palettes, design tokens, metadata, and overview images.
> **React code extraction is explicitly OUT OF SCOPE.**
> Do NOT create `.tsx` files, do NOT create a `react/` folder, do NOT save component code from `get_design_context`.
> The code output from `get_design_context` is used only to infer design tokens and structure — it is never saved to disk.

## Connection Setup

### Installation

```bash
claude plugin install figma@claude-plugins-official
```

After install: restart Claude Code → `/plugin` → Installed → Figma → Enter → OAuth in browser → "Allow access"

Verify: `claude mcp list` — should show `figma` as connected.

### Plan Requirements

| Plan | Seat | Limit | Cost |
|------|------|-------|------|
| Starter | Full | 6 calls/month | Free |
| **Professional** | Full | **200 calls/day**, 10/min | $20/month |
| Organization | Full | 200/day, 15/min | varies |
| Enterprise | Full | 600/day, 20/min | varies |

**Minimum viable**: Professional plan. Starter is useless for real extraction work.

## Critical Patterns

### 1. Tool Selection — Minimize Calls

| Need | Tool | Returns | When |
|------|------|---------|------|
| Tokens + structure reference | `get_design_context` | Design tokens, structure hints, inline screenshot | **PRIMARY — use for token/palette extraction; do NOT save the code output** |
| Downloadable PNG | `get_screenshot` | URL to PNG (short-lived) | Pair with get_design_context for saving PNGs |
| File structure / node IDs | `get_metadata` | XML tree of all frames and layers | Once per file/page to discover screens |
| Design tokens only | `get_variable_defs` | Color, spacing, font tokens | When you only need the design system |

**RULES:**
- NEVER use `get_screenshot` alone when you also need code — use `get_design_context` instead
- ALWAYS pair `get_design_context` + `get_screenshot` per screen (2 calls per screen)
- Use `get_metadata` ONCE per file to discover all node IDs, then batch the rest
- Call `get_design_context` with `excludeScreenshot: true` to save tokens when you're also calling `get_screenshot`

### 2. Call Budget Formula

```
Total calls = 1 (metadata) + N (design_context) + N (screenshots) = 2N + 1
```

| Screens | MCP Calls | At 10/min | Time |
|---------|-----------|-----------|------|
| 3 | 7 | 1 batch | <1 min |
| 7 | 15 | 2 batches | ~2 min |
| 10 | 21 | 3 batches | ~3 min |
| 20 | 41 | 5 batches | ~5 min |

**Daily budget on Professional**: 200 calls = ~100 screens/day maximum.

### 3. URL Parsing

Extract `fileKey` and `nodeId` from Figma URLs:

```
https://figma.com/design/:fileKey/:fileName?node-id=:nodeId
```

**Critical**: Convert `-` to `:` in node-id parameter:
- URL: `node-id=5245-9842` → MCP: `nodeId: "5245:9842"`
- URL: `node-id=0-1` → MCP: `nodeId: "0:1"`

Branch URLs: `figma.com/design/:fileKey/branch/:branchKey/:fileName` → use `branchKey` as fileKey.

### 4. React Code — EXPLICITLY EXCLUDED

> **DO NOT save React code. This is a hard rule.**

- ❌ NEVER create `.tsx` files from `get_design_context` output
- ❌ NEVER create a `react/` folder inside the asset bank
- ❌ NEVER save component code, JSX, or `export default function` blocks to disk
- ✅ DO use `get_design_context` to read design tokens, color palettes, and structure hints
- ✅ DO pass token/palette information into `design-tokens.json`

The code output from `get_design_context` is a reference tool, not a deliverable. Read it, extract what matters (colors, typography, spacing), and discard the rest.

## Asset Bank Structure

```
tmp/asset-bank/
├── {category}/                    # e.g., beauty, comida, tech, home, pet, minimarket, ropa
│   └── {design-name}/            # e.g., beauty-products-ecommerce, pizza-app
│       ├── index.md              # Design summary, highlights, file manifest
│       ├── design-tokens.json    # Colors, typography, border-radius, screen refs
│       ├── metadata.txt          # Raw Figma XML metadata (from get_metadata)
│       ├── overview.png          # Full design overview screenshot
│       └── screenshots/          # Individual screen PNGs (from get_screenshot)
│           ├── home.png
│           ├── product-detail.png
│           ├── cart.png
│           └── ...
```

> **No `react/` folder.** React code extraction is out of scope for this skill. See "React Code — EXPLICITLY EXCLUDED" above.

### Naming Conventions

- Folder names: lowercase, hyphens (e.g., `beauty-products-ecommerce`)
- Screenshot files: lowercase, hyphens, descriptive (e.g., `product-detail.png`, NOT `06.png`)
- NO numeric prefixes (e.g., `home.png`, NOT `04-home.png`)

### design-tokens.json Schema

```json
{
  "source": "Design Name",
  "figmaFile": "fileKey",
  "extractedAt": "YYYY-MM-DD",
  "colors": {
    "primary": "#hex",
    "background": "#hex",
    "surface": "#hex",
    "...": "..."
  },
  "typography": {
    "fontFamily": "Font Name",
    "scales": {
      "heading": { "size": 20, "weight": 600, "lineHeight": 1.5 },
      "body": { "size": 14, "weight": 400 }
    }
  },
  "borderRadius": {
    "card": 16,
    "button": 8
  },
  "screens": [
    { "name": "Home", "nodeId": "123:456", "file": "screenshots/home.png" }
  ]
}
```

## Extraction Workflow

### Step 1: Discover Screen Node IDs

```
get_metadata(fileKey, nodeId: "page-root-node")
```

- If result is too large (>50K chars), it auto-saves to `.claude/projects/*/tool-results/`
- Use grep to find specific frame names: `grep -oP 'id=\\"[^"]*\\" name=\\"[^"]*Screen[^"]*\\"'`
- Copy metadata to `{design}/metadata.txt`

### Step 2: Extract Design Context + Screenshots (parallel)

For each screen, call BOTH in parallel:

```
get_design_context(fileKey, nodeId, clientFrameworks: "react,nextjs", clientLanguages: "typescript", excludeScreenshot: true)
get_screenshot(fileKey, nodeId)
```

**Use `get_design_context` to read design tokens and color styles only — do NOT save the code output.**

Batch up to 10 calls in parallel (Professional rate limit).

### Step 3: Download PNGs Immediately

Screenshot URLs are **short-lived**. Download with curl right after getting them:

```bash
curl -s -o "screenshots/{name}.png" "{screenshot_url}"
```

### Step 4: ~~Save React Code~~ — SKIP THIS STEP

> **React code extraction is out of scope.** Do NOT create `.tsx` files. Do NOT create a `react/` folder.
> The code output from `get_design_context` is used only in Step 5 to extract tokens — then discarded.

### Step 5: Create design-tokens.json

Extract from the style metadata returned in `get_design_context`:
- Color tokens from the "These styles are contained in the design:" output
- Typography scales (font family, size, weight, lineHeight, letterSpacing)
- Map screen names to node IDs and screenshot file paths

### Step 6: Create index.md

Summarize: design name, file key, extraction date, screen count, primary colors, fonts, style description, design highlights, file manifest.

## Common Pitfalls

### Rasterized Community Files

Some Figma Community files are **flattened previews** — all components detached, designs rasterized to images.

**How to detect:**
- `get_metadata` shows only `rounded-rectangle` elements (not `frame` with children)
- The file's notes say "components have been detached & removed"
- `get_design_context` returns just `<img>` elements, no real component code

**What to do:** Extract screenshots only. Note `"rasterized": true` in design-tokens.json. (React code is never extracted regardless — see scope boundary above.)

### Large Metadata Files

Files with 50+ screens produce metadata >100K characters, which auto-saves to:
```
C:\Users\MAICOL\.claude\projects\{project}\{session}\tool-results\mcp-figma-get_metadata-{timestamp}.txt
```

Use grep to find specific node IDs instead of reading the entire file:
```bash
grep -oP 'id=\\"[^"]*\\" name=\\"[^"]*{search-term}[^"]*\\"' /path/to/metadata.txt
```

### Asset URL Expiration

Figma asset URLs (`https://www.figma.com/api/mcp/asset/...`) returned by MCP tools expire in **7 days**. Always:
- Note the extraction date in `design-tokens.json` (`extractedAt` field)
- Download screenshots immediately via `get_screenshot` + curl (do not rely on the URL staying valid)
- If re-extracting after 7 days, re-call `get_screenshot` to get fresh PNG URLs

### Multiple Pages in One File

Figma files can have multiple pages. If `get_metadata` on `0:1` fails, try the node ID from the URL. Each page has its own canvas ID (e.g., `5001:2284`).

## Commands

```bash
# Install Figma MCP
claude plugin install figma@claude-plugins-official

# Verify connection
claude mcp list

# Authenticate (after install)
# /plugin → Installed → Figma → Enter → OAuth

# Download a screenshot
curl -s -o "screenshot.png" "https://www.figma.com/api/mcp/asset/{asset-id}"

# Search metadata for node IDs
grep -oP 'id=\\"[^"]*\\" name=\\"[^"]*{term}[^"]*\\"' /path/to/metadata.txt

# Count MCP calls used today (check Figma billing)
# No CLI command — check figma.com/settings
```

## Resources

- **Figma MCP Docs**: [figma.com/developers/docs/figma-mcp-server](https://developers.figma.com/docs/figma-mcp-server/)
- **Plan pricing**: [figma.com/pricing](https://figma.com/pricing)
- **Asset bank**: `tmp/asset-bank/` in the project
- **Theme sources**: `themes/` folder with Figma URLs per category
