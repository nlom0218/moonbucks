import MenuApi from "./api/index.js";
import { $ } from "./dom.js";

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가?, 복잡하지 않게 하기 위해 최소한으로 생각해야 한다.
  // 상태 -> 메뉴명

  // 상태를 초기화 하는 이유는 어떤 형태의 데이터로 관리를 할 것인지를 명확하게 해준다.
  // 상태가 변하는 값들은 this로 관리한다.
  this.menu = [];
  this.currentCategory = "espresso";

  // 상태관리를 위해 초기화를 하자
  this.init = async () => {
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu = await MenuApi.getAllMenuByCategory(this.currentCategory);
    const template = this.menu
      .map((item) => {
        return `
          <li data-menu-id="${
            item.id
          }" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${
              item.isSoldOut && "sold-out"
            }">${item.name}</span>
             <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
              >
                품절
            </button>
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

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };
  // 리펙토링 -> 나중에 봐도 어떤 동작을 하는지 알수 있도록 함수를 만들어 쓰자.

  // 보통 함수의 이름의 앞에 동사를 쓴다.
  const updateMenuCount = async () => {
    // 클래스명, 아이디명을 활용하여 변수 이름을 정하자.
    const menuCount = this.menu.length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenu = async () => {
    const menuName = $("#menu-name").value;
    if (menuName === "") {
      return window.alert("값을 입력해주세요.");
    }

    if (this.menu.find((item) => item.name === menuName)) {
      window.alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      $("#menu-name").value = "";
      return;
    }

    await MenuApi.creaetMenu(this.currentCategory, menuName);

    render();
    $("#menu-name").value = "";
  };

  const updateMenuName = async (e) => {
    // 중복된 것을 하나로
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    if (updatedMenuName && updatedMenuName !== "") {
      await MenuApi.updateMenu(this.currentCategory, menuId, updatedMenuName);
      // 데이터의 상태를 관리하는 것은 최소한으로 하는 것이 좋다. 역할을 분명하게 부여하자.
      // 하나의 함수에선 딱 하나의 기능을 할 수 있도록 하자.
      render();
    }
  };

  const removeMenuName = async (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      render();
      updateMenuCount();
    }
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  };

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  };

  const initEventListeners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        // 뒷 부분을 체크하지 않을 땐 return를 함으로써 불필요한 연산을 하지 않도록 하자.
        return;
      }
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    // form 태그가 자동으로 전송되는 걸 막아준다.
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenu);

    // 메뉴의 이름을 입력
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addMenu();
      }
    });

    // 메뉴 관리
    $("nav").addEventListener("click", changeCategory);
  };
}

const app = new App();
app.init();
