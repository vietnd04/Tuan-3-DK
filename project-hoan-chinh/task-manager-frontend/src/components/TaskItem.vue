<template>
  <li>
   
    <div v-if="isEditing">
      <input v-model="editedTitle" type="text" />
      <button @click="submitUpdate">Lưu</button>
      <button @click="cancelEdit">Hủy</button>
    </div>
   
    <div v-else>
      <span :class="{ completed: task.completed }">{{ task.title }}</span>
      <button @click="enableEdit">Sửa</button>
      <button @click="deleteTask">Xoá</button>
    </div>
  </li>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../store/taskStore'

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const taskStore = useTaskStore()
    const isEditing = ref(false)
    const editedTitle = ref(props.task.title)

    const enableEdit = () => {
      isEditing.value = true
    }

    const cancelEdit = () => {
      isEditing.value = false
      editedTitle.value = props.task.title
    }

    const submitUpdate = async () => {
      if (editedTitle.value.trim() === '') return
      await taskStore.updateTask({ ...props.task, title: editedTitle.value })
      isEditing.value = false
    }

    const deleteTask = () => {
      taskStore.deleteTask(props.task.id)
    }

    return {
      isEditing,
      editedTitle,
      enableEdit,
      cancelEdit,
      submitUpdate,
      deleteTask
    }
  }
}
</script>

<style scoped>
li {
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input[type="text"] {
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:nth-of-type(1) {
  background-color: #3498db;
  color: #fff;
}

button:nth-of-type(1):hover {
  background-color: #2980b9;
}

button:nth-of-type(2) {
  background-color: #e74c3c;
  color: #fff;
}

button:nth-of-type(2):hover {
  background-color: #c0392b;
}
.completed {
  text-decoration: line-through;
  color: #7f8c8d;
}
</style>
