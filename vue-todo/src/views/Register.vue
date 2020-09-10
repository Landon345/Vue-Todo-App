<template>
  <form action="" class="authform" @submit.prevent="registerUser">
    <label for="username" class="username-label">username</label>
    <input type="text" class="username" v-model="username" />
    <label for="password" class="password-label">password</label>
    <input type="password" class="password" v-model="password" />
    <label for="password-confirmation" class="password-confirmation-label"
      >password confirmation</label
    >
    <input
      type="password"
      class="password-confirmation"
      v-model="password_confirmation"
    />
    <button
      type="submit"
      :class="
        username && password && password_confirmation
          ? 'auth-submit'
          : 'auth-submit-disabled'
      "
      :disabled="username && password && password_confirmation ? false : true"
    >
      Register
    </button>
  </form>
</template>

<script>
import Auth from "../Auth";
export default {
  data() {
    return {
      username: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.password_confirmation) {
        alert("password and password confirmation do not match");
        return;
      }
      if (!(this.password && this.username && this.password_confirmation)) {
        alert("you must fill in all fields");
        return;
      }
      await Auth.Register({
        username: this.username,
        password: this.password,
      });

      this.$router.push("/");
      this.$emit("logged-in");
    },
  },
};
</script>

<style></style>
