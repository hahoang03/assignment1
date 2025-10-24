document.addEventListener("DOMContentLoaded", () => {

  // THEME CHngae TOGGLE
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const currentTheme = localStorage.getItem("site-theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.setAttribute("aria-pressed", currentTheme === "dark");

    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
      themeToggle.setAttribute("aria-pressed", !isDark);
      localStorage.setItem("site-theme", isDark ? "light" : "dark");
    });
  }

  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("open");
    });
  }

  // RANGE OUTPUT (time)
  const range = document.getElementById("time-range");
  const output = document.getElementById("time-output");
  if (range && output) {
    range.addEventListener("input", () => {
      output.textContent = range.value + ":00";
    });
  }


  // FORM VALIDATION + PROGRESS + METER
  const form = document.getElementById("order-form");
  if (form) {
    const progress = document.getElementById("form-progress");
    const meter = document.getElementById("order-meter");
    const inputs = form.querySelectorAll("input, select, textarea");

    // Update progress & meter
    function updateProgress() {
      const total = inputs.length;
      let filled = 0;
      inputs.forEach(i => {
        if (i.value.trim() !== "" && i.checkValidity()) filled++;
      });
      if (progress) progress.value = Math.round((filled / total) * 100);

      if (meter) {
        const qty = document.getElementById("qty");
        const q = qty ? Number(qty.value) : 0;
        const value = Math.min(1000, q * 120);
        meter.value = value;
      }
    }

    inputs.forEach(i => {
      i.addEventListener("input", () => {
        updateProgress();
        i.classList.remove("error"); // remove red highlight on input
      });
    });

    updateProgress(); // initial update

    // Submit handling
    form.addEventListener("submit", e => {
      e.preventDefault();
      let valid = true;
      let firstInvalid = null;

      inputs.forEach(input => {
        if (!input.checkValidity()) {
          valid = false;
          input.classList.add("error"); // highlight invalid input
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        alert(`Please check the field "${firstInvalid.name}" and enter valid input.`);
      } else {
        alert("Thank you! Your order has been submitted successfully.");
        form.reset();
        updateProgress();
      }
    });
  }
});
