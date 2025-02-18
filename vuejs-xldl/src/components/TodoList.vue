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
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Tất cả</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Đang thực hiện</button>
      <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Đã hoàn thành</button>
    </div>

    <ul class="tasks">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        :class="{ completed: task.completed }"
      >
        <div class="task-content">
          <input type="checkbox" v-model="task.completed" />
          <span v-if="!task.isEditing" @dblclick="startEditTask(task)">{{ task.text }}</span>
          <input
            v-else
            type="text"
            v-model="task.text"
            @keyup.enter="finishEditTask(task)"
            @blur="finishEditTask(task)"
          />
        </div>
        <div class="task-actions">
          <button @click="startEditTask(task)" v-if="!task.isEditing">Sửa</button>
          <button @click="removeTask(task.id)">Xóa</button>
        </div>
      </li>
    </ul>

    <div class="task-counts">
      <p>Tổng cộng: {{ totalTasksCount }}</p>
      <p>Đang thực hiện: {{ activeTasksCount }}</p>
      <p>Đã hoàn thành: {{ completedTasksCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskText: '',
      tasks: [],
      filter: 'all',
      nextTaskId: 1,
    };
  },
  computed: {
    filteredTasks() {
      switch (this.filter) {
        case 'active':
          return this.tasks.filter((task) => !task.completed);
        case 'completed':
          return this.tasks.filter((task) => task.completed);
        default:
          return this.tasks;
      }
    },
    totalTasksCount() {
      return this.tasks.length;
    },
    activeTasksCount() {
      return this.tasks.filter((task) => !task.completed).length;
    },
    completedTasksCount() {
      return this.tasks.filter((task) => task.completed).length;
    },
  },
  methods: {
    addTask() {
      if (this.newTaskText.trim() !== '') {
        this.tasks.push({
          id: this.nextTaskId++,
          text: this.newTaskText,
          completed: false,
          isEditing: false,
        });
        this.newTaskText = '';
        this.saveTasksToLocalStorage();
      }
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasksToLocalStorage();
    },
    startEditTask(task) {
      task.isEditing = true;
    },
    finishEditTask(task) {
      task.isEditing = false;
      this.saveTasksToLocalStorage();
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('vuejs-todos', JSON.stringify(this.tasks));
    },
    loadTasksFromLocalStorage() {
      const storedTasks = localStorage.getItem('vuejs-todos');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
        if (this.tasks.length > 0) {
          this.nextTaskId = Math.max(...this.tasks.map((task) => task.id)) + 1;
        }
      }
    },
  },
  created() {
    console.log('TodoList component created');
    this.loadTasksFromLocalStorage();
  },
  mounted() {
    console.log('TodoList component mounted');
  },
  updated() {
    console.log('TodoList component updated');
  },
  unmounted() { 
    console.log('TodoList component unmounted');
    this.saveTasksToLocalStorage();
  },
};
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