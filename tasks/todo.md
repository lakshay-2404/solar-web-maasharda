# Maa Sharda Solar Rebuild

## Plan
- [x] Audit the current repo, local instructions, and accessible design/context sources.
- [x] Migrate the project to the requested stack and `src/` folder structure.
- [x] Add environment files, Tailwind design tokens, Next/Vercel config, and shadcn/ui primitives.
- [x] Implement shared types, hooks, libraries, and the lead fan-out API.
- [x] Build the core layout, landing sections, and requested non-blog pages.
- [x] Remove leftover Contentful dependencies/config and complete the MDX blog migration.
- [x] Create the 8 local MDX blog posts and blog cover assets.
- [x] Refine key UI surfaces to better match the downloaded Stitch reference output.
- [x] Verify lint/build behavior, complete the checklist review, and record outcomes.

## Notes
- Rebuilding the existing `maa-sharda-nextjs` repo in place because it is already the active workspace.
- The configured Stitch MCP server is present in `config.toml`, but it is not exposing readable MCP resources/templates in this session, so implementation is grounded in the provided prompt plus the local extracted Stitch output at `C:\Users\maash\Documents\Website_shop\stitch_final`.
- Blog requirements were updated by the user to an in-house MDX system, so Contentful must be fully removed from code, environment files, and dependencies.

## Review
- `npm run lint` passes.
- `npm run build` passes after adding the required `critters` package for `optimizeCss`.
- Browser verification on `http://127.0.0.1:3000/` confirmed no horizontal overflow on desktop, fixed WhatsApp CTA visibility, and 18px form input font sizing.
- Browser verification on mobile blog detail confirmed no horizontal overflow and the sticky mobile CTA bar is visible.
- Blog system now uses local MDX files under `content/blog/` plus local cover assets under `public/images/blog/`.
- Calculator assumptions were revised after user correction: generation is now based on `140` units per kW per month, the home-page calculator hides EMI/post-subsidy/payback, and DCR pricing now yields about Rs 1,00,000 post-subsidy for a 3kW system.
- Exit-intent popup code was removed after user feedback; the landing page now relies on embedded lead capture instead of interruption-based prompts.
- Financing copy was simplified across the site and blog system to `up to 90% financing support available*` without EMI, interest-rate, or nationalised-bank references.
- Major landing and conversion CTAs were converted to Hindi script, and blog/service content was updated to emphasize end-to-end handling across Yamunanagar, Ambala, Karnal, and Kurukshetra.
- The financing-focused blog post slug was neutralized to `/blog/solar-financing-support`, and the services index received a typed icon-map fix so `npm run build` passes cleanly again.
