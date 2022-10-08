// 기본 주소를 설정하여 이후에 주소가 바뀌더라도 수정이 편할 수 있도록 한다.
const BASE_URL = "http://localhost:3000/api";

export default {
  getAllMenuByCategory: async (category) => {
    const res = await fetch(`${BASE_URL}/category/${category}/menu`);
    return res.json();
  },

  creaetMenu: async (category, name) => {
    const res = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      console.error("에러가 발생했습니다.");
    }
  },

  updateMenu: async (category, menuId, name) => {
    const res = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      console.error("에러가 발생했습니다.");
    }
    return res.json();
  },

  toggleSoldOutMenu: async (category, menuId) => {
    const res = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      {
        method: "PUT",
      }
    );
    if (!res.ok) {
      console.error("에러가 발생했습니다.");
    }
    return res.json();
  },

  deleteMenu: async (category, menuId) => {
    const res = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error("에러가 발생했습니다.");
    }
  },
};
