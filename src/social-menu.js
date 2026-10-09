(function () {
  "use strict";
  document.querySelectorAll("[data-social-toggle]").forEach(function (toggle) {
    var popover = document.getElementById(toggle.getAttribute("aria-controls"));
    if (!popover) return;
    function close() {
      popover.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      document.querySelectorAll("[data-social-popover]").forEach(function (other) {
        if (other !== popover) other.hidden = true;
      });
      popover.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }
    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (popover.hidden) open(); else close();
    });
    document.addEventListener("click", function (event) {
      if (!popover.hidden && !popover.contains(event.target) && event.target !== toggle) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !popover.hidden) {
        close();
        toggle.focus();
      }
    });
  });
}());
