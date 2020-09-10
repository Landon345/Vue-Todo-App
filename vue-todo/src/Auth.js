import { login, register, logout } from "./Api";

class Auth {
  constructor() {
    this.authenticated = false;
    if (localStorage.getItem("api_token")) {
      this.authenticated = true;
    }
  }

  async Register(user) {
    localStorage.clear();
    const response = await register(user);
    if (response.accessToken) {
      localStorage.setItem("api_token", response.accessToken);
      this.authenticated = true;
    } else {
      this.authenticated = false;
      localStorage.removeItem("api_token");
    }
  }

  async Login(user) {
    localStorage.clear();
    const response = await login(user);
    if (response.accessToken) {
      localStorage.setItem("api_token", response.accessToken);
      this.authenticated = true;
    } else {
      this.authenticated = false;
      localStorage.removeItem("api_token");
    }
  }

  async Logout() {
    await logout();
    this.authenticated = false;
    localStorage.clear();
  }
  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
