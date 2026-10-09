(function () {
  "use strict";
  document.querySelectorAll("[data-contact-form-ar]").forEach(function (form) {
    var result = form.querySelector(".g-form-result");
    form.addEventListener("input", function (event) {
      result.hidden = true;
      if (typeof event.target.setCustomValidity === "function") event.target.setCustomValidity("");
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var message = String(data.get("message") || "").trim();
      if (!name || !message) {
        var field = form.elements.namedItem(!name ? "name" : "message");
        field.setCustomValidity("يرجى تعبئة هذا الحقل.");
        field.reportValidity();
        return;
      }
      var phoneLink = document.querySelector(".g-contact-phone").href;
      var text = "السلام عليكم رايدة، اسمي " + name + ".\n" + data.get("subject") + "\n\n" + message;
      result.querySelector("a").href = phoneLink + "?text=" + encodeURIComponent(text);
      result.hidden = false;
    });
  });
}());
