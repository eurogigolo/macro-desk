# Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Overlay button may cover essential content or feel intrusive. | Low | Medium | Use `pointer-events:none` wrapper and fade-in overlay so existing layout stays visible while keeping button centered. | Full-Stack Developer |
| R2 | Animation might cause jank on slower devices. | Low | Medium | Use CSS-only animation with limited keyframes and test in mobile viewport; no expensive JS loops. | Full-Stack Developer |
