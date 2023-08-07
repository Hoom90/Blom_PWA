import serverURL from "../router/serverAddress";

const API_URL = serverURL + "/api/";

class AuthService {
  async login(user) {
    const data = {
      phone: user.phone,
    };
    return await fetch(API_URL + "login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Phonenumber Not Found!");
          } else {
            throw new Error("An error has occurred. Please try again later.");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("userPhone", data.user.phone);
        }
        return data;
      });
  }

  logout() {
    localStorage.clear();
  }

  async register(user) {
    const data = {
      username: user.username,
      phone: user.phone,
    };
    await fetch(API_URL + "register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            throw new Error("Uesrname or Phonenumber Is Used!");
          } else {
            throw new Error("An error has occurred. Please try again later.");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshtoken);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("userPhone", data.user.phone);
        }
        return data;
      });
  }

  async generateNewToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    // توکن JWT منقضی شده است، باید توکن جدید دریافت کنید
    return await fetch(API_URL + "refresh-token", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + refreshToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          const newToken = data.token;
          localStorage.removeItem("token");
          localStorage.setItem("token", newToken);
        }
      });
  }

  // استفاده از تابع makeRequest برای ارسال درخواست
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     refreshToken: localStorage.getItem('refreshToken')
  //   })
  // };
  // const data = await makeRequest('/api/data', options);
}

export default new AuthService();
