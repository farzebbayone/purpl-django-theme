// ECharts theme integration for Bootstrap Theme
// Provides theme-aware colors and auto dark/light mode switching
(function () {
  "use strict";

  var COLORS = {
    primary:   "#5E6AD2",
    secondary: "#64748B",
    tertiary:  "#8B5CF6",
    accent:    "#0EA5E9",
    ai:        "#D946EF",
    success:   "#10B981",
    danger:    "#EF4444",
    warning:   "#F59E0B",
    info:      "#06B6D4",
  };

  var PALETTE = [
    COLORS.primary,
    COLORS.accent,
    COLORS.success,
    COLORS.ai,
    COLORS.warning,
    COLORS.tertiary,
    COLORS.danger,
    COLORS.info,
  ];

  function isDark() {
    return document.documentElement.getAttribute("data-bs-theme") === "dark";
  }

  function getThemeOpts() {
    var dark = isDark();
    return {
      color: PALETTE,
      backgroundColor: "transparent",
      textStyle: {
        fontFamily: "'Inter', system-ui, sans-serif",
        color: dark ? "#94a3b8" : "#64748b",
      },
      title: {
        textStyle: { color: dark ? "#e2e8f0" : "#1e293b", fontWeight: 600 },
        subtextStyle: { color: dark ? "#64748b" : "#94a3b8" },
      },
      legend: {
        textStyle: { color: dark ? "#94a3b8" : "#64748b" },
      },
      tooltip: {
        backgroundColor: dark ? "#1e293b" : "#ffffff",
        borderColor: dark ? "#334155" : "#e2e8f0",
        textStyle: { color: dark ? "#e2e8f0" : "#1e293b", fontSize: 12 },
        extraCssText: "border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);",
      },
      grid: {
        borderColor: dark ? "#1e293b" : "#f1f5f9",
      },
      categoryAxis: {
        axisLine: { lineStyle: { color: dark ? "#334155" : "#e2e8f0" } },
        axisTick: { lineStyle: { color: dark ? "#334155" : "#e2e8f0" } },
        axisLabel: { color: dark ? "#64748b" : "#94a3b8" },
        splitLine: { lineStyle: { color: dark ? "#1e293b" : "#f1f5f9" } },
      },
      valueAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: dark ? "#64748b" : "#94a3b8" },
        splitLine: { lineStyle: { color: dark ? "#1e293b" : "#f1f5f9" } },
      },
    };
  }

  // Register theme with ECharts
  function registerTheme() {
    if (typeof echarts === "undefined") return;
    echarts.registerTheme("theme-light", getThemeOpts());
    echarts.registerTheme("theme-dark", getThemeOpts());
  }

  // Initialize a chart with theme awareness
  function initChart(el, opts) {
    if (typeof echarts === "undefined") return null;
    var themeName = isDark() ? "theme-dark" : "theme-light";
    var chart = echarts.init(el, themeName, { renderer: "canvas" });
    if (opts) chart.setOption(opts);
    return chart;
  }

  // Track all charts for resize and theme switching
  var _charts = [];

  function createChart(el, opts) {
    var chart = initChart(el, opts);
    if (chart) {
      _charts.push({ el: el, opts: opts, instance: chart });
    }
    return chart;
  }

  // Refresh all charts on theme change
  function refreshCharts() {
    registerTheme();
    _charts.forEach(function (entry) {
      if (entry.instance) {
        entry.instance.dispose();
      }
      entry.instance = initChart(entry.el, entry.opts);
    });
  }

  // Listen for theme changes
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === "data-bs-theme") {
        refreshCharts();
      }
    });
  });

  // Resize all charts on window resize
  function handleResize() {
    _charts.forEach(function (entry) {
      if (entry.instance) entry.instance.resize();
    });
  }

  // Init
  document.addEventListener("DOMContentLoaded", function () {
    registerTheme();
    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener("resize", handleResize);
  });

  // Public API
  window.ThemeCharts = {
    colors: COLORS,
    palette: PALETTE,
    isDark: isDark,
    create: createChart,
    refresh: refreshCharts,
    getAll: function () { return _charts; },
  };
})();
