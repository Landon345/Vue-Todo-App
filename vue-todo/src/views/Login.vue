<template>
  <div>
    <form class="authform" @submit.prevent="loginUser">
      <label for="username" class="username-label">username</label>
      <input type="text" v-model="username" class="username" />

      <label for="password" class="password-label">password</label>
      <input type="password" v-model="password" class="password" />

      <button
        type="submit"
        :class="username && password ? 'auth-submit' : 'auth-submit-disabled'"
        :disabled="username && password ? false : true"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import Auth from "../Auth";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      await Auth.Login({ username: this.username, password: this.password });
      this.$router.push("/");
      this.$emit("logged-in");
    },
  },
};
</script>

<style scoped></style>
