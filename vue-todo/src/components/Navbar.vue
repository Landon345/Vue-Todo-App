<template>
  <div>
    <div id="nav" v-if="loggedIn">
      <router-link to="/">Dashboard</router-link>
      <button @click="logoutUser" class="logout">
        Logout
      </button>
    </div>
    <div id="nav" v-else>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>

    <router-view :key="$route.name" @logged-in="loggedInUser" />
  </div>
</template>

<script>
export default {
  props: ["loggedIn"],
  data() {
    return {
      name: this.$route.name,
    };
  },
  methods: {
    loggedInUser() {
      this.$emit("logged-in");
    },
    async logoutUser() {
      this.$emit("logout-user");
    },
  },
};
</script>

<style scoped></style>
