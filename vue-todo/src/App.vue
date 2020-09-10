<template>
  <!-- <router-view> -->

  <Navbar
    @logged-in="loggedInUser"
    @logout-user="logoutUser"
    :loggedIn="loggedIn"
  />
</template>

<script>
import Auth from "./Auth";
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      name: this.$route.name,
      loggedIn: localStorage.getItem("api_token") ? true : false,
    };
  },
  methods: {
    loggedInUser() {
      this.loggedIn = localStorage.getItem("api_token") ? true : false;
    },
    async logoutUser() {
      await Auth.Logout();
      this.loggedIn = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 20px;
  font-size: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.username {
  padding: 10px 30px;
  border: 1px solid #42b983;
  margin: 10px;
  outline: none;
  font-size: 17px;
  color: #42b983;
}
.password {
  padding: 10px 30px;
  border: 1px solid #42b983;
  margin: 10px;
  outline: none;
  font-size: 17px;
  color: #42b983;
}
.password-confirmation {
  padding: 10px 30px;
  border: 1px solid #42b983;
  margin: 10px;
  outline: none;
  font-size: 17px;
  color: #42b983;
}

.authform {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  margin-top: 100px;
  justify-content: center;
}

.auth-submit {
  padding: 20px;
  margin: 10px;
  font-size: 30px;
  background-color: #fff;
  color: #42b983;
  border: none;
  border: 1px solid #42b983;
}
.auth-submit:hover {
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

.auth-submit-disabled {
  padding: 20px;
  margin: 10px;
  font-size: 30px;
  background-color: #ececec;
  color: #42b983;
  border: none;
  border: 1px solid #555555;
}

.logout {
  padding: 20px 50px;
  margin: 10px;
  font-size: 22px;
  background-color: #429943;
  color: white;
  border-radius: 10px;
  border: none;
  outline: none;
}
.logout:hover {
  cursor: pointer;
  padding: 20px 50px;
  margin: 10px;
  font-size: 22px;
  background-color: #42b983;
  color: #eee;
  border-radius: 10px;
  border: none;
  outline: none;
}
</style>
