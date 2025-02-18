<template>
  <div class="container">
    <h1>Danh sách công việc</h1>
    <TaskForm />
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else>
      <ul class="task-list">
        <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
      </ul>
    </div>
    <div v-if="error" class="error">{{ error.message }}</div>
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
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
