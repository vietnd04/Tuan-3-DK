import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref([]);
  const filter = ref('all');
  const nextTaskId = ref(1);

  const filteredTasks = computed(() => {
    switch (filter.value) {
      case 'active':
        return tasks.value.filter(task => !task.completed);
      case 'completed':
        return tasks.value.filter(task => task.completed);
      default:
        return tasks.value;
    }
  });

  const totalTasksCount = computed(() => tasks.value.length);
  const activeTasksCount = computed(() => tasks.value.filter(task => !task.completed).length);
  const completedTasksCount = computed(() => tasks.value.filter(task => task.completed).length);

  function addTask(taskText) {
    if (taskText.trim() !== '') {
      tasks.value.push({
        id: nextTaskId.value++,
        text: taskText,
        completed: false,
        isEditing: false,
      });
      saveTasksToLocalStorage();
    }
  }

  function removeTask(taskId) {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
    saveTasksToLocalStorage();
  }

  function startEditTask(task) {
    task.isEditing = true;
  }

  function finishEditTask(task) {
    task.isEditing = false;
    saveTasksToLocalStorage();
  }

  function toggleTaskCompletion(task) {
    console.log('toggleTaskCompletion action called for task:', task);
    console.log('Current task.completed status:', task.completed);

    const taskToUpdate = tasks.value.find(t => t.id === task.id);
    if (taskToUpdate) {
      console.log('Task found in tasks.value:', taskToUpdate);
      taskToUpdate.completed = !taskToUpdate.completed;
      console.log('New task.completed status:', taskToUpdate.completed);
      saveTasksToLocalStorage();
    } else {
      console.log('Task NOT found in tasks.value!');
    }
  }

  function setFilter(newFilter) {
    filter.value = newFilter;
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem('vuejs-todos-pinia', JSON.stringify(tasks.value));
  }

  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('vuejs-todos-pinia');
    if (storedTasks) {
      tasks.value = JSON.parse(storedTasks);
      if (tasks.value.length > 0) {
        nextTaskId.value = Math.max(...tasks.value.map(task => task.id)) + 1;
      }
    }
  }

  function initializeStore() {
    loadTasksFromLocalStorage();
  }

  function onUnmounted() {
    saveTasksToLocalStorage();
  }

  return {
    tasks,
    filter,
    nextTaskId,
    filteredTasks,
    totalTasksCount,
    activeTasksCount,
    completedTasksCount,
    addTask,
    removeTask,
    startEditTask,
    finishEditTask,
    toggleTaskCompletion,
    setFilter,
    saveTasksToLocalStorage,
    loadTasksFromLocalStorage,
    initializeStore,
    onUnmounted
  };
});