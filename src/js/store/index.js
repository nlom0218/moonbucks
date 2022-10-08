export const store = {
  setLocalStroage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};
