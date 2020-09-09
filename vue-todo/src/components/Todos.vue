<template>
  <div class="todos">
    <ul class="todos__list">
      <li class="list-item" v-for="todo in todos" :key="todo.title">
        <div
          :class="typeof todo.done != 'undefined' && todo.done ? 'todo-title-done' : 'todo-title'"
          @click="markDone(todo)"
        >{{todo.title}}</div>
        <button class="delete" @click="deleteIt(todo)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { putTodo, deleteTodo } from "../Api";

export default {
  name: "Todos",
  props: ["todos"],
  data() {
    return {
      //   todos: [],
    };
  },
  created() {
    this.$emit("fetch-todos");
  },

  methods: {
    // async fetchTodos() {
    //   this.todos = await getTodos();
    // },
    async markDone(todo) {
      const response = await putTodo({
        id: todo.id,
        title: todo.title,
        done: !todo.done,
      });
      console.log(response);
      this.$emit("fetch-todos");
    },
    async deleteIt(todo) {
      const response = await deleteTodo(todo.id);
      console.log(response);
      this.$emit("fetch-todos");
    },
  },
};
</script>

<style  scoped>
.todos {
  width: 100%;
}
.todos__list {
  margin: auto;
  width: 80%;
}
.list-item {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 5px;
  align-items: center;
  /* border: 1px solid #9494ff; */
}
.todo-title {
  cursor: pointer;
  font-size: 30px;
  color: #333;
}
.todo-title-done {
  cursor: pointer;
  font-size: 30px;
  color: #333;
  text-decoration-line: line-through;
}
.delete {
  border: none;
  cursor: pointer;
  background-color: tomato;
  color: white;
  outline: none;
  border-radius: 0px 16px 0px 16px;
  padding: 20px 40px;
}
</style>