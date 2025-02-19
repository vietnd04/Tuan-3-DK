<template>
  <div class="container">
    <h1>Quản lý Công việc</h1>
    <TaskForm />
    <div v-if="loading" class="status-message">Đang tải...</div>
    <div v-else>
      <ul class="task-list">
        <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
      </ul>
    </div>
    <div v-if="error" class="error-message">{{ error.message }}</div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useTaskStore } from '../store/taskStore'
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'

export default {
  name: 'TaskList',
  components: { TaskForm, TaskItem },
  setup() {
    const taskStore = useTaskStore()

    onMounted(() => {
      taskStore.fetchTasks()
    })

    const tasks = computed(() => taskStore.tasks)
    const loading = computed(() => taskStore.loading)
    const error = computed(() => taskStore.error)

    return { tasks, loading, error }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.status-message {
  text-align: center;
  color: #3498db;
  font-size: 1.2rem;
  padding: 1rem 0;
}

.error-message {
  text-align: center;
  color: #e74c3c;
  font-size: 1.1rem;
  padding: 1rem 0;
}
</style>
