// 기본 주소를 설정하여 이후에 주소가 바뀌더라도 수정이 편할 수 있도록 한다.
const BASE_URL = "http://localhost:3000/api";

const HTTP_METHOD = {
  POST: (data) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  },
  PUT: (data) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    };
  },
  DELETE: () => {
    return {
      method: "DELETE",
    };
  },
};

const req = async (url, option) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    window.alert("에러가 발생했습니다.");
    console.error("에러가 발생했습니다.");
  }
  return res.json();
};

const reqWithOutJson = async (url, option) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    window.alert("에러가 발생했습니다.");
    console.error("에러가 발생했습니다.");
  }
  return res;
};

export default {
  getAllMenuByCategory: (category) => {
    return req(`${BASE_URL}/category/${category}/menu`);
  },

  creaetMenu: (category, name) => {
    return req(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
  },

  updateMenu: (category, menuId, name) => {
    return req(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    );
  },

  toggleSoldOutMenu: (category, menuId) => {
    return req(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    );
  },

  deleteMenu: (category, menuId) => {
    reqWithOutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
  },
};
