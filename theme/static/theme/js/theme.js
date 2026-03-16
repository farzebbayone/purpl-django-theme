(function () {
  "use strict";

  // --- Dark Mode ---
  const THEME_KEY = "bs-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const icon = btn.querySelector("i");
    if (!icon) return;
    if (theme === "dark") {
      icon.className = "bi bi-sun";
    } else {
      icon.className = "bi bi-moon";
    }
  }

  function initTheme() {
    const theme = getPreferredTheme();
    setTheme(theme);

    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        const current =
          document.documentElement.getAttribute("data-bs-theme");
        setTheme(current === "dark" ? "light" : "dark");
      });
    }
  }

  // --- Sidebar ---
  const SIDEBAR_KEY = "sidebar-state";

  function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const layout = document.getElementById("layout");
    const toggle = document.getElementById("sidebar-toggle");
    if (!sidebar || !layout) return;

    const saved = localStorage.getItem(SIDEBAR_KEY) || "collapsed";
    applySidebarState(sidebar, layout, saved);

    if (toggle) {
      toggle.addEventListener("click", function () {
        const isCollapsed = sidebar.classList.contains("sidebar--collapsed");
        const newState = isCollapsed ? "expanded" : "collapsed";

        // Mobile toggle
        if (window.innerWidth < 768) {
          sidebar.classList.toggle("sidebar--mobile-open");
          return;
        }

        applySidebarState(sidebar, layout, newState);
        localStorage.setItem(SIDEBAR_KEY, newState);
      });
    }
  }

  function applySidebarState(sidebar, layout, state) {
    if (state === "collapsed") {
      sidebar.classList.add("sidebar--collapsed");
      layout.classList.add("layout--sidebar-collapsed");
    } else {
      sidebar.classList.remove("sidebar--collapsed");
      layout.classList.remove("layout--sidebar-collapsed");
    }
  }

  // --- Active Sidebar Link ---
  function initActiveLink() {
    var path = window.location.pathname;
    var links = document.querySelectorAll("[data-sidebar-link]");
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === "#") return;
      var isActive =
        (href === "/" && path === "/") ||
        (href !== "/" && path.startsWith(href));
      if (isActive) {
        link.classList.add("sidebar__link--active");
      }
    });
  }

  // --- Typewriter Effect ---
  // Usage: <div class="typewriter typewriter--streaming" data-typewriter data-typewriter-speed="20">
  //          <span class="typewriter__text"></span>
  //          <span class="typewriter__cursor"></span>
  //        </div>
  // Set data-typewriter-content="Full text" or provide via JS.
  function initTypewriters() {
    document.querySelectorAll("[data-typewriter]").forEach(function (el) {
      var textEl = el.querySelector(".typewriter__text");
      var content = el.getAttribute("data-typewriter-content");
      if (!textEl || !content) return;

      var speed = parseInt(el.getAttribute("data-typewriter-speed") || "20", 10);
      var i = 0;
      el.classList.add("typewriter--streaming");
      el.classList.remove("typewriter--done");
      textEl.textContent = "";

      var interval = setInterval(function () {
        textEl.textContent += content.charAt(i);
        i++;
        if (i >= content.length) {
          clearInterval(interval);
          el.classList.remove("typewriter--streaming");
          el.classList.add("typewriter--done");
        }
      }, speed);
    });
  }

  // Expose for external use
  window.ThemeTypewriter = {
    stream: function (el, text, speed) {
      speed = speed || 20;
      var textEl = el.querySelector(".typewriter__text");
      if (!textEl) return;
      el.classList.add("typewriter--streaming");
      el.classList.remove("typewriter--done");
      var i = 0;
      var interval = setInterval(function () {
        textEl.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          el.classList.remove("typewriter--streaming");
          el.classList.add("typewriter--done");
        }
      }, speed);
    },
  };

  // --- Thread Toggle ---
  function initThreads() {
    document.querySelectorAll("[data-thread-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("data-thread-toggle"));
        if (target) {
          var isHidden = target.style.display === "none" || !target.style.display;
          target.style.display = isHidden ? "block" : "none";
        }
      });
    });
  }

  // --- Composer ---
  var FORMAT_MAP = {
    bold:         { prefix: "**", suffix: "**", placeholder: "bold text" },
    italic:       { prefix: "_",  suffix: "_",  placeholder: "italic text" },
    code:         { prefix: "`",  suffix: "`",  placeholder: "code" },
    link:         { prefix: "[",  suffix: "](url)", placeholder: "link text" },
    list:         { prefix: "- ", suffix: "",   placeholder: "list item", line: true },
    "list-ordered": { prefix: "1. ", suffix: "", placeholder: "list item", line: true },
    strikethrough:{ prefix: "~~", suffix: "~~", placeholder: "text" },
    blockquote:   { prefix: "> ", suffix: "",   placeholder: "quote", line: true },
    "code-block": { prefix: "```\n", suffix: "\n```", placeholder: "code block" },
  };

  function wrapSelection(textarea, format) {
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var text = textarea.value;
    var selected = text.substring(start, end);
    var f = FORMAT_MAP[format];
    if (!f) return;

    // For line-level formats, ensure we're at the start of a line
    if (f.line && start > 0 && text[start - 1] !== "\n") {
      f = { prefix: "\n" + f.prefix, suffix: f.suffix, placeholder: f.placeholder };
    }

    var insert = selected || f.placeholder;
    var replacement = f.prefix + insert + f.suffix;
    textarea.setRangeText(replacement, start, end, "select");

    // Select inserted text (not wrappers) so user can type over placeholder
    if (!selected) {
      textarea.selectionStart = start + f.prefix.length;
      textarea.selectionEnd = start + f.prefix.length + insert.length;
    }

    textarea.focus();
    textarea.dispatchEvent(new Event("input"));
  }

  function initComposer() {
    document.querySelectorAll(".composer").forEach(function (composer) {
      var textarea = composer.querySelector(".composer__input");
      if (!textarea) return;

      // Auto-expand
      function resize() {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
      textarea.addEventListener("input", resize);

      // Enter to send, Shift+Enter for newline
      textarea.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          var sendBtn = composer.querySelector(".composer__send");
          if (sendBtn) sendBtn.click();
        }
      });

      // Formatting toolbar buttons
      composer.querySelectorAll(".composer__tool-btn[data-format]").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          var format = btn.getAttribute("data-format");
          wrapSelection(textarea, format);
        });
      });

      // Keyboard shortcuts (Ctrl/Cmd + B, I, K, E)
      textarea.addEventListener("keydown", function (e) {
        var mod = e.ctrlKey || e.metaKey;
        if (!mod) return;
        var map = { b: "bold", i: "italic", k: "link", e: "code" };
        var format = map[e.key.toLowerCase()];
        if (format) {
          e.preventDefault();
          wrapSelection(textarea, format);
        }
      });
    });
  }

  // --- Toast System ---
  var _toastContainer = null;

  function getToastContainer(position) {
    position = position || "top-right";
    var id = "toast-container-" + position;
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      el.className = "toast-container toast-container--" + position;
      el.setAttribute("aria-live", "polite");
      el.setAttribute("aria-atomic", "true");
      document.body.appendChild(el);
    }
    return el;
  }

  function showToast(opts) {
    opts = opts || {};
    var message = opts.message || "";
    var title = opts.title || "";
    var type = opts.type || "primary";
    var duration = opts.duration !== undefined ? opts.duration : 5000;
    var position = opts.position || "top-right";
    var icon = opts.icon || "";

    var iconMap = {
      success: "check-circle",
      danger: "alert-circle",
      warning: "alert-triangle",
      info: "info",
      ai: "sparkles",
      primary: "bell",
    };
    if (!icon) icon = iconMap[type] || "bell";

    var container = getToastContainer(position);

    var toast = document.createElement("div");
    toast.className = "theme-toast theme-toast--" + type;
    toast.setAttribute("role", "alert");
    toast.innerHTML =
      '<i data-lucide="' + icon + '" class="theme-toast__icon"></i>' +
      '<div class="theme-toast__content">' +
        (title ? '<div class="theme-toast__title">' + title + '</div>' : '') +
        '<div class="theme-toast__message">' + message + '</div>' +
      '</div>' +
      '<button class="theme-toast__close" aria-label="Close">' +
        '<i data-lucide="x" style="width:0.875rem;height:0.875rem"></i>' +
      '</button>' +
      (duration > 0 ? '<div class="theme-toast__timer" style="width:100%"></div>' : '');

    container.appendChild(toast);

    // Re-init lucide icons for the new toast
    if (typeof lucide !== "undefined") lucide.createIcons({ nodes: [toast] });

    // Close handler
    var closeBtn = toast.querySelector(".theme-toast__close");
    function dismiss() {
      toast.classList.add("theme-toast--exiting");
      setTimeout(function () { toast.remove(); }, 200);
    }
    closeBtn.addEventListener("click", dismiss);

    // Auto-dismiss with timer
    if (duration > 0) {
      var timer = toast.querySelector(".theme-toast__timer");
      if (timer) {
        // Start animation on next frame
        requestAnimationFrame(function () {
          timer.style.transitionDuration = duration + "ms";
          timer.style.width = "0%";
        });
      }
      setTimeout(dismiss, duration);
    }

    return { dismiss: dismiss, el: toast };
  }

  window.ThemeToast = {
    show: showToast,
    success: function (msg, opts) { return showToast(Object.assign({ message: msg, type: "success" }, opts)); },
    error: function (msg, opts) { return showToast(Object.assign({ message: msg, type: "danger" }, opts)); },
    warning: function (msg, opts) { return showToast(Object.assign({ message: msg, type: "warning" }, opts)); },
    info: function (msg, opts) { return showToast(Object.assign({ message: msg, type: "info" }, opts)); },
    ai: function (msg, opts) { return showToast(Object.assign({ message: msg, type: "ai" }, opts)); },
  };

  // --- Command Palette ---
  var _cmdPalette = null;
  var _cmdItems = [];
  var _cmdActiveIndex = 0;

  function initCommandPalette() {
    _cmdPalette = document.getElementById("cmd-palette");
    if (!_cmdPalette) return;

    var input = _cmdPalette.querySelector(".cmd-palette__input");
    var results = _cmdPalette.querySelector(".cmd-palette__results");

    // Collect items
    _cmdPalette.querySelectorAll(".cmd-palette__item").forEach(function (item) {
      _cmdItems.push({
        el: item,
        label: (item.querySelector(".cmd-palette__item-label") || item).textContent.toLowerCase(),
        href: item.getAttribute("data-href") || "",
      });
    });

    // Open with Cmd/Ctrl + K
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === "Escape" && _cmdPalette.classList.contains("cmd-palette--open")) {
        closePalette();
      }
    });

    // Backdrop close
    var backdrop = _cmdPalette.querySelector(".cmd-palette__backdrop");
    if (backdrop) backdrop.addEventListener("click", closePalette);

    // Filter on input
    if (input) {
      input.addEventListener("input", function () {
        filterItems(input.value.toLowerCase());
      });

      // Keyboard navigation
      input.addEventListener("keydown", function (e) {
        var visible = getVisibleItems();
        if (e.key === "ArrowDown") {
          e.preventDefault();
          _cmdActiveIndex = Math.min(_cmdActiveIndex + 1, visible.length - 1);
          updateActiveItem(visible);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          _cmdActiveIndex = Math.max(_cmdActiveIndex - 1, 0);
          updateActiveItem(visible);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (visible[_cmdActiveIndex]) {
            var href = visible[_cmdActiveIndex].href;
            if (href) window.location.href = href;
            closePalette();
          }
        }
      });
    }
  }

  function togglePalette() {
    if (_cmdPalette.classList.contains("cmd-palette--open")) {
      closePalette();
    } else {
      openPalette();
    }
  }

  function openPalette() {
    _cmdPalette.classList.add("cmd-palette--open");
    var input = _cmdPalette.querySelector(".cmd-palette__input");
    if (input) { input.value = ""; input.focus(); }
    filterItems("");
    _cmdActiveIndex = 0;
    updateActiveItem(getVisibleItems());
  }

  function closePalette() {
    _cmdPalette.classList.remove("cmd-palette--open");
  }

  function filterItems(query) {
    _cmdItems.forEach(function (item) {
      var match = !query || item.label.indexOf(query) !== -1;
      item.el.style.display = match ? "" : "none";
    });
    // Show/hide group labels
    _cmdPalette.querySelectorAll(".cmd-palette__group").forEach(function (group) {
      var hasVisible = group.querySelector('.cmd-palette__item[style=""], .cmd-palette__item:not([style])');
      group.style.display = hasVisible ? "" : "none";
    });
    _cmdActiveIndex = 0;
    updateActiveItem(getVisibleItems());
  }

  function getVisibleItems() {
    return _cmdItems.filter(function (item) { return item.el.style.display !== "none"; });
  }

  function updateActiveItem(visible) {
    _cmdItems.forEach(function (item) { item.el.classList.remove("cmd-palette__item--active"); });
    if (visible[_cmdActiveIndex]) {
      visible[_cmdActiveIndex].el.classList.add("cmd-palette__item--active");
      visible[_cmdActiveIndex].el.scrollIntoView({ block: "nearest" });
    }
  }

  // --- Topbar Dropdowns ---
  function initTopbarDropdowns() {
    document.querySelectorAll("[data-topbar-dropdown]").forEach(function (btn) {
      var panelId = btn.getAttribute("data-topbar-dropdown") + "-panel";
      var panel = document.getElementById(panelId);
      if (!panel) return;

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = panel.classList.contains("is-open");
        // Close all open panels first
        document.querySelectorAll(".topbar__dropdown-panel.is-open").forEach(function (p) {
          p.classList.remove("is-open");
        });
        if (!isOpen) panel.classList.add("is-open");
      });

      // Prevent clicks inside panel from closing it
      panel.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });

    // Close on outside click
    document.addEventListener("click", function () {
      document.querySelectorAll(".topbar__dropdown-panel.is-open").forEach(function (p) {
        p.classList.remove("is-open");
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".topbar__dropdown-panel.is-open").forEach(function (p) {
          p.classList.remove("is-open");
        });
      }
    });
  }

  // --- Date / Time / DateTime Pickers ---
  var DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function pad2(n) { return n < 10 ? "0" + n : "" + n; }

  function formatDate(d, fmt) {
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return fmt
      .replace("YYYY", y)
      .replace("MM", pad2(m))
      .replace("DD", pad2(day));
  }

  function parseDate(str) {
    var parts = str.split("-");
    if (parts.length === 3) {
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    return null;
  }

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  // --- Calendar Renderer ---
  function renderCalendar(container, state) {
    var year = state.viewYear;
    var month = state.viewMonth;
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Header
    var header = container.querySelector(".datepicker__header");
    if (!header) {
      header = document.createElement("div");
      header.className = "datepicker__header";
      header.innerHTML =
        '<button type="button" class="datepicker__nav-btn" data-dp-prev>' +
        '<i data-lucide="chevron-left" style="width:1rem;height:1rem"></i></button>' +
        '<span class="datepicker__month-label"></span>' +
        '<button type="button" class="datepicker__nav-btn" data-dp-next>' +
        '<i data-lucide="chevron-right" style="width:1rem;height:1rem"></i></button>';
      container.appendChild(header);
    }
    header.querySelector(".datepicker__month-label").textContent =
      MONTHS[month] + " " + year;

    // Weekdays
    var weekdays = container.querySelector(".datepicker__weekdays");
    if (!weekdays) {
      weekdays = document.createElement("div");
      weekdays.className = "datepicker__weekdays";
      DAYS_SHORT.forEach(function (d) {
        var el = document.createElement("div");
        el.className = "datepicker__weekday";
        el.textContent = d;
        weekdays.appendChild(el);
      });
      container.appendChild(weekdays);
    }

    // Days
    var days = container.querySelector(".datepicker__days");
    if (!days) {
      days = document.createElement("div");
      days.className = "datepicker__days";
      container.appendChild(days);
    }
    days.innerHTML = "";

    var daysInMonth = getDaysInMonth(year, month);
    var firstDay = getFirstDayOfMonth(year, month);
    var prevMonthDays = getDaysInMonth(year, month - 1);

    // Leading days from previous month
    for (var i = 0; i < firstDay; i++) {
      var dayNum = prevMonthDays - firstDay + 1 + i;
      var cell = createDayCell(dayNum, true, false, today, state, year, month - 1, dayNum);
      days.appendChild(cell);
    }

    // Current month days
    for (var d = 1; d <= daysInMonth; d++) {
      var cellDate = new Date(year, month, d);
      var cell = createDayCell(d, false, false, today, state, year, month, d);
      days.appendChild(cell);
    }

    // Trailing days from next month
    var totalCells = firstDay + daysInMonth;
    var trailing = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (var t = 1; t <= trailing; t++) {
      var cell = createDayCell(t, true, false, today, state, year, month + 1, t);
      days.appendChild(cell);
    }

    // Init Lucide icons in the dropdown
    if (typeof lucide !== "undefined") lucide.createIcons({ nodes: [container] });
  }

  function createDayCell(dayNum, isOther, isDisabled, today, state, year, month, day) {
    var cell = document.createElement("div");
    cell.className = "datepicker__day";
    cell.textContent = dayNum;

    var cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);

    if (isOther) cell.classList.add("datepicker__day--other-month");

    if (sameDay(cellDate, today) && !isOther) {
      cell.classList.add("datepicker__day--today");
    }

    // Check disabled (min/max)
    if (state.min && cellDate < state.min) {
      cell.classList.add("datepicker__day--disabled");
      isDisabled = true;
    }
    if (state.max && cellDate > state.max) {
      cell.classList.add("datepicker__day--disabled");
      isDisabled = true;
    }

    // Range mode
    if (state.range) {
      if (state.rangeStart && sameDay(cellDate, state.rangeStart)) {
        cell.classList.add("datepicker__day--range-start");
      }
      if (state.rangeEnd && sameDay(cellDate, state.rangeEnd)) {
        cell.classList.add("datepicker__day--range-end");
      }
      if (state.rangeStart && state.rangeEnd &&
          cellDate > state.rangeStart && cellDate < state.rangeEnd) {
        cell.classList.add("datepicker__day--in-range");
      }
    } else {
      if (state.selected && sameDay(cellDate, state.selected)) {
        cell.classList.add("datepicker__day--selected");
      }
    }

    // Hover preview for range mode
    if (!isDisabled && state.range && state.rangeStep === 1 && state.rangeStart) {
      cell.addEventListener("mouseenter", function () {
        var container = cell.closest(".datepicker__days");
        if (!container) return;
        var allDays = container.querySelectorAll(".datepicker__day[data-dp-date]");
        var hoverTime = cellDate.getTime();
        var startTime = state.rangeStart.getTime();
        var lo = Math.min(startTime, hoverTime);
        var hi = Math.max(startTime, hoverTime);
        allDays.forEach(function (d) {
          var t = parseInt(d.getAttribute("data-dp-date"), 10);
          if (t > lo && t < hi) {
            d.classList.add("datepicker__day--in-range");
          } else if (t !== startTime) {
            d.classList.remove("datepicker__day--in-range");
          }
        });
      });
    }

    if (!isDisabled) {
      cell.setAttribute("data-dp-date", cellDate.getTime());
    }

    return cell;
  }

  // --- Datepicker Init ---
  function initDatepickers() {
    // Date pickers
    document.querySelectorAll(".datepicker").forEach(function (picker) {
      var input = picker.querySelector(".datepicker__input");
      var dropdown = picker.querySelector(".datepicker__dropdown");
      if (!input || !dropdown) return;

      var format = picker.getAttribute("data-datepicker-format") || "YYYY-MM-DD";
      var minStr = picker.getAttribute("data-datepicker-min");
      var maxStr = picker.getAttribute("data-datepicker-max");
      var isRange = picker.getAttribute("data-datepicker-range") === "true";

      var now = new Date();
      var state = {
        viewYear: now.getFullYear(),
        viewMonth: now.getMonth(),
        selected: null,
        range: isRange,
        rangeStart: null,
        rangeEnd: null,
        rangeStep: 0, // 0 = picking start, 1 = picking end
        min: minStr ? parseDate(minStr) : null,
        max: maxStr ? parseDate(maxStr) : null,
      };

      function render() { renderCalendar(dropdown, state); }
      render();

      // Open
      input.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllPickers();
        dropdown.classList.add("is-open");
      });
      input.addEventListener("focus", function () {
        closeAllPickers();
        dropdown.classList.add("is-open");
      });

      // Navigation
      dropdown.addEventListener("click", function (e) {
        e.stopPropagation();
        var btn = e.target.closest("[data-dp-prev]");
        if (btn) {
          state.viewMonth--;
          if (state.viewMonth < 0) { state.viewMonth = 11; state.viewYear--; }
          render();
          return;
        }
        btn = e.target.closest("[data-dp-next]");
        if (btn) {
          state.viewMonth++;
          if (state.viewMonth > 11) { state.viewMonth = 0; state.viewYear++; }
          render();
          return;
        }

        // Day click
        var dayEl = e.target.closest(".datepicker__day");
        if (dayEl && dayEl.getAttribute("data-dp-date")) {
          var clickedDate = new Date(parseInt(dayEl.getAttribute("data-dp-date"), 10));

          if (state.range) {
            if (state.rangeStep === 0) {
              state.rangeStart = clickedDate;
              state.rangeEnd = null;
              state.rangeStep = 1;
              render();
            } else {
              if (clickedDate < state.rangeStart) {
                state.rangeEnd = state.rangeStart;
                state.rangeStart = clickedDate;
              } else {
                state.rangeEnd = clickedDate;
              }
              state.rangeStep = 0;
              input.value = formatDate(state.rangeStart, format) + " — " + formatDate(state.rangeEnd, format);
              render();
              dropdown.classList.remove("is-open");
            }
          } else {
            state.selected = clickedDate;
            input.value = formatDate(clickedDate, format);
            render();
            dropdown.classList.remove("is-open");
          }
          input.dispatchEvent(new Event("change"));
        }
      });
    });

    // Time pickers
    document.querySelectorAll(".timepicker").forEach(function (picker) {
      initTimepickerWidget(picker);
    });

    // DateTime pickers
    document.querySelectorAll(".datetimepicker").forEach(function (picker) {
      var input = picker.querySelector(".datetimepicker__input");
      var dropdown = picker.querySelector(".datetimepicker__dropdown");
      if (!input || !dropdown) return;

      var dateSection = dropdown.querySelector(".datetimepicker__date-section");
      var timeSection = dropdown.querySelector(".datetimepicker__time-section");

      var format = picker.getAttribute("data-datepicker-format") || "YYYY-MM-DD";
      var now = new Date();
      var state = {
        viewYear: now.getFullYear(),
        viewMonth: now.getMonth(),
        selected: null,
        range: false,
        rangeStart: null,
        rangeEnd: null,
        min: null,
        max: null,
      };

      var timeState = { hour: 12, minute: 0, ampm: "AM" };

      function render() { renderCalendar(dateSection, state); }
      function renderTime() { renderTimepicker(timeSection, timeState, updateValue); }
      function updateValue() {
        if (!state.selected) return;
        var dateStr = formatDate(state.selected, format);
        var h = timeState.ampm === "PM" && timeState.hour < 12 ? timeState.hour + 12 :
                timeState.ampm === "AM" && timeState.hour === 12 ? 0 : timeState.hour;
        input.value = dateStr + " " + pad2(h) + ":" + pad2(timeState.minute);
        input.dispatchEvent(new Event("change"));
      }

      render();
      renderTime();

      input.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllPickers();
        dropdown.classList.add("is-open");
      });
      input.addEventListener("focus", function () {
        closeAllPickers();
        dropdown.classList.add("is-open");
      });

      dateSection.addEventListener("click", function (e) {
        e.stopPropagation();
        var btn = e.target.closest("[data-dp-prev]");
        if (btn) {
          state.viewMonth--;
          if (state.viewMonth < 0) { state.viewMonth = 11; state.viewYear--; }
          render();
          return;
        }
        btn = e.target.closest("[data-dp-next]");
        if (btn) {
          state.viewMonth++;
          if (state.viewMonth > 11) { state.viewMonth = 0; state.viewYear++; }
          render();
          return;
        }
        var dayEl = e.target.closest(".datepicker__day");
        if (dayEl && dayEl.getAttribute("data-dp-date")) {
          state.selected = new Date(parseInt(dayEl.getAttribute("data-dp-date"), 10));
          render();
          updateValue();
        }
      });

      timeSection.addEventListener("click", function (e) {
        e.stopPropagation();
      });

      dropdown.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });

    // Close on outside click
    document.addEventListener("click", function () {
      closeAllPickers();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllPickers();
    });
  }

  function closeAllPickers() {
    document.querySelectorAll(".datepicker__dropdown.is-open, .timepicker__dropdown.is-open, .datetimepicker__dropdown.is-open").forEach(function (d) {
      d.classList.remove("is-open");
    });
  }

  // --- Time Picker Widget ---
  function renderTimepicker(container, timeState, onChange) {
    container.innerHTML = "";

    // Check for precise mode (1-min steps)
    var precise = container.closest("[data-timepicker-precise]") !== null ||
                  container.closest("[data-datetimepicker-precise]") !== null;
    var minStep = precise ? 1 : 5;

    var selects = document.createElement("div");
    selects.className = "timepicker__selects";

    // Hours
    var hourCol = document.createElement("div");
    hourCol.style.display = "flex";
    hourCol.style.flexDirection = "column";
    hourCol.style.flex = "1";

    var hourLabel = document.createElement("div");
    hourLabel.className = "timepicker__select-label";
    hourLabel.textContent = "Hour";
    hourCol.appendChild(hourLabel);

    var hourList = document.createElement("div");
    hourList.className = "timepicker__select";
    for (var h = 1; h <= 12; h++) {
      var opt = document.createElement("div");
      opt.className = "timepicker__option";
      if (h === timeState.hour) opt.classList.add("timepicker__option--selected");
      opt.textContent = pad2(h);
      opt.setAttribute("data-tp-hour", h);
      hourList.appendChild(opt);
    }
    hourCol.appendChild(hourList);
    selects.appendChild(hourCol);

    // Minutes
    var minCol = document.createElement("div");
    minCol.style.display = "flex";
    minCol.style.flexDirection = "column";
    minCol.style.flex = "1";

    var minLabel = document.createElement("div");
    minLabel.className = "timepicker__select-label";
    minLabel.textContent = "Min";
    minCol.appendChild(minLabel);

    var minList = document.createElement("div");
    minList.className = "timepicker__select";
    for (var m = 0; m < 60; m += minStep) {
      var opt = document.createElement("div");
      opt.className = "timepicker__option";
      if (m === timeState.minute) opt.classList.add("timepicker__option--selected");
      opt.textContent = pad2(m);
      opt.setAttribute("data-tp-minute", m);
      minList.appendChild(opt);
    }
    minCol.appendChild(minList);
    selects.appendChild(minCol);

    // AM/PM
    var ampmDiv = document.createElement("div");
    ampmDiv.className = "timepicker__ampm";

    var ampmLabel = document.createElement("div");
    ampmLabel.className = "timepicker__select-label";
    ampmLabel.textContent = "\u00A0";
    ampmDiv.appendChild(ampmLabel);

    ["AM", "PM"].forEach(function (v) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "timepicker__ampm-btn";
      if (v === timeState.ampm) btn.classList.add("timepicker__ampm-btn--active");
      btn.textContent = v;
      btn.setAttribute("data-tp-ampm", v);
      ampmDiv.appendChild(btn);
    });
    selects.appendChild(ampmDiv);

    container.appendChild(selects);

    // Events
    container.addEventListener("click", function handler(e) {
      var hourOpt = e.target.closest("[data-tp-hour]");
      if (hourOpt) {
        timeState.hour = parseInt(hourOpt.getAttribute("data-tp-hour"), 10);
        renderTimepicker(container, timeState, onChange);
        if (onChange) onChange();
        return;
      }
      var minOpt = e.target.closest("[data-tp-minute]");
      if (minOpt) {
        timeState.minute = parseInt(minOpt.getAttribute("data-tp-minute"), 10);
        renderTimepicker(container, timeState, onChange);
        if (onChange) onChange();
        return;
      }
      var ampmBtn = e.target.closest("[data-tp-ampm]");
      if (ampmBtn) {
        timeState.ampm = ampmBtn.getAttribute("data-tp-ampm");
        renderTimepicker(container, timeState, onChange);
        if (onChange) onChange();
        return;
      }
    });

    // Scroll to selected items
    var selectedHour = hourList.querySelector(".timepicker__option--selected");
    if (selectedHour) selectedHour.scrollIntoView({ block: "center" });
    var selectedMin = minList.querySelector(".timepicker__option--selected");
    if (selectedMin) selectedMin.scrollIntoView({ block: "center" });
  }

  function initTimepickerWidget(picker) {
    var input = picker.querySelector(".timepicker__input");
    var dropdown = picker.querySelector(".timepicker__dropdown");
    if (!input || !dropdown) return;

    var timeState = { hour: 12, minute: 0, ampm: "AM" };

    function updateInput() {
      var h = timeState.ampm === "PM" && timeState.hour < 12 ? timeState.hour + 12 :
              timeState.ampm === "AM" && timeState.hour === 12 ? 0 : timeState.hour;
      input.value = pad2(h) + ":" + pad2(timeState.minute);
      input.dispatchEvent(new Event("change"));
    }

    renderTimepicker(dropdown, timeState, updateInput);

    input.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllPickers();
      dropdown.classList.add("is-open");
    });
    input.addEventListener("focus", function () {
      closeAllPickers();
      dropdown.classList.add("is-open");
    });

    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // --- Typeable Pickers ---
  var TYPEABLE_DEFS = {
    "YYYY": { type: "year",   digits: 4, min: 1900, max: 2099, placeholder: "YYYY" },
    "MM":   { type: "month",  digits: 2, min: 1,    max: 12,   placeholder: "MM" },
    "DD":   { type: "day",    digits: 2, min: 1,    max: 31,   placeholder: "DD" },
    "HH":   { type: "hour",   digits: 2, min: 1,    max: 12,   placeholder: "HH" },
    "mm":   { type: "minute", digits: 2, min: 0,    max: 59,   placeholder: "mm" },
    "ss":   { type: "second", digits: 2, min: 0,    max: 59,   placeholder: "ss" },
    "A":    { type: "ampm",   digits: 0, min: 0,    max: 1,    placeholder: "AM" }
  };

  var TYPEABLE_KEYS = ["YYYY", "MM", "DD", "HH", "mm", "ss", "A"];

  function parseTypeableFormat(fmt) {
    var tokens = [];
    var i = 0;
    while (i < fmt.length) {
      var matched = false;
      for (var k = 0; k < TYPEABLE_KEYS.length; k++) {
        var key = TYPEABLE_KEYS[k];
        if (fmt.substr(i, key.length) === key) {
          var def = TYPEABLE_DEFS[key];
          tokens.push({ segment: true, def: { type: def.type, digits: def.digits, min: def.min, max: def.max, placeholder: def.placeholder } });
          i += key.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        tokens.push({ segment: false, value: fmt[i] });
        i++;
      }
    }
    return tokens;
  }

  function setupTypeablePicker(picker) {
    var format = picker.getAttribute("data-typeable-format");
    var tokens = parseTypeableFormat(format);
    var container = picker.querySelector(".picker-segments");
    if (!container) return;

    var segs = [];

    // Build segment DOM
    tokens.forEach(function (tok) {
      if (tok.segment) {
        var el = document.createElement("span");
        el.className = "picker-segment";
        el.setAttribute("tabindex", "0");
        el.textContent = tok.def.placeholder;
        container.appendChild(el);
        segs.push({ el: el, def: tok.def, value: null, buffer: "" });
      } else {
        var sep = document.createElement("span");
        sep.className = "picker-sep";
        sep.textContent = tok.value;
        container.appendChild(sep);
      }
    });

    function focusSeg(idx) {
      if (idx >= 0 && idx < segs.length) segs[idx].el.focus();
    }

    function updateDisplay(seg) {
      if (seg.value !== null) {
        seg.el.classList.add("picker-segment--filled");
        if (seg.def.type === "ampm") {
          seg.el.textContent = seg.value;
        } else if (seg.def.digits === 4) {
          seg.el.textContent = ("0000" + seg.value).slice(-4);
        } else {
          seg.el.textContent = pad2(seg.value);
        }
      } else if (seg.buffer) {
        seg.el.classList.add("picker-segment--filled");
        var remaining = seg.def.digits - seg.buffer.length;
        seg.el.textContent = seg.buffer + "\u2009".repeat(remaining);
      } else {
        seg.el.classList.remove("picker-segment--filled");
        seg.el.textContent = seg.def.placeholder;
      }
    }

    function setSegValue(seg, val) {
      if (seg.def.type === "ampm") {
        seg.value = val;
      } else {
        if (val < seg.def.min) val = seg.def.min;
        if (val > seg.def.max) val = seg.def.max;
        seg.value = val;
      }
      seg.buffer = "";
      updateDisplay(seg);
      syncValue();
    }

    function syncValue() {
      var allFilled = true;
      segs.forEach(function (s) { if (s.value === null) allFilled = false; });
      if (!allFilled) return;

      var result = "";
      var segIdx = 0;
      tokens.forEach(function (tok) {
        if (tok.segment) {
          var s = segs[segIdx++];
          if (s.def.type === "ampm") {
            result += s.value;
          } else if (s.def.digits === 4) {
            result += ("0000" + s.value).slice(-4);
          } else {
            result += pad2(s.value);
          }
        } else {
          result += tok.value;
        }
      });
      picker.setAttribute("data-value", result);
      var hidden = picker.querySelector("input[type='hidden']");
      if (hidden) hidden.value = result;
      picker.dispatchEvent(new Event("change"));
    }

    // Keyboard handling for each segment
    segs.forEach(function (seg, idx) {
      seg.el.addEventListener("keydown", function (e) {
        var key = e.key;

        // AM/PM segment
        if (seg.def.type === "ampm") {
          if (key === "ArrowUp" || key === "ArrowDown") {
            e.preventDefault();
            seg.value = (seg.value === "AM") ? "PM" : "AM";
            updateDisplay(seg); syncValue();
          } else if (key.toLowerCase() === "a") {
            e.preventDefault();
            setSegValue(seg, "AM"); focusSeg(idx + 1);
          } else if (key.toLowerCase() === "p") {
            e.preventDefault();
            setSegValue(seg, "PM"); focusSeg(idx + 1);
          } else if (key === "ArrowLeft") {
            e.preventDefault(); focusSeg(idx - 1);
          } else if (key === "ArrowRight") {
            e.preventDefault(); focusSeg(idx + 1);
          } else if (key === "Backspace") {
            e.preventDefault();
            seg.value = null; updateDisplay(seg);
            focusSeg(idx - 1);
          } else if (key === "Tab") {
            // natural behavior
          } else {
            e.preventDefault();
          }
          return;
        }

        // Numeric segments
        if (key >= "0" && key <= "9") {
          e.preventDefault();
          seg.buffer += key;

          if (seg.def.digits === 4) {
            if (seg.buffer.length >= 4) {
              setSegValue(seg, parseInt(seg.buffer.slice(-4), 10));
              focusSeg(idx + 1);
            } else {
              updateDisplay(seg);
            }
          } else {
            // 2-digit field
            if (seg.buffer.length >= 2) {
              setSegValue(seg, parseInt(seg.buffer.slice(-2), 10));
              focusSeg(idx + 1);
            } else {
              // Smart auto-advance: if first digit can't lead to valid 2-digit value
              var d = parseInt(key, 10);
              if (d * 10 > seg.def.max) {
                setSegValue(seg, d);
                focusSeg(idx + 1);
              } else {
                updateDisplay(seg);
              }
            }
          }
        } else if (key === "ArrowUp") {
          e.preventDefault();
          var cur = seg.value !== null ? seg.value : seg.def.min - 1;
          cur++;
          if (cur > seg.def.max) cur = seg.def.min; // cycle
          setSegValue(seg, cur);
        } else if (key === "ArrowDown") {
          e.preventDefault();
          var cur = seg.value !== null ? seg.value : seg.def.max + 1;
          cur--;
          if (cur < seg.def.min) cur = seg.def.max; // cycle
          setSegValue(seg, cur);
        } else if (key === "ArrowLeft") {
          e.preventDefault(); focusSeg(idx - 1);
        } else if (key === "ArrowRight") {
          e.preventDefault(); focusSeg(idx + 1);
        } else if (key === "Backspace") {
          e.preventDefault();
          if (seg.buffer.length > 0) {
            seg.buffer = seg.buffer.slice(0, -1);
            updateDisplay(seg);
          } else {
            seg.value = null;
            updateDisplay(seg);
            focusSeg(idx - 1);
          }
        } else if (key === "Tab") {
          seg.buffer = "";
        } else {
          e.preventDefault();
        }
      });

      seg.el.addEventListener("focus", function () {
        seg.buffer = "";
      });
    });

    // Click container → focus first empty or first segment
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("picker-segment")) return;
      for (var i = 0; i < segs.length; i++) {
        if (segs[i].value === null) { focusSeg(i); return; }
      }
      focusSeg(0);
    });

    // Dropdown trigger
    var triggerBtn = picker.querySelector("[data-picker-trigger]");
    var dropdown = picker.querySelector(".datepicker__dropdown, .timepicker__dropdown, .datetimepicker__dropdown");

    if (triggerBtn && dropdown) {
      var hasDateSegs = segs.some(function (s) { return s.def.type === "month" || s.def.type === "day" || s.def.type === "year"; });
      var hasTimeSegs = segs.some(function (s) { return s.def.type === "hour" || s.def.type === "minute"; });

      if (hasDateSegs) {
        var now = new Date();
        var calState = {
          viewYear: now.getFullYear(), viewMonth: now.getMonth(),
          selected: null, range: false, rangeStart: null, rangeEnd: null,
          rangeStep: 0, min: null, max: null
        };

        triggerBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          closeAllPickers();

          // Sync calendar view from segments
          var ys = segs.find(function (s) { return s.def.type === "year"; });
          var ms = segs.find(function (s) { return s.def.type === "month"; });
          var ds = segs.find(function (s) { return s.def.type === "day"; });
          if (ys && ys.value) calState.viewYear = ys.value;
          if (ms && ms.value) calState.viewMonth = ms.value - 1;
          if (ys && ys.value && ms && ms.value && ds && ds.value) {
            calState.selected = new Date(ys.value, ms.value - 1, ds.value);
          }

          // For datetime pickers, also render time section
          var dateSection = dropdown.querySelector(".datetimepicker__date-section");
          var timeSection = dropdown.querySelector(".datetimepicker__time-section");
          if (dateSection && timeSection) {
            renderCalendar(dateSection, calState);
            var timeState = { hour: 12, minute: 0, ampm: "AM" };
            var hs = segs.find(function (s) { return s.def.type === "hour"; });
            var mins = segs.find(function (s) { return s.def.type === "minute"; });
            var amps = segs.find(function (s) { return s.def.type === "ampm"; });
            if (hs && hs.value) timeState.hour = hs.value;
            if (mins && mins.value) timeState.minute = mins.value;
            if (amps && amps.value) timeState.ampm = amps.value;
            renderTimepicker(timeSection, timeState, function () {
              if (hs) setSegValue(hs, timeState.hour);
              if (mins) setSegValue(mins, timeState.minute);
              if (amps) setSegValue(amps, timeState.ampm);
            });
            if (typeof lucide !== "undefined") lucide.createIcons({ nodes: [dropdown] });
          } else {
            renderCalendar(dropdown, calState);
          }

          dropdown.classList.add("is-open");
        });

        dropdown.addEventListener("click", function (e) {
          e.stopPropagation();
          var btn = e.target.closest("[data-dp-prev]");
          if (btn) {
            calState.viewMonth--;
            if (calState.viewMonth < 0) { calState.viewMonth = 11; calState.viewYear--; }
            var dateSection = dropdown.querySelector(".datetimepicker__date-section");
            renderCalendar(dateSection || dropdown, calState);
            return;
          }
          btn = e.target.closest("[data-dp-next]");
          if (btn) {
            calState.viewMonth++;
            if (calState.viewMonth > 11) { calState.viewMonth = 0; calState.viewYear++; }
            var dateSection = dropdown.querySelector(".datetimepicker__date-section");
            renderCalendar(dateSection || dropdown, calState);
            return;
          }
          var dayEl = e.target.closest(".datepicker__day");
          if (dayEl && dayEl.getAttribute("data-dp-date")) {
            var d = new Date(parseInt(dayEl.getAttribute("data-dp-date"), 10));
            calState.selected = d;
            var ms = segs.find(function (s) { return s.def.type === "month"; });
            var ds = segs.find(function (s) { return s.def.type === "day"; });
            var ys = segs.find(function (s) { return s.def.type === "year"; });
            if (ms) setSegValue(ms, d.getMonth() + 1);
            if (ds) setSegValue(ds, d.getDate());
            if (ys) setSegValue(ys, d.getFullYear());
            var dateSection = dropdown.querySelector(".datetimepicker__date-section");
            renderCalendar(dateSection || dropdown, calState);
            // Only close if no time segments (pure date picker)
            if (!hasTimeSegs) dropdown.classList.remove("is-open");
          }
        });
      } else if (hasTimeSegs) {
        // Time-only typeable picker
        var timeState = { hour: 12, minute: 0, ampm: "AM" };

        triggerBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          closeAllPickers();
          var hs = segs.find(function (s) { return s.def.type === "hour"; });
          var mins = segs.find(function (s) { return s.def.type === "minute"; });
          var amps = segs.find(function (s) { return s.def.type === "ampm"; });
          if (hs && hs.value) timeState.hour = hs.value;
          if (mins && mins.value) timeState.minute = mins.value;
          if (amps && amps.value) timeState.ampm = amps.value;
          renderTimepicker(dropdown, timeState, function () {
            if (hs) setSegValue(hs, timeState.hour);
            if (mins) setSegValue(mins, timeState.minute);
            if (amps) setSegValue(amps, timeState.ampm);
          });
          dropdown.classList.add("is-open");
        });

        dropdown.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      }
    }
  }

  function initTypeablePickers() {
    document.querySelectorAll("[data-typeable-format]").forEach(setupTypeablePicker);
  }

  // --- Scroll Reveal (IntersectionObserver) ---
  function initScrollReveal() {
    var els = document.querySelectorAll(".scroll-reveal");
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-reveal--visible");
          // Also trigger stagger animations on children
          var stagger = entry.target.querySelector(".stagger-children");
          if (stagger) stagger.classList.add("stagger-animate");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    els.forEach(function (el) { observer.observe(el); });
  }

  // --- Landing Navbar Scroll ---
  function initLandingNav() {
    var nav = document.querySelector("[data-landing-nav]");
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add("landing-nav--scrolled");
      } else {
        nav.classList.remove("landing-nav--scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Smooth scroll for anchor links
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // --- Init ---
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initSidebar();
    initActiveLink();
    initTypewriters();
    initThreads();
    initComposer();
    initCommandPalette();
    initTopbarDropdowns();
    initDatepickers();
    initTypeablePickers();
    initScrollReveal();
    initLandingNav();
  });
})();
