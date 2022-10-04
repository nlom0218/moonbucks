function App() {
  // form 태그가 자동으로 전송되는 걸 막아준다.
  document
    .querySelector("#espresso-menu-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    });

  // 메뉴의 이름을 입력
  document
    .querySelector("#espresso-menu-name")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        console.log(document.getElementById("espresso-menu-name").value);
      }
    });
}

App();
