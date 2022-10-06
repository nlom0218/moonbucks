const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStroage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu")) || [];
  },
};

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가?, 복잡하지 않게 하기 위해 최소한으로 생각해야 한다.
  // 상태 -> 메뉴명

  // 상태를 초기화 하는 이유는 어떤 형태의 데이터로 관리를 할 것인지를 명확하게 해준다.
  this.menu = [];
  this.init = () => {
    if (store.getLocalStorage().length > 0) {
      this.menu = store.getLocalStorage();
      render();
    }
  };

  const render = () => {
    const template = this.menu
      .map((item) => {
        return `
          <li data-menu-id="${item.id}" class="menu-list-item d-flex items-center py-2">
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
  };
  // 리펙토링 -> 나중에 봐도 어떤 동작을 하는지 알수 있도록 함수를 만들어 쓰자.

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
    const id = Number(new Date());

    this.menu.push({ name: espressMenuName, id });
    store.setLocalStroage(this.menu);
    render();
    $("#espresso-menu-name").value = "";
  };

  const findMenuIndex = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    return this.menu.findIndex((item) => item.id === Number(menuId));
  };

  const updateMenuName = (e) => {
    // 중복된 것을 하나로
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    if (updatedMenuName && updatedMenuName !== "") {
      this.menu[findMenuIndex(e)].name = updatedMenuName;
      // 데이터의 상태를 관리하는 것은 최소한으로 하는 것이 좋다. 역할을 분명하게 부여하자.
      // 하나의 함수에선 딱 하나의 기능을 할 수 있도록 하자.
      store.setLocalStroage(this.menu);
      $menuName.innerText = updatedMenuName;
    }
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      this.menu.splice(findMenuIndex(e), 1);
      store.setLocalStroage(this.menu);
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
app.init();
