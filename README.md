# Saudi Vision 2030 — KPI Intelligence Dashboard

A Power BI dashboard tracking four core economic diversification KPIs from Saudi Arabia's
Vision 2030 program, built on real public data from GASTAT, MISA, Monsha'at, and HRSD.

**Tools:** Power BI · DAX · SQL-style relational data model · Excel

## What this tracks

| KPI | 2030 Target | Source |
|---|---|---|
| Non-oil GDP contribution (% of real GDP) | 65% | GASTAT National Accounts |
| Saudi national unemployment rate (%) | 5% | GASTAT Labour Force Survey |
| FDI net inflows (USD billion) | $100bn | MISA / SAMA |
| SME contribution to GDP (%) | 35% | Monsha'at SME Monitor |

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
  likely methodology vintage.
- **Non-oil GDP share moves with oil prices mechanically**, even with no change in non-oil
  sector performance, since it's a share of total GDP. A 2022 dip reflects high oil prices
  diluting the denominator, not a diversification setback.
- **SME GDP contribution is the lowest-confidence series** — Monsha'at doesn't publish this
  on a regular audited cadence; figures come from press statements and vary by source.

Full source-by-source notes are in the `Methodology_Notes` and `KPI_Dimension` tabs of the
Excel data file.

## Repo contents

- `Vision2030_KPI_Dashboard.pbix` — the Power BI report
- `Vision2030_KPI_Dataset.xlsx` — source data, with README, data dictionary, and methodology
  notes tabs
- `DAX_Measures.txt` — every DAX measure used, with plain-English rationale for each
- `BUILD_GUIDE.md` — step-by-step build instructions
- `/screenshots` — dashboard preview images

## Key DAX logic

The dashboard's "on track / off track" status flag has to account for the fact that
**lower is better for unemployment but higher is better for the other three KPIs** — a
single hardcoded comparison would mislabel an improving unemployment rate as a failure.
This is handled via a `Direction` field in the KPI dimension table and a `SWITCH()`
measure that reads it. Full reasoning for every measure is documented in
`DAX_Measures.txt`.

## Limitations

This is a personal portfolio project using publicly available macroeconomic data, not an
official Vision 2030 reporting tool. Several KPIs (FDI, SME contribution) have known data
quality and comparability issues, documented transparently above rather than smoothed over.
