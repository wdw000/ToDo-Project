<template>
  <div class="to-do-statistic-item">
    <div class="statistic-item">
      <div class="done-per" :style="{ 'background-color': color }"></div>
      <p>{{ date }}</p>
      <button class="statistic-more-click" @click="moreOpen"></button>
    </div>
    <div class="expand-statistic-item" v-if="isMore">
      <ul>
        <li v-for="todo in this.todos" :key="todo">
          <input type="checkbox" :checked="todo.done" />
          <label for="id">{{ todo.label }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: { String },
    todos: { type: Object },
  },
  mounted() {
    this.todosProgress();
  },
  data() {
    return {
      color: "",
      isMore: false,
    };
  },
  methods: {
    todosProgress() {
      let total = 0;
      let done = 0;
      for (const todo in this.todos) {
        total++;
        if (this.todos[todo].done === true) {
          done++;
        }
      }
      const per = parseInt((done / total) * 100);
      if (per === 100) {
        this.color = "blue";
      } else if (100 > per && per >= 66) {
        this.color = "green";
      } else if (66 > per && per >= 33) {
        this.color = "yellow";
      } else {
        this.color = "red";
      }
    },

    moreOpen() {
      this.isMore = !this.isMore;
    },
  },
};
</script>

<style scoped>
.to-do-statistic-item {
  font-size: 1.6rem;
  max-width: 1080px;
  margin: 0 auto;
}

.statistic-item {
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
}

.done-per {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  border: solid lightgray 0.2rem;
  text-align: center;
}

.statistic-more-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/todo_statistic/outline_expand_more_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .statistic-more-click {
    background-image: url("../assets/todo_statistic/outline_expand_more_black_24dp_2x.png");
  }
}

.expand-statistic-item {
  padding: 0 5rem;
}

.expand-statistic-item ul {
  list-style: disc;
}

.expand-statistic-item li {
  margin: 1rem 0;
}

.expand-statistic-item input {
  display: none;
}

.expand-statistic-item input:checked + label {
  text-decoration: line-through;
  color: gray;
}
</style>
