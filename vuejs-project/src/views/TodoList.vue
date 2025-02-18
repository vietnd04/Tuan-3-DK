<template>
  <div>
    <h2>Todo List</h2>
    <form @submit.prevent="addTodo">
      <input 
        type="text" 
        v-model="newTodo" 
        placeholder="Nhập công việc cần làm" 
      />
      <button type="submit">Thêm</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
        <button @click="removeTodo(index)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    addTodo() {
      if(this.newTodo.trim() !== '') {
        this.todos.push(this.newTodo.trim());
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
input {
  padding: 5px;
  font-size: 16px;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 5px 0;
}
</style>
