<template>
  <div class="todo-list">
    <h1>Danh Sách Công Việc</h1>

    <div class="input-group">
      <input
        v-model="newTaskText"
        @keyup.enter="addTask"
        placeholder="Thêm công việc mới"
      />
      <button @click="addTask">Thêm</button>
    </div>

    <div class="filters">
      <button :class="{ active: todoStore.filter === 'all' }" @click="todoStore.setFilter('all')">Tất cả</button>
      <button :class="{ active: todoStore.filter === 'active' }" @click="todoStore.setFilter('active')">Đang thực hiện</button>
      <button :class="{ active: todoStore.filter === 'completed' }" @click="todoStore.setFilter('completed')">Đã hoàn thành</button>
    </div>

    <ul class="tasks">
      <li
        v-for="task in todoStore.filteredTasks"
        :key="task.id"
        :class="{ completed: task.completed }"
      >
        <div class="task-content">
          <input
            type="checkbox"
            :checked="task.completed"  @change="() => todoStore.toggleTaskCompletion(task)" />
          <span v-if="!task.isEditing" @dblclick="todoStore.startEditTask(task)">{{ task.text }}</span>
          <input
            v-else
            type="text"
            v-model="task.text"
            @keyup.enter="finishEditTask(task)"
            @blur="finishEditTask(task)"
          />
        </div>
        <div class="task-actions">
          <button @click="todoStore.startEditTask(task)" v-if="!task.isEditing">Sửa</button>
          <button @click="removeTask(task.id)">Xóa</button>
        </div>
      </li>
    </ul>

    <div class="task-counts">
      <p>Tổng cộng: {{ todoStore.totalTasksCount }}</p>
      <p>Đang thực hiện: {{ todoStore.activeTasksCount }}</p>
      <p>Đã hoàn thành: {{ todoStore.completedTasksCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useTodoStore } from '../stores/todo';

const newTaskText = ref('');
const todoStore = useTodoStore();

todoStore.initializeStore();

const addTask = () => {
  todoStore.addTask(newTaskText.value);
  newTaskText.value = '';
};

const removeTask = (taskId) => {
  todoStore.removeTask(taskId);
};

const finishEditTask = (task) => {
  todoStore.finishEditTask(task);
};

onUnmounted(() => {
  todoStore.onUnmounted();
});
</script>

<style scoped>
.todo-list {
  font-family: sans-serif;
  max-width: 700px;
  margin: 20px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.todo-list h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.input-group {
  display: flex;
  margin-bottom: 20px;
}

.input-group input {
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.input-group button {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filters button {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 15px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.filters button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.tasks {
  list-style: none;
  padding: 0;
}

.tasks li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}

.tasks li:last-child {
  border-bottom: none;
}

.tasks li.completed {
  color: #777;
  text-decoration: line-through;
}

.task-content {
  display: flex;
  align-items: center;
}

.task-content input[type="checkbox"] {
  margin-right: 15px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.task-content span {
  flex-grow: 1;
  word-break: break-word;
}

.task-content input[type="text"] {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.task-actions button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.task-actions button:first-child {
  background-color: #007bff;
}

.task-counts {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  text-align: right;
  color: #555;
}

.filters button.active {
  font-weight: bold;
}
</style>