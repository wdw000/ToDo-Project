<template>
  <div class="to-do-progress">
    <div class="todo-progress-bar">
      <div class="progress-value" :style="{ width: todoProgress + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: { type: Object },
  },
  computed: {
    todoProgress() {
      return parseInt((this.todoDone / this.todoTotal) * 100);
    },

    todoTotal() {
      const result = [];
      for (const todo in this.todos) {
        result.push(todo);
      }

      return result.length;
    },

    todoDone() {
      const result = [];
      for (const todo in this.todos) {
        if (this.todos[todo].done === true) {
          result.push(todo);
        }
      }

      return result.length;
    },
  },
};
</script>

<style scoped>
.todo-progress-bar {
  width: inherit;
  height: 1rem;
  background-color: lightgray;
  border-radius: 10rem;
}

.progress-value {
  height: inherit;
  width: 0;
  background-color: black;
  border-radius: inherit;
  transition: 0.5s ease-in;
}
</style>
