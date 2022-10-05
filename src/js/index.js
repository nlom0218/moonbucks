const $ = (selector) => document.querySelector(selector);

function App() {
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      // 중복된 것을 하나로
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const updatedMenuName = prompt(
        "메뉴명을 수정하세요",
        $menuName.innerText
      );
      $menuName.innerText = updatedMenuName;
    }
  });

  // form 태그가 자동으로 전송되는 걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const addMenu = () => {
    const espressMenuName = $("#espresso-menu-name").value;
    if (espressMenuName === "") {
      return window.alert("값을 입력해주세요.");
    }
    const menuItemTemplate = (name) => {
      return `
          <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${name}</span>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
              삭제
            </button>
          </li>
        `;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressMenuName)
    );

    // 클래스명, 아이디명을 활용하여 변수 이름을 정하자.
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;

    $("#espresso-menu-name").value = "";
  };

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenu();
  });

  // 메뉴의 이름을 입력
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenu();
    }
  });
}

App();
