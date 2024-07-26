document.addEventListener("DOMContentLoaded", function () {
    const btns = document.querySelectorAll(".apply-button");
    const modalWindow = document.getElementById("modal");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const formButton = document.querySelector('#form button[type="submit"]');
    const closeButton = document.querySelector(".close");
  
    formButton.disabled = true;
  
    function checkFormValidity() {
      formButton.disabled = !(
        nameField.value.trim() &&
        emailField.value.trim() &&
        phoneField.value.trim()
      );
    }

    nameField.addEventListener("input", checkFormValidity);
    emailField.addEventListener("input", checkFormValidity);
    phoneField.addEventListener("input", checkFormValidity);

    btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
        modalWindow.classList.remove("hidden-class");
        });
    });

    closeButton.addEventListener("click", () => {
        modalWindow.classList.add("hidden-class");
    });

    window.addEventListener("click", function (event) {
        if (event.target === modalWindow) {
        modalWindow.classList.add("hidden-class");
    }
        });

    document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("apply.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          console.log(data);
          modalWindow.classList.add("hidden-class");
          document.getElementById("form").reset();
          formButton.disabled = true;
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert(`Произошла ошибка при отправке данных: ${error.message}`);
      });
  });
});