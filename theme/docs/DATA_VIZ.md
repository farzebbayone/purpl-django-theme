# Data Visualization

ECharts integration with theme-aware colors and automatic dark/light mode switching.

## Setup

Add ECharts CDN and the theme helper in your template:

```html
{% load static %}

{% block extra_head %}
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
<script src="{% static 'theme/js/echarts-theme.js' %}"></script>
{% endblock %}
```

## ThemeCharts API

### `ThemeCharts.create(el, options)`

Creates a chart with theme-aware colors. Handles dark/light mode switching and window resize automatically.

```js
var chart = ThemeCharts.create(document.getElementById("my-chart"), {
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
  yAxis: { type: "value" },
  series: [{ type: "bar", data: [120, 200, 150] }]
});
```

### `ThemeCharts.colors`

Named color object matching the theme palette:

```js
ThemeCharts.colors.primary   // "#5E6AD2"
ThemeCharts.colors.accent    // "#0EA5E9"
ThemeCharts.colors.success   // "#10B981"
ThemeCharts.colors.ai        // "#D946EF"
ThemeCharts.colors.danger    // "#EF4444"
ThemeCharts.colors.warning   // "#F59E0B"
ThemeCharts.colors.info      // "#06B6D4"
ThemeCharts.colors.tertiary  // "#8B5CF6"
ThemeCharts.colors.secondary // "#64748B"
```

### `ThemeCharts.palette`

Array of colors in recommended order for multi-series charts:

```js
ThemeCharts.palette
// ["#5E6AD2", "#0EA5E9", "#10B981", "#D946EF", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4"]
```

### `ThemeCharts.isDark()`

Returns `true` if dark mode is active.

### `ThemeCharts.refresh()`

Manually re-render all charts (called automatically on theme toggle).

## Chart Container

```html
<div class="chart-container"></div>         <!-- 300px min-height -->
<div class="chart-container chart-container--sm"></div>  <!-- 200px -->
<div class="chart-container chart-container--lg"></div>  <!-- 400px -->
<div class="chart-container chart-container--xl"></div>  <!-- 500px -->
```

## Chart Card

Full card with header, chart body, and optional footer:

```html
<div class="card chart-card">
  <div class="chart-card__header">
    <div>
      <h3 class="chart-card__title">Revenue</h3>
      <p class="chart-card__subtitle">Last 12 months</p>
    </div>
    <div class="chart-card__actions">
      <!-- period selector, buttons, etc. -->
    </div>
  </div>
  <div class="chart-card__body">
    <div id="my-chart" class="chart-container"></div>
  </div>
  <div class="chart-card__footer">
    <ul class="chart-legend">
      <li class="chart-legend__item">
        <span class="chart-legend__dot" style="background:#5E6AD2"></span>
        Series A
        <span class="chart-legend__value">$584K</span>
      </li>
    </ul>
  </div>
</div>
```

## Period Selector

Tabs for switching time ranges:

```html
<div class="chart-period">
  <button class="chart-period__btn">1M</button>
  <button class="chart-period__btn chart-period__btn--active">1Y</button>
  <button class="chart-period__btn">All</button>
</div>
```

## KPI Cards

Enhanced stat cards with icons, trends, progress bars, and sparklines.

### Basic KPI

```html
<div class="card">
  <div class="kpi">
    <div class="kpi__header">
      <span class="kpi__label">Revenue</span>
      <div class="kpi__icon kpi__icon--primary">
        <i data-lucide="dollar-sign" style="width:1rem;height:1rem"></i>
      </div>
    </div>
    <div>
      <span class="kpi__value">$72.4K</span>
      <span class="kpi__change kpi__change--up">
        <i data-lucide="trending-up" style="width:0.75rem;height:0.75rem"></i>
        +12.5%
      </span>
    </div>
  </div>
</div>
```

### Icon Colors

```
kpi__icon--primary    kpi__icon--success    kpi__icon--danger
kpi__icon--warning    kpi__icon--info       kpi__icon--ai
kpi__icon--accent     kpi__icon--tertiary
```

### With Progress Bar

```html
<div class="kpi__progress">
  <div class="kpi__progress-bar">
    <div class="kpi__progress-fill kpi__progress-fill--success" style="width:75%"></div>
  </div>
  <div class="kpi__progress-label">
    <span>Storage used</span>
    <span>75%</span>
  </div>
</div>
```

### With Sparkline

```html
<div class="kpi__footer">
  <span class="kpi__detail">vs $64.3K last month</span>
  <div class="kpi__sparkline" id="sparkline-1"></div>
</div>
```

Initialize sparkline via JS:
```js
ThemeCharts.create(document.getElementById("sparkline-1"), {
  grid: { left: 0, right: 0, top: 0, bottom: 0 },
  xAxis: { show: false, type: "category", data: labels },
  yAxis: { show: false, type: "value", min: "dataMin", max: "dataMax" },
  series: [{
    type: "line", data: values, smooth: true, symbol: "none",
    lineStyle: { width: 1.5, color: ThemeCharts.colors.primary },
    areaStyle: { opacity: 0.1, color: ThemeCharts.colors.primary },
  }]
});
```

## Metric Rows

Compact horizontal metrics for sidebar panels or card bodies:

```html
<div class="metric-row">
  <div class="metric-row__label">
    <span class="metric-row__dot" style="background:#5E6AD2"></span>
    Direct
  </div>
  <div class="metric-row__bar">
    <div class="metric-row__bar-fill" style="width:42%;background:#5E6AD2"></div>
  </div>
  <span class="metric-row__value">42%</span>
</div>
```

## Chart Legend

Custom inline legend (alternative to ECharts built-in):

```html
<ul class="chart-legend">
  <li class="chart-legend__item">
    <span class="chart-legend__dot" style="background:#5E6AD2"></span>
    Revenue
    <span class="chart-legend__value">$584K</span>
  </li>
  <li class="chart-legend__item">
    <span class="chart-legend__dot" style="background:#0EA5E9"></span>
    Expenses
    <span class="chart-legend__value">$312K</span>
  </li>
</ul>
```

## Dark Mode

All charts automatically re-render when the user toggles dark/light mode. The `ThemeCharts.create()` API handles this — no manual work needed. Colors, grid lines, tooltips, and text all adapt.

## Common Chart Patterns

### Line + Area

```js
ThemeCharts.create(el, {
  xAxis: { type: "category", data: months, boundaryGap: false },
  yAxis: { type: "value" },
  series: [{
    type: "line", data: values, smooth: true, symbol: "none",
    lineStyle: { width: 2.5 },
    areaStyle: { opacity: 0.08 },
    color: ThemeCharts.colors.primary,
  }]
});
```

### Doughnut

```js
ThemeCharts.create(el, {
  tooltip: { trigger: "item", formatter: "{b}: {d}%" },
  series: [{
    type: "pie", radius: ["50%", "75%"],
    label: { show: false },
    data: [
      { value: 42, name: "Direct" },
      { value: 28, name: "Search" },
    ]
  }]
});
```

### Gauge

```js
ThemeCharts.create(el, {
  series: [{
    type: "gauge", startAngle: 200, endAngle: -20,
    min: 0, max: 100, pointer: { show: false },
    progress: { show: true, width: 12, roundCap: true,
      itemStyle: { color: ThemeCharts.colors.success }
    },
    data: [{ value: 94 }],
  }]
});
```
