# Job Brief: Neon Pulse Button

## Mission
Act as IT Director / CTO orchestrating a precise UI upgrade for the Karkinos Macro Desk GitHub Pages homepage: add a single centered "Pulse" button that glows neon and reads "Epic Win!" when clicked, without disturbing the existing layout, colors, or text.

## Scope
- Surface-level change to `index.html` only.
- Centered neon-styled button that flashes and responds reliably on the first click.
- Interaction should be smooth on desktop and mobile.
- No build/deploy, only static HTML/CSS/JS adjustments, respecting the existing page structure.

## Constraints
1. The homepage layout, typography, and colors must remain untouched except for the new button overlay.
2. No extra dependencies or tooling; work within the existing single-file structure.
3. Follow the Karkinos IT Orchestrator workflow: maintain the job brief, decision log, risk register, validation ledger, and handoff log.
4. Use the Full-Stack Developer, DevOps/Security Engineer, and IT Support lanes for role-based oversight per the workflow.

## Roles

### Full-Stack Developer
- **Mission:** Implement the glowing center-screen button with animation, click behavior, and responsive styling.
- **Scope:** Update `index.html` CSS and script, ensuring the button overlays without layout shifts and the interaction works on first click every time.
- **Constraints:** Must not alter existing textual content or structure; keep modifications to the landing page file.
- **Required Evidence:** Diff for `index.html`, description of animation, and confirmation that the click handler shows "Epic Win!" and reverts gracefully.
- **Gate:** Code review/inspection confirming no regressions plus manual click test (five times) on desktop and mobile viewport.
- **Escalation Trigger:** If adding the button risks covering or shifting existing content, or if the animation causes jarring performance issues.

### DevOps/Security Engineer
- **Mission:** Ensure the static site continues to serve securely and that the new assets (CSS/JS) don't introduce vulnerabilities or require additional tooling.
- **Scope:** Confirm no dependency changes, no new build steps, and that the new inline styles/scripts are benign.
- **Constraints:** No service restarts or new tools; the page remains static HTML.
- **Required Evidence:** Confirmation that the site still renders as static content (no bundlers) and repointed assets are inline.
- **Gate:** Static HTML review + sanity check (via local browser or inspect) that script executes without errors.
- **Escalation Trigger:** Detection of CSP/script errors or requests to install new tooling.

### IT Support
- **Mission:** Validate the user-facing behavior and record any manual test results, ensuring no regressions for the channel audience.
- **Scope:** Manually click the Pulse button five times in both desktop and mobile simulations; report success/failure.
- **Constraints:** Do not modify files; purely validation.
- **Required Evidence:** Notes on each click outcome and screen size, logged in the validation ledger.
- **Gate:** Manual verification logged after tests pass on both breakpoints.
- **Escalation Trigger:** If someone reports the button doesn't click or the animation lags across devices.
