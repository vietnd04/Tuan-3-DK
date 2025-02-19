<template>
  <li class="task-item">
    <div v-if="isEditing" class="task-edit">
      <input v-model="editedTitle" type="text" class="task-edit-input" />
      <div class="btn-group">
        <button @click="submitUpdate" class="btn btn-save">Lưu</button>
        <button @click="cancelEdit" class="btn btn-cancel">Hủy</button>
      </div>
    </div>
    <div v-else class="task-view">
      <span :class="{ completed: task.completed }" class="task-title">
        {{ task.title }}
      </span>
      <div class="btn-group">
        <button @click="enableEdit" class="btn btn-edit">Sửa</button>
        <button @click="deleteTask" class="btn btn-delete">Xoá</button>
      </div>
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
.task-item {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.task-view,
.task-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-title {
  font-size: 1.1rem;
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #7f8c8d;
}

.task-edit-input {
  flex: 1;
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

.task-edit-input:focus {
  border-color: #3498db;
}

.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #fff;
}

.btn-edit {
  background-color: #f1c40f;
}

.btn-edit:hover {
  background-color: #f39c12;
}

.btn-delete {
  background-color: #e74c3c;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.btn-save {
  background-color: #2ecc71;
}

.btn-save:hover {
  background-color: #27ae60;
}

.btn-cancel {
  background-color: #95a5a6;
}

.btn-cancel:hover {
  background-color: #7f8c8d;
}
</style>
