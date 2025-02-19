<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <input
      v-model="title"
      type="text"
      placeholder="Nhập tên công việc"
      required
      class="task-input"
    />
    <button type="submit" class="btn btn-add">Thêm công việc</button>
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
.task-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.task-input {
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

.task-input:focus {
  border-color: #3498db;
}

.btn {
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add {
  background-color: #3498db;
  color: #fff;
}

.btn-add:hover {
  background-color: #2980b9;
}
</style>
