import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

const RAW = [{"year":2016,"kpi":"Non-oil GDP contribution (% of real GDP)","value":53.5,"unit":"%","target":65,"source":"GASTAT","notes":"GASTAT historical estimate (pre-2025 rebase), approx."},{"year":2017,"kpi":"Non-oil GDP contribution (% of real GDP)","value":53.8,"unit":"%","target":65,"source":"GASTAT","notes":"GASTAT historical estimate (pre-2025 rebase), approx."},{"year":2018,"kpi":"Non-oil GDP contribution (% of real GDP)","value":54,"unit":"%","target":65,"source":"GASTAT","notes":"GASTAT historical estimate (pre-2025 rebase), approx."},{"year":2019,"kpi":"Non-oil GDP contribution (% of real GDP)","value":55.5,"unit":"%","target":65,"source":"GASTAT","notes":"GASTAT historical estimate (pre-2025 rebase), approx."},{"year":2020,"kpi":"Non-oil GDP contribution (% of real GDP)","value":56,"unit":"%","target":65,"source":"GASTAT","notes":"Oil price collapse year; non-oil share rose mechanically as oil GDP fell."},{"year":2021,"kpi":"Non-oil GDP contribution (% of real GDP)","value":53,"unit":"%","target":65,"source":"GASTAT","notes":"Oil price/production recovery diluted non-oil share."},{"year":2022,"kpi":"Non-oil GDP contribution (% of real GDP)","value":50,"unit":"%","target":65,"source":"GASTAT","notes":"Oil GDP surge (high oil prices) — GASTAT Q1 2024 release cites non-oil at ~50% of current-price GDP for this period."},{"year":2023,"kpi":"Non-oil GDP contribution (% of real GDP)","value":50,"unit":"%","target":65,"source":"GASTAT","notes":"GASTAT: non-oil activities ~50% of GDP at current prices (Q1 2024 release)."},{"year":2024,"kpi":"Non-oil GDP contribution (% of real GDP)","value":55,"unit":"%","target":65,"source":"GASTAT","notes":"Post-2025 GASTAT rebase (2023 base year): non-oil real GDP grew 4.3% in 2024; rebased non-oil GDP growth ~4.5% real terms."},{"year":2025,"kpi":"Non-oil GDP contribution (% of real GDP)","value":55,"unit":"%","target":65,"source":"GASTAT","notes":"2025 Vision 2030 Annual Report: non-oil activities at 55% of real GDP (rebased methodology)."},{"year":2016,"kpi":"Saudi national unemployment rate (%)","value":12.1,"unit":"%","target":5,"source":"GASTAT","notes":"Pre-Vision 2030 baseline period."},{"year":2017,"kpi":"Saudi national unemployment rate (%)","value":12.8,"unit":"%","target":5,"source":"GASTAT","notes":"GASTAT Labour Force Survey."},{"year":2018,"kpi":"Saudi national unemployment rate (%)","value":12.9,"unit":"%","target":5,"source":"GASTAT","notes":"Historical peak cited in multiple Vision 2030 progress reports."},{"year":2019,"kpi":"Saudi national unemployment rate (%)","value":12,"unit":"%","target":5,"source":"GASTAT","notes":"GASTAT Labour Force Survey."},{"year":2020,"kpi":"Saudi national unemployment rate (%)","value":14.9,"unit":"%","target":5,"source":"GASTAT","notes":"COVID-19 labour market shock — temporary spike."},{"year":2021,"kpi":"Saudi national unemployment rate (%)","value":11,"unit":"%","target":5,"source":"GASTAT","notes":"Recovery post-COVID."},{"year":2022,"kpi":"Saudi national unemployment rate (%)","value":8,"unit":"%","target":5,"source":"GASTAT","notes":"Vision 2030's original 2030 target (8%) reached ~8 years early."},{"year":2023,"kpi":"Saudi national unemployment rate (%)","value":7.7,"unit":"%","target":5,"source":"GASTAT","notes":"GASTAT Labour Force Survey Q4 2023."},{"year":2024,"kpi":"Saudi national unemployment rate (%)","value":7,"unit":"%","target":5,"source":"GASTAT","notes":"GASTAT Q4 2024 — target revised down to 5% by 2030 given early achievement of original 8% goal."},{"year":2025,"kpi":"Saudi national unemployment rate (%)","value":7,"unit":"%","target":5,"source":"GASTAT","notes":"Held near 7% through 2025 per GASTAT quarterly releases; revised national target now 5% by 2030."},{"year":2016,"kpi":"FDI net inflows (USD billion)","value":7.45,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"Pre-rebase (old SAMA/SAGIA methodology)."},{"year":2017,"kpi":"FDI net inflows (USD billion)","value":1.42,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"Pre-rebase. Lowest point in the series — coincides with early reform uncertainty."},{"year":2018,"kpi":"FDI net inflows (USD billion)","value":4.25,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"Pre-rebase (old methodology)."},{"year":2019,"kpi":"FDI net inflows (USD billion)","value":4.56,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"Pre-rebase (old methodology). Macrotrends/World Bank series."},{"year":2020,"kpi":"FDI net inflows (USD billion)","value":1.62,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"Pre-rebase. COVID-19 era trough."},{"year":2021,"kpi":"FDI net inflows (USD billion)","value":19.29,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"New MISA methodology (2024 rebase) shows much higher figure than originally published; one-off Aramco infrastructure deal contributed materially."},{"year":2022,"kpi":"FDI net inflows (USD billion)","value":26.71,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"New MISA methodology. New figures ~62% higher than old statistics for 2020-22 combined, partly reflecting a large Aramco pipeline deal."},{"year":2023,"kpi":"FDI net inflows (USD billion)","value":25.6,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"MISA official 2023 report: SAR 96bn (~$25.6bn), 16% above the National Investment Strategy target for the year."},{"year":2024,"kpi":"FDI net inflows (USD billion)","value":22,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"Indicative — official 2024 full-year MISA report figure; treat as approximate pending confirmation against final MISA annual report."},{"year":2025,"kpi":"FDI net inflows (USD billion)","value":24,"unit":"$bn","target":100,"source":"MISA / SAMA / World Bank","notes":"Indicative estimate based on quarterly net FDI run-rate reported by SAMA/CEIC through 2025; confirm against final MISA 2025 annual report before citing precisely."},{"year":2016,"kpi":"SME contribution to GDP (%)","value":20,"unit":"%","target":35,"source":"Monsha'at","notes":"Monsha'at baseline at program launch."},{"year":2017,"kpi":"SME contribution to GDP (%)","value":20,"unit":"%","target":35,"source":"Monsha'at","notes":"Monsha'at — limited annual movement reported in early years."},{"year":2018,"kpi":"SME contribution to GDP (%)","value":20,"unit":"%","target":35,"source":"Monsha'at","notes":"Monsha'at SME Monitor."},{"year":2019,"kpi":"SME contribution to GDP (%)","value":22,"unit":"%","target":35,"source":"Monsha'at","notes":"Monsha'at SME Monitor reports gradual increase."},{"year":2020,"kpi":"SME contribution to GDP (%)","value":22,"unit":"%","target":35,"source":"Monsha'at","notes":"Monsha'at — COVID-19 period; growth plateaued."},{"year":2021,"kpi":"SME contribution to GDP (%)","value":23,"unit":"%","target":35,"source":"Monsha'at","notes":"Argaam-reported Monsha'at governor statement put SME GDP contribution at 28.7% in March 2021 — note this figure has not been consistently repeated in later official communications, illustrating reporting volatility in this KPI."},{"year":2022,"kpi":"SME contribution to GDP (%)","value":23,"unit":"%","target":35,"source":"Monsha'at","notes":"Monsha'at SME Monitor / Investment Climate Statement series."},{"year":2023,"kpi":"SME contribution to GDP (%)","value":23,"unit":"%","target":35,"source":"Monsha'at","notes":"Most frequently cited figure across 2023-2025 secondary sources (~23%)."},{"year":2024,"kpi":"SME contribution to GDP (%)","value":23,"unit":"%","target":35,"source":"Monsha'at","notes":"Monsha'at — active SME registrations reached record highs (1.7M by 2025) but GDP-share metric is reported infrequently/inconsistently."},{"year":2025,"kpi":"SME contribution to GDP (%)","value":23,"unit":"%","target":35,"source":"Monsha'at","notes":"Held flat in most recent secondary reporting; official Monsha'at GDP-contribution figure for 2025 not yet located in a single authoritative bulletin — flagged as lowest-confidence series in this dataset."}];

const safeFmt = (fn) => (v) => (typeof v === 'number' && !isNaN(v)) ? fn(v) : '—';

const KPIS = [
  { key: "Non-oil GDP contribution (% of real GDP)", short: "Non-Oil GDP Share", pillar: "A Thriving Economy", direction: "up", target: 65, fmt: safeFmt(v => `${v.toFixed(1)}%`), breakYear: null },
  { key: "Saudi national unemployment rate (%)", short: "National Unemployment", pillar: "A Vibrant Society", direction: "down", target: 5, fmt: safeFmt(v => `${v.toFixed(1)}%`), breakYear: null },
  { key: "FDI net inflows (USD billion)", short: "FDI Net Inflows", pillar: "An Ambitious Nation", direction: "up", target: 100, fmt: safeFmt(v => `$${v.toFixed(1)}bn`), breakYear: 2024 },
  { key: "SME contribution to GDP (%)", short: "SME GDP Contribution", pillar: "A Thriving Economy", direction: "up", target: 35, fmt: safeFmt(v => `${v.toFixed(1)}%`), breakYear: null },
];

function rolling3(series) {
  return series.map((d, i) => {
    const window = series.slice(Math.max(0, i - 2), i + 1);
    const avg = window.reduce((s, x) => s + x.value, 0) / window.length;
    return { ...d, rolling: avg };
  });
}

const STATUS_COLOR = { on: '#1B7A5A', improving: '#C9A24B', stalled: '#B23A2F', off: '#B23A2F' };
const STATUS_LABEL = { on: 'On Track', improving: 'Improving', stalled: 'Stalled', off: 'Off Track' };

function statusOf(kpi, series) {
  const latest = series[series.length - 1];
  const variance = (latest.value - kpi.target) / kpi.target;
  const onTrack = kpi.direction === "down" ? variance <= 0 : variance >= 0;
  if (onTrack) return "on";

  // Off target — check whether the recent trend is closing the gap or not.
  // Use a short window (up to 3 prior years) to judge direction, since a
  // single-year blip (e.g. COVID, an oil price swing) shouldn't flip the label.
  const window = series.slice(-4); // latest + up to 3 prior points
  if (window.length < 2) return "off"; // not enough history to judge trend

  const first = window[0].value;
  const last = window[window.length - 1].value;
  const movingRight = kpi.direction === "down" ? last < first : last > first;

  return movingRight ? "improving" : "stalled";
}

export default function Dashboard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = KPIS[activeIdx];

  const series = useMemo(() => {
    const raw = RAW.filter(d => d.kpi === active.key).sort((a, b) => a.year - b.year);
    return rolling3(raw);
  }, [active]);

  const latest = series[series.length - 1];
  const prior = series[series.length - 2];
  const yoy = prior ? ((latest.value - prior.value) / prior.value) * 100 : null;
  const varToTarget = ((latest.value - active.target) / active.target) * 100;
  const status = statusOf(active, series);

  const yoySeries = series.map((d, i) => {
    if (i === 0) return { ...d, yoy: null };
    const p = series[i - 1];
    return { ...d, yoy: ((d.value - p.value) / p.value) * 100 };
  });

  return (
    <div style={{
      fontFamily: "'Archivo', 'Inter', sans-serif",
      background: '#F7F5F0',
      minHeight: '100%',
      padding: '0',
      color: '#0B1F3A',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        .mono { font-family: 'JetBrains Mono', monospace; }
        .kpi-tab { transition: all 0.15s ease; cursor: pointer; }
        .kpi-tab:hover { background: #0B1F3A0a; }
      `}</style>

      {/* Header band */}
      <div style={{ background: '#0B1F3A', padding: '28px 32px 24px', borderBottom: '3px solid #C9A24B' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ color: '#C9A24B', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              Vision 2030 · Economic Diversification Tracker
            </div>
            <h1 style={{ color: '#F7F5F0', fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
              KPI Intelligence Dashboard
            </h1>
          </div>
          <div className="mono" style={{ color: '#8FA0BC', fontSize: 12, textAlign: 'right' }}>
            DATA WINDOW: 2016–2025<br/>SOURCES: GASTAT · MISA · MONSHA'AT
          </div>
        </div>
      </div>

      {/* KPI selector tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #0B1F3A1a', background: '#FFFFFF' }}>
        {KPIS.map((k, i) => {
          const isActive = i === activeIdx;
          const kSeries = RAW.filter(d => d.kpi === k.key).sort((a, b) => a.year - b.year);
          const last = kSeries[kSeries.length - 1];
          const st = statusOf(k, kSeries);
          return (
            <div key={k.key} className="kpi-tab" onClick={() => setActiveIdx(i)}
              style={{
                flex: 1, padding: '14px 18px', borderBottom: isActive ? '3px solid #C9A24B' : '3px solid transparent',
                background: isActive ? '#0B1F3A06' : 'transparent',
              }}>
              <div style={{ fontSize: 10, color: '#5A6472', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{k.pillar}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1F3A', marginTop: 2 }}>{k.short}</div>
              <div className="mono" style={{ fontSize: 18, fontWeight: 600, marginTop: 4, color: STATUS_COLOR[st] }}>
                {k.fmt(last.value)}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '24px 32px 40px' }}>
        {/* Card row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          <Card label="Current Value" value={active.fmt(latest.value)} sub={`as of ${latest.year}`} />
          <Card label="2030 Target" value={active.fmt(active.target)} sub={active.direction === 'down' ? 'lower is better' : 'higher is better'} />
          <Card label="YoY Variance" value={yoy === null ? '—' : `${yoy > 0 ? '+' : ''}${yoy.toFixed(1)}%`}
            sub={`${latest.year - 1} → ${latest.year}`}
            tone={yoy === null ? 'neutral' : (active.direction === 'down' ? yoy < 0 : yoy > 0) ? 'good' : 'bad'} />
          <Card label="Status" value={STATUS_LABEL[status]}
            sub={`${varToTarget > 0 ? '+' : ''}${varToTarget.toFixed(1)}% vs target`}
            color={STATUS_COLOR[status]} />
        </div>

        {/* Methodology flag, if relevant */}
        {active.breakYear && (
          <div style={{
            background: '#C9A24B14', border: '1px solid #C9A24B55', borderRadius: 4,
            padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#0B1F3A', display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
            <span style={{ color: '#C9A24B', fontWeight: 800, fontSize: 15 }}>⚑</span>
            <span><strong>Methodology break at {active.breakYear}:</strong> MISA/GASTAT/SAMA revised the FDI calculation methodology in 2024 with IMF assistance. Pre- and post-{active.breakYear} figures are not directly comparable — see the marker on the chart below.</span>
          </div>
        )}

        {/* Trend chart */}
        <Panel title={`${active.short} — Trend & Rolling 3-Year Average`}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={series} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B1F3A12" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#5A6472' }} axisLine={{ stroke: '#0B1F3A22' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#5A6472' }} axisLine={{ stroke: '#0B1F3A22' }} />
              <Tooltip content={<CustomTooltip fmt={active.fmt} />} />
              <ReferenceLine y={active.target} stroke="#C9A24B" strokeDasharray="4 4" strokeWidth={1.5}
                label={{ value: `2030 target: ${active.fmt(active.target)}`, position: 'insideTopRight', fontSize: 11, fill: '#C9A24B', fontWeight: 600 }} />
              {active.breakYear && (
                <ReferenceLine x={active.breakYear} stroke="#B23A2F" strokeDasharray="2 2" strokeWidth={1.5}
                  label={{ value: 'methodology rebase', angle: -90, position: 'insideTopLeft', fontSize: 10, fill: '#B23A2F', fontWeight: 600 }} />
              )}
              <Line type="monotone" dataKey="value" stroke="#0B1F3A" strokeWidth={2.5} dot={{ r: 3, fill: '#0B1F3A' }} name="Actual" />
              <Line type="monotone" dataKey="rolling" stroke="#1B7A5A" strokeWidth={2} strokeDasharray="5 3" dot={false} name="Rolling 3Y Avg" />
            </LineChart>
          </ResponsiveContainer>
          <Legend items={[
            { color: '#0B1F3A', label: 'Actual value', dash: false },
            { color: '#1B7A5A', label: 'Rolling 3-year average', dash: true },
            { color: '#C9A24B', label: '2030 target', dash: true },
          ]} />
        </Panel>

        {/* YoY chart */}
        <Panel title={`${active.short} — Year-over-Year Variance`}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={yoySeries.filter(d => d.yoy !== null)} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B1F3A12" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#5A6472' }} axisLine={{ stroke: '#0B1F3A22' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'JetBrains Mono', fill: '#5A6472' }} axisLine={{ stroke: '#0B1F3A22' }}
                tickFormatter={v => `${v}%`} />
              <Tooltip content={<YoYTooltip />} />
              <ReferenceLine y={0} stroke="#0B1F3A44" />
              <Bar dataKey="yoy" radius={[3, 3, 0, 0]}>
                {yoySeries.filter(d => d.yoy !== null).map((d, i) => {
                  const good = active.direction === 'down' ? d.yoy < 0 : d.yoy > 0;
                  return <Cell key={`c-${i}`} fill={good ? '#1B7A5A' : '#B23A2F'} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        {/* Drill-down table */}
        <Panel title="Sector Drill-Down — Full Series">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #0B1F3A' }}>
                  {['Year', 'Value', 'Target', 'Variance', 'Status', 'Notes'].map(h => (
                    <th key={h} style={{ textAlign: h === 'Notes' ? 'left' : 'right', padding: '8px 10px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5A6472', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {series.slice().reverse().map((d) => {
                  const v = ((d.value - active.target) / active.target) * 100;
                  const idx = series.findIndex(s => s.year === d.year);
                  const st = statusOf(active, series.slice(0, idx + 1));
                  return (
                    <tr key={d.year} style={{ borderBottom: '1px solid #0B1F3A0f' }}>
                      <td className="mono" style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600 }}>{d.year}</td>
                      <td className="mono" style={{ padding: '8px 10px', textAlign: 'right' }}>{active.fmt(d.value)}</td>
                      <td className="mono" style={{ padding: '8px 10px', textAlign: 'right', color: '#5A6472' }}>{active.fmt(active.target)}</td>
                      <td className="mono" style={{ padding: '8px 10px', textAlign: 'right', color: v >= 0 ? '#1B7A5A' : '#B23A2F' }}>
                        {v > 0 ? '+' : ''}{v.toFixed(1)}%
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                          background: `${STATUS_COLOR[st]}18`,
                          color: STATUS_COLOR[st],
                        }}>{STATUS_LABEL[st].toUpperCase()}</span>
                      </td>
                      <td style={{ padding: '8px 10px', color: '#5A6472', maxWidth: 320, fontSize: 12, lineHeight: 1.4 }}>{d.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <div style={{ marginTop: 8, fontSize: 11, color: '#8a92a0', lineHeight: 1.6 }}>
          Built on publicly available data from GASTAT, MISA, and Monsha'at. "Saudi national unemployment rate" is used as the
          national-level proxy for labour-market nationalization progress, since Saudization (Nitaqat) is implemented as
          sector-specific quotas without a single published national percentage. FDI figures before/after 2024 reflect
          different reporting methodologies and should not be compared without adjustment.
        </div>
      </div>
    </div>
  );
}

function Card({ label, value, sub, tone, color }) {
  const toneColor = color || (tone === 'good' ? '#1B7A5A' : tone === 'bad' ? '#B23A2F' : '#0B1F3A');
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #0B1F3A14', borderRadius: 6, padding: '16px 18px' }}>
      <div style={{ fontSize: 11, color: '#5A6472', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{label}</div>
      <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: toneColor, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#5A6472', marginTop: 6 }}>{sub}</div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #0B1F3A14', borderRadius: 6, padding: '18px 20px', marginBottom: 18 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0B1F3A', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 4, height: 14, background: '#C9A24B', display: 'inline-block', borderRadius: 1 }} />
        {title}
      </div>
      {children}
    </div>
  );
}

function Legend({ items }) {
  return (
    <div style={{ display: 'flex', gap: 18, marginTop: 8, flexWrap: 'wrap' }}>
      {items.map(it => (
        <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A6472' }}>
          <span style={{ width: 14, height: it.dash ? 0 : 2, borderTop: `2px ${it.dash ? 'dashed' : 'solid'} ${it.color}` }} />
          {it.label}
        </div>
      ))}
    </div>
  );
}

function CustomTooltip({ active, payload, label, fmt }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0] && payload[0].payload;
  if (!d || typeof d.value !== 'number') return null;
  return (
    <div style={{ background: '#0B1F3A', color: '#F7F5F0', padding: '10px 12px', borderRadius: 4, fontSize: 12, maxWidth: 260 }}>
      <div className="mono" style={{ fontWeight: 700, marginBottom: 4 }}>{label}: {fmt(d.value)}</div>
      <div style={{ color: '#8FA0BC', lineHeight: 1.4 }}>{d.notes}</div>
    </div>
  );
}

function YoYTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const v = payload[0] && payload[0].value;
  if (typeof v !== 'number') return null;
  return (
    <div style={{ background: '#0B1F3A', color: '#F7F5F0', padding: '8px 12px', borderRadius: 4, fontSize: 12 }} className="mono">
      {label}: {v > 0 ? '+' : ''}{v.toFixed(1)}%
    </div>
  );
}
