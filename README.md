# Saudi Vision 2030 — KPI Intelligence Dashboard

**Live demo: https://muddassir-04.github.io/saudi-vision2030-kpi-dashboard/**

An interactive web dashboard tracking four core economic diversification KPIs from Saudi
Arabia's Vision 2030 program, built on real public data from GASTAT, MISA, Monsha'at, and
HRSD.

**Tools:** React · JavaScript · Excel/data modeling

## What this tracks

| KPI | 2030 Target | Source |
|---|---|---|
| Non-oil GDP contribution (% of real GDP) | 65% | GASTAT National Accounts |
| Saudi national unemployment rate (%) | 5% | GASTAT Labour Force Survey |
| FDI net inflows (USD billion) | $100bn | MISA / SAMA |
| SME contribution to GDP (%) | 35% | Monsha'at SME Monitor |

Each KPI tab shows: current value vs. target, year-over-year variance, a trend chart with
rolling 3-year average, a year-over-year bar chart, and a full drill-down table with sourced
notes for every data point.

## Trend-aware status, not just on/off

Rather than a flat "on track / off track" flag, each KPI is classified as:
- **On Track** — already at or past its 2030 target
- **Improving** — behind target, but the recent multi-year trend is closing the gap
- **Stalled** — behind target and not meaningfully closing the gap

This matters because **lower is better for unemployment but higher is better for the other
three KPIs** — a flat comparison would mislabel an improving unemployment rate as a failure.
The status logic accounts for each KPI's direction and looks at a short trailing window of
years rather than just the latest point, so a single-year blip (COVID, an oil price swing)
doesn't flip the label.

## Why unemployment rate, not "Saudization %"

Saudization (Nitaqat) is implemented as hundreds of sector-specific hiring quotas with
different phase-in dates — there's no single clean national percentage to chart as a time
series. The Saudi national unemployment rate is the consistently tracked, officially
reported Vision 2030 headline KPI for labour-market nationalization outcomes, so this
dashboard uses it as the proxy for that pillar. See `Vision2030_KPI_Dataset.xlsx` →
`Methodology_Notes` tab for the full reasoning.

## Data notes worth knowing before you trust any single number here

- **FDI figures have a methodology break.** MISA, GASTAT, and SAMA jointly revised the FDI
  calculation methodology in 2024 with IMF technical assistance. Post-rebase figures are
  roughly 60%+ higher than the old series for the same years. Pre/post-2024 FDI values in
  this dataset are **not directly comparable** — each data point is annotated with its
  likely methodology vintage, and the dashboard marks the break directly on the chart.
- **Non-oil GDP share moves with oil prices mechanically**, even with no change in non-oil
  sector performance, since it's a share of total GDP. A 2022 dip reflects high oil prices
  diluting the denominator, not a diversification setback.
- **SME GDP contribution is the lowest-confidence series** — Monsha'at doesn't publish this
  on a regular audited cadence; figures come from press statements and vary by source.

Full source-by-source notes are in the `Methodology_Notes` and `KPI_Dimension` tabs of the
Excel data file.

## Repo contents

- `index.html` — **the live dashboard** (self-contained: plain JavaScript, no build step,
  no external charting library — this is what's deployed via GitHub Pages)
- `Vision2030_KPI_Dashboard.jsx` — the original React source, written for a standard
  React build pipeline (Vite/Create React App/etc.). `index.html` is a precompiled,
  dependency-free version of this same component, generated for static hosting on GitHub
  Pages. If you clone this into a real React project, use the `.jsx` file.
- `Vision2030_KPI_Dataset.xlsx` — source data, with README, data dictionary, and methodology
  notes tabs
- `DAX_Measures.txt` — reference implementation of the same logic (rolling average, YoY
  variance, target-vs-actual) expressed as Power BI DAX measures, for anyone building the
  equivalent dashboard in Power BI
- `BUILD_GUIDE.md` — step-by-step Power BI build instructions, for the DAX reference version

## Limitations

This is a personal portfolio project using publicly available macroeconomic data, not an
official Vision 2030 reporting tool. Several KPIs (FDI, SME contribution) have known data
quality and comparability issues, documented transparently above rather than smoothed over.
