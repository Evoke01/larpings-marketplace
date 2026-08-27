# handles.gg (larpings.com) Design System

## Core Aesthetic & Philosophy
- **Vibe:** "Gen Z Cool", premium, high-stakes marketplace.
- **Brand Names:** The product name is "larpings.com" / "handles.gg".
- **Terminology:** "grails", "rares", "drops", "sauce".
- **Prefixes:** 
  - `@` before usernames and accounts (e.g. `@rarename`).
  - `$` before services, fansigns, or other non-handle assets (e.g. `$unban_service`).

## Color Variables (HSL)
All colors use `hsl(var(--color-name))` in Tailwind v4 format or `bg-background`, `text-foreground`.
- **Backgrounds:** 
  - `--background`: 240 8% 4% (Deep, near black)
  - `--section-background`: 240 7% 5.5% (Slightly lighter card/section)
- **Foregrounds:**
  - `--foreground`: 240 20% 98% (White/Off-white for main text)
  - `--muted-foreground`: 240 6% 60% (Dimmer text for subtitles/metadata)
- **Accents:**
  - `--accent`: 222 100% 56% (Vibrant Blue - primary highlight)
  - `--accent-2`: 203 100% 62% (Secondary Blue for gradients)
  - `--destructive`: 0 84% 60% (Red for warnings/legacy red accent)

## UI Components & Classes
When building or modifying UI components, use these custom utility classes defined in `index.css`:

### 1. Buttons
- `btn-white`: A solid white button with dark text, premium inset shadows, and hover lift. (e.g., "Get alerts").
- `btn-accent`: A vibrant blue button using the primary accent color.
- `btn-outline-dim`: A dark, transparent button with a subtle border that highlights on hover.

### 2. Cards
- `card-lined`: Hover effect card that adds a subtle gradient border (`--accent` to `--accent-2`) and glow (`--shadow-glow`).
- `lumen-card`: High-end card with a spinning gradient border (`lumen-spin`) and a sheen effect on hover. Requires an inner `.lumen-sheen` element.

### 3. Typography & Badges
- `mono-label`: Small, monospace, uppercase text with wide tracking. Good for eyebrows/subtitles.
- `hl-tilt` & `hl-accent`: Highlight text wrappers.

### 4. Layout & Animations
- `hero-frame` & `hero-grid`: Used for top-level headers to add grid backgrounds and watermarks.
- `mkt-enter`: Use on elements for a staggered fade-up entry animation. Add inline style `style={{ animationDelay: '...' }}` for staggering.
- `float-shell`: The pill-shaped glassmorphism container used for floating elements (like the quick nav).

## Structural Guidelines
- Stick to standard lucide-react (or provided raw SVG) icons with consistent stroke widths (usually `2` or `1.5`) and sizes (`w-4 h-4`).
- Avoid hardcoded hex colors (e.g., `#ff0000`, `#000000`). Always use semantic Tailwind classes (`text-foreground`, `bg-accent/10`, `border-border`).
- Ensure dark mode aesthetics: interfaces should always rely on glassmorphism (blurs, slight opacity borders) and glow effects to create depth, not harsh solid lines.
