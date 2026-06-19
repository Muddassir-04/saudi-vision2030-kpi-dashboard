# Build Guide: Saudi Vision 2030 KPI Intelligence Dashboard
### Do this yourself in Power BI Desktop — ~30-45 minutes. This is what makes the project genuinely yours.

---

## Before you start
Open `Vision2030_KPI_Dataset.xlsx` and skim the **README** and **Methodology_Notes** tabs.
You need to be able to explain, in your own words, why the FDI series has a methodology
break in 2024, and why "Saudization rate" was replaced with unemployment rate as the
labour-market KPI. This is the first thing a sharp interviewer will probe.

---

## Step 1 — Load the data
1. Power BI Desktop → **Get Data** → **Excel Workbook** → select `Vision2030_KPI_Dataset.xlsx`
2. In the Navigator window, check the boxes for **KPI_Data** and **KPI_Dimension**
   (you can skip README and Methodology_Notes — those are for you, not the model)
3. Click **Transform Data** (not Load) to open Power Query Editor first

## Step 2 — Clean up types in Power Query
1. Select **KPI_Data** table
2. Click the column header icon on `Year` → confirm it's typed as **Whole Number**
3. Click the column header icon on `Value` and `Target_2030` → confirm **Decimal Number**
4. Everything else (`KPI`, `Unit`, `Source`, `Source_Detail`, `Notes`) should be **Text**
5. Click **Close & Apply** (top left)

## Step 3 — Build the relationship
1. Switch to **Model view** (left sidebar, third icon)
2. Drag from `KPI_Data[KPI]` to `KPI_Dimension[KPI]` to create the relationship
3. Confirm the relationship shows **many-to-one**, KPI_Data → KPI_Dimension
   (double-click the relationship line to verify if unsure)

## Step 4 — Add the DAX measures
1. Open `DAX_Measures.txt` from this project folder
2. In Power BI: **Modeling** tab → **New Measure**, for each measure in the file:
   - Use the measure name as the formula bar name (before the `=`)
   - Paste only the formula part (after the `=`)
   - Press Enter
3. Add them in this order (later ones reference earlier ones):
   `Current Value` → `Prior Year Value (robust)` → `YoY Variance %` →
   `Rolling 3Y Average` → `Target 2030` → `Variance to Target` →
   `Variance to Target %` → `KPI Status`
4. You can skip the first `Prior Year Value` (DATEADD version) — it's left in the
   file only so you understand *why* the robust version was needed. Don't add it
   to the model; it won't work cleanly without a marked date table.

## Step 5 — Build Page 1: Executive Overview
1. Add a **Slicer** visual → field: `KPI_Data[KPI]` → set to single-select.
   This is your "ministry-level stakeholder" drill control.
2. Add 4 **Card** visuals across the top:
   - Card 1: `Current Value` (filter visual to latest year, 2025)
   - Card 2: `Target 2030`
   - Card 3: `Variance to Target %`
   - Card 4: `KPI Status` (use conditional formatting: green/red background based on text)
3. Add a **Line chart**: X-axis = `Year`, Y-axis = `Current Value` and `Rolling 3Y Average`
   (two lines on one chart — this is your "rolling average" bullet point, made real)
4. Add a **Clustered column chart**: X-axis = `Year`, Y-axis = `YoY Variance %`
   (this is your "YoY variance" bullet point)

## Step 6 — Build Page 2: Drill-down / Sector detail
1. Duplicate Page 1, rename to "Drill-down"
2. Add a **Table** visual with columns: `Year`, `KPI`, `Current Value`, `Target 2030`,
   `Variance to Target %`, `Notes` — this is the "ministry-level stakeholders identify
   sector performance gaps" bullet. The Notes column surfacing methodology caveats
   directly in the table is what makes this defensible, not just decorative.
3. Add a **Bookmark** (View tab → Bookmarks pane → Add) for each KPI pre-selected,
   so you can demo "Non-oil GDP view" vs "FDI view" with one click in an interview.

## Step 7 — Polish
1. Rename Page 1 to "Executive Summary", Page 2 to "Sector Drill-down"
2. Add a text box title: "Saudi Vision 2030 — Economic Diversification KPI Tracker"
3. Add a small text box footer citing: "Sources: GASTAT, MISA, Monsha'at, HRSD —
   see Methodology Notes tab in source workbook for caveats"
4. File → Save As → `Vision2030_KPI_Dashboard.pbix`

## Step 8 — Publish to GitHub
1. Create a new GitHub repo, e.g. `saudi-vision2030-kpi-dashboard`
2. Add to the repo:
   - `Vision2030_KPI_Dashboard.pbix`
   - `Vision2030_KPI_Dataset.xlsx`
   - `DAX_Measures.txt`
   - `README.md` (provided separately — copy it in as `README.md`)
   - 2-3 screenshots of the actual dashboard pages (Export → take screenshots
     once you've built it, don't skip this — recruiters often can't open .pbix
     files, so screenshots are how most people will actually see your work)
3. Commit and push. Paste the repo URL in your CV under this project.

---

## What to be ready to explain in an interview
- Why non-oil GDP *share* can dip even when non-oil activity is growing (oil price effect)
- Why you used unemployment rate instead of a single "Saudization %" (no clean series exists)
- Why FDI numbers before/after 2024 aren't directly comparable (methodology rebase)
- Why `DIVIDE()` is used instead of `/` in your YoY measure
- Why the KPI Status measure needs the Direction field from KPI_Dimension
  (because "good" means different things for unemployment vs. FDI)

If you can answer those five points fluently, this project is genuinely yours —
not just a file in a folder.
