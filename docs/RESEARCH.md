# Research / design decisions

## Official brief

[Hyper Elements challenge #209](https://github.com/hyper-elements/hyper-elements/discussions/209), checked 17 November 2026: original template with meaningful library usage; public GitHub source and README including render instructions and screenshot; star official repository; submit official form. Five $100 winners. Deadline 29 November 2026 at 23:59 UTC. Judging includes originality, design quality, practical value, effective use and execution, not complexity alone.

[Existing submissions](https://github.com/hyper-elements/hyper-elements/discussions) included event kits, receipts, hospitality, courses, launches, resumes and portfolios. Signal Desk chooses an operational communication use case with explicit provenance and unknown-value handling rather than another launch or lifestyle template. This is differentiation from the inspected list, not a claim that no similar template exists anywhere.

## Proven patterns

- [Atlassian incident communication tutorial](https://www.atlassian.com/incident-management/tutorials/incident-communication): clear public titles, incident stages, affected components and prepared templates. Adaptation: lifecycle labels + separate summary, impact and customer action. No copied boilerplate.
- [Atlassian communication guidance](https://www.atlassian.com/incident-management/incident-communication): consistent communication through suitable channels. Adaptation: one record supplying distinct formats rather than independent messages.
- [Linear status](https://linearstatus.com/): separates current operational condition from component-level information. Adaptation: clear state labels and no assertion of “operational” without evidence. We do not reproduce Linear's layout or use its brand.
- [Carbon typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview): productive IBM Plex type hierarchy for task-focused interfaces, fixed heading scale, neutral running text and blue for actions. Adaptation: locally bundled Plex Sans, compact uppercase metadata, restrained fixed type scale, visible focus.

## Brand system

Signal Desk is an original text wordmark, not a copied third-party logo. The slash separates the product identifier from operational content. No stock icons, decorative illustration or generated imagery is used.

- Ink `#142D3C`: primary text and summary-image background.
- Action blue `#164ACB`: links, selected format and download button.
- Muted slate `#526471`: secondary text.
- White `#FFFFFF` and cool ground `#EFF3F5`: reading surface and workspace.
- Border `#CAD4DA`: information separation.
- Resolved green `#176344`, investigating amber `#885100`, reserved error red `#A52628`: semantic accents, always accompanied by text.

The primary, muted and semantic text colors are tested against white at WCAG AA 4.5:1. The initial marketing-like introduction was removed during review in favor of a compact functional heading. No gradients, glow, glass, stock icon circles, bento cards, decorative left bars, motion or fabricated metrics. The inspector border separates two functional panes; it is not a decorative status bar.

## Historical sample evidence

[GitHub Availability Report: October 2024](https://github.blog/news-insights/company-news/github-availability-report-october-2024/), first-party report published 14 November 2024 and updated 6 December 2024, checked 17 November 2026.

Fields map to the report's single October 11 incident:
- DNS failure after a database migration at one site.
- Approximately 17:31 UTC: first customer impact.
- 4% of Copilot users and 25% of Actions workflow users affected in the specific ways described.
- Code-search requests failed for roughly four hours.
- 20:52 UTC: revised mitigation began; 22:16 UTC: DNS fully healthy.
- 01:11 UTC on October 12: remaining code-search issues resolved.

The JSON is a concise factual paraphrase, not an article reproduction. Customer action is explicitly unspecified. `nextUpdate` is null; no retrospective next-update time is invented. This is static historical evidence, never advertised as fresh/live data.
