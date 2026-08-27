# Session Handoff: Larpings.com

## Current Project State
*   **Tech Stack:** React 19, Vite, Tailwind CSS v4, React Router v7.
*   **Design System:** 
    *   Dark mode glassmorphism (cards with blurs and subtle glowing borders).
    *   Primary font: **Outfit** (loaded via Google Fonts).
    *   Accent color: **Red (`#ff0000`)** (used across all utilities like `text-accent`, `bg-accent`, `ring-accent`).
*   **Frontend UI Complete:** 
    *   All core pages implemented (Home, Marketplace, Sell, Dashboard, Blog, Legit, SignIn, Support).
    *   Rebranded content from "handles.gg" to "larpings.com".

## Supabase Integration (In Progress)
*   The Supabase MCP configuration has been updated with the new project ref: `xnacxehraxwqfwqaiemf`.
*   Official Supabase Agent Skills have been successfully installed (`npx skills add supabase/agent-skills`).
*   **Blocker / Action Required:** The user must restart the Antigravity IDE and complete the Supabase OAuth flow to grant the agent full access to the project.

## Next Steps for the Next Session
Once the IDE is restarted and Supabase MCP is authenticated, the next agent should:
1. Verify MCP connection by calling the Supabase `get_publishable_keys` MCP tool.
2. Install the client: `npm install @supabase/supabase-js`.
3. Setup `src/lib/supabase.ts` utilizing the fetched URL and Anon Key.
4. **Auth Setup:** Wire up `src/pages/SignInPage.tsx` to handle real User Sign Up, Log In, and Session management using Supabase Auth.
5. **Database Setup:** Begin designing and deploying the SQL schema via MCP for User Profiles, Marketplace Listings, and Orders.
