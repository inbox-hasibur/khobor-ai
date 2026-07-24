# Recent Changes (Last 2 Days)

## Admin Dashboard UI Refinements
- Redesigned the Dashboard metric cards to have a consistent Bento-box style without excessive background gradients.
- Applied a uniform "Green Theme" (`emerald-500`) to all dashboard statistics for a cohesive and premium look.
- Replaced the notification bell on the dashboard header with a clean Date widget (`July 24, 2026`).
- Optimized and DRY'd the dashboard code by defining an array of card metrics and iterating over them with `.map()`.
- Fixed significant vertical padding issues by explicitly configuring the `shadcn/ui` Card and CardContent padding classes (`p-5` on Card, `p-0` on CardContent) to perfectly balance top/bottom/left/right spacing.

## Scraping Control Configuration
- Renamed "Scraping Pipeline" to "Scraping Control".
- Converted the default auto-approve switch to a custom-designed, wide slider with a white button (`ON`/`OFF`) perfectly centered inside.
- Adjusted the flex layout (`flex-wrap`) for the Scraping Schedule options to prevent overlapping and clipping on narrow screens.
- Fixed the `global_gemini_api_keys` duplicate row bug by iterating and updating existing records in the `system_settings` table instead of re-inserting them.
- Updated the "Automated Scraping Sources" table title and buttons to match the new white/clean aesthetic.
