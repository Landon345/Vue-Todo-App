<template>
  <div id="app">
    <div class="container">
      <div class="app-title">TODO APP with Vue and Node</div>
      <form class="form" @submit.prevent="onSubmit">
        <input
          type="text"
          class="input"
          v-model="title"
          placeholder="todo..."
        />
        <button
          type="submit"
          :class="title ? 'button' : 'button-disabled'"
          :disabled="title ? false : true"
        >
          Add
        </button>
      </form>
      <Todos @fetch-todos="fetchTodos" :todos="todos" />
    </div>
  </div>
</template>

<script>
import Todos from "../components/Todos";
import { postTodo, getTodos } from "../Api";
export default {
  name: "App",
  components: {
    Todos,
  },
  data() {
    return {
      title: "",
      todos: [],
    };
  },
  methods: {
    async onSubmit() {
      if (this.title) {
        await postTodo({ title: this.title, done: false });
      }
      this.title = "";
      this.fetchTodos();
    },
    async fetchTodos() {
      this.todos = await getTodos();
    },
  },
  async created() {
    await this.fetchTodos();
  },
};
</script>

<style>
* {
  margin: 0;
}
#app {
  background-color: #f2f2f2;
  min-height: 100vh;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}
.app-title {
  padding: 20px;
  color: white;
  margin-bottom: 100px;
  font-size: 60px;
  background-color: rgba(0, 0, 0, 0.55);
  border-radius: 10px;
}
.form {
  display: flex;
  width: 90%;
  justify-content: center;
  margin-bottom: 60px;
}
.input {
  display: block;
  flex: 0.85;
  width: 50%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.input:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.button {
  flex: 0.15;
  cursor: pointer;
  padding: 0px 60px;
  background-color: #9393ff;
  margin: 0px 10px;
  border: none;
  border-radius: 0px 16px 0px 16px;
  outline: none;
  font-size: 23px;
  font-weight: 800;
  color: white;
}
.button-disabled {
  flex: 0.15;
  padding: 0px 60px;
  background-color: #9393aa;
  margin: 0px 10px;
  border: none;
  border-radius: 16px 0px 16px 0px;
  outline: none;
  font-size: 23px;
  font-weight: 800;
  color: white;
}
</style>
