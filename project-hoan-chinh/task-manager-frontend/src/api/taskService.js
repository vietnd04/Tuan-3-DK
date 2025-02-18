import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'  
})

export default {
  getTasks() {
    return api.get('/tasks')
  },
  addTask(task) {
    return api.post('/tasks', task)
  },
  updateTask(task) {
    return api.put(`/tasks/${task.id}`, task)
  },
  deleteTask(taskId) {
    return api.delete(`/tasks/${taskId}`)
  }
}
