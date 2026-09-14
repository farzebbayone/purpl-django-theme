// ECharts theme integration for Bootstrap Theme
// Provides theme-aware colors and auto dark/light mode switching
(function () {
  "use strict";

  var COLORS = {
    primary:   "#CC297A",
    secondary: "#844190",
    tertiary:  "#AB68BF",
    accent:    "#1D4ED8",
    ai:        "#E85EA8",
    success:   "#15803D",
    danger:    "#DC2626",
    warning:   "#B45309",
    info:      "#2563EB",
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
        fontFamily: "'Nunito Sans', system-ui, sans-serif",
        color: dark ? "#a3a3a3" : "#525252",
      },
      title: {
        textStyle: { color: dark ? "#f5f5f5" : "#171717", fontWeight: 600 },
        subtextStyle: { color: dark ? "#737373" : "#a3a3a3" },
      },
      legend: {
        textStyle: { color: dark ? "#a3a3a3" : "#525252" },
      },
      tooltip: {
        backgroundColor: dark ? "#262626" : "#ffffff",
        borderColor: dark ? "#404040" : "#d4d4d4",
        textStyle: { color: dark ? "#f5f5f5" : "#171717", fontSize: 12 },
        extraCssText: "border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);",
      },
      grid: {
        borderColor: dark ? "#262626" : "#e5e5e5",
      },
      categoryAxis: {
        axisLine: { lineStyle: { color: dark ? "#404040" : "#d4d4d4" } },
        axisTick: { lineStyle: { color: dark ? "#404040" : "#d4d4d4" } },
        axisLabel: { color: dark ? "#737373" : "#a3a3a3" },
        splitLine: { lineStyle: { color: dark ? "#262626" : "#e5e5e5" } },
      },
      valueAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: dark ? "#737373" : "#a3a3a3" },
        splitLine: { lineStyle: { color: dark ? "#262626" : "#e5e5e5" } },
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
