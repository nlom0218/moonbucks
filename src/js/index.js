const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStroage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가?, 복잡하지 않게 하기 위해 최소한으로 생각해야 한다.
  // 상태 -> 메뉴명
  this.menu = [];

  // 리펙토링 -> 나중에 봐도 어떤 동작을 하는지 알 수 있도록 함수를 만들어 쓰자.

  // 보통 함수의 이름의 앞에 동사를 쓴다.
  const updateMenuCount = () => {
    // 클래스명, 아이디명을 활용하여 변수 이름을 정하자.
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    const espressMenuName = $("#espresso-menu-name").value;
    if (espressMenuName === "") {
      return window.alert("값을 입력해주세요.");
    }

    this.menu.push({ name: espressMenuName });
    store.setLocalStroage(this.menu);
    const template = this.menu
      .map((item) => {
        return `
          <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join("");

    $("#espresso-menu-list").innerHTML = template;

    updateMenuCount();

    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    // 중복된 것을 하나로
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // form 태그가 자동으로 전송되는 걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  // 메뉴의 이름을 입력
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenuName();
    }
  });
}

const app = new App();
