<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" type="text" placeholder="Nhập tên công việc" required />
    <button type="submit">Thêm công việc</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../store/taskStore'

export default {
  name: 'TaskForm',
  setup() {
    const title = ref('')
    const taskStore = useTaskStore()

    const handleSubmit = async () => {
      if (title.value.trim() === '') return
      await taskStore.addTask({ title: title.value, completed: false })
      title.value = ''
    }

    return { title, handleSubmit }
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

input[type="text"] {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #3498db;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
