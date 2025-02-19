import { defineStore } from 'pinia'
import taskService from '../api/taskService'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await taskService.getTasks()
        this.tasks = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async addTask(task) {
      try {
        const response = await taskService.addTask(task)
        this.tasks.push(response.data)
      } catch (error) {
        this.error = error
      }
    },
    async updateTask(updatedTask) {
      try {
        await taskService.updateTask(updatedTask)
        const index = this.tasks.findIndex(t => t.id === updatedTask.id)
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }
      } catch (error) {
        this.error = error
      }
    },
    async deleteTask(taskId) {
      try {
        await taskService.deleteTask(taskId)
        this.tasks = this.tasks.filter(t => t.id !== taskId)
      } catch (error) {
        this.error = error
      }
    }
  }
})
