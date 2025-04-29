function SubmitForm(e) {
  e.preventDefault();

  const form = document.getElementById("myForm"); // ✅ Always reference the actual form
  const bottrap = document.getElementById("bottrap"); // ✅ Consistent ID

  // Honeypot spam check
  if (bottrap && bottrap.value.trim() !== "") {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    return;
  }

  // HTML5 validation check
  if (!form.checkValidity()) {
    form.reportValidity(); // Show native browser error messages
    return;
  }

  // ✅ All clear: submit the form
  form.submit();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  const button = document.getElementById("formbutton");

  if (form && button) {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // ✅ Dispatch a real submit event
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    });

    // ✅ Listen to the form's submit event
    form.addEventListener("submit", SubmitForm);
  }
});