document.addEventListener("DOMContentLoaded", function () {
  const btns = document.querySelectorAll(".apply-button"); //buttons "Оформить заявку"
  const modalWindow = document.getElementById("modal");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");
  const formButton = document.querySelector('#form button[type="submit"]');
  const closeButton = document.querySelector(".close");

  //button disabled пока все поля не заполнены
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

  // Открытие модального окна при нажатии на кнопку
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      modalWindow.classList.remove("hidden-class");
    });
  });

  // Закрытие модального окна
  closeButton.addEventListener("click", () => {
    modalWindow.classList.add("hidden-class");
  });

  // Закрыть модальное окно при клике вне его содержимого
  window.addEventListener("click", function (event) {
    if (event.target === modalWindow) {
      modalWindow.classList.add("hidden-class");
    }
  });

  // вывод данных в консоль при отправке формы(задание 2)
  const getFormResponse = async () => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log(
        `Name: ${nameField.value}, Email: ${emailField.value}, Phone: ${phoneField.value}`
      );
    });
  };

  getFormResponse();

  // функция отправки AJAX запроса из фронтенда на apply.php при отправке формы заявки
  const sendPhpResponse = async () => {
    document
      .getElementById("form")
      .addEventListener("submit", function (event) {
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
  };

  sendPhpResponse();
});
