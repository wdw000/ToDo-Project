<template>
  <div class="to-do-input">
    <form @submit.prevent="writeTodo">
      <input
        type="text"
        id="new-todo-input"
        name="new-todo"
        autocomplete="off"
        placeholder="오늘의 할일"
        v-model="label"
      />
      <button class="todo-submit-click" type="submit"></button>
    </form>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { push, child, ref, update, getDatabase } from "firebase/database";
export default {
  data() {
    return {
      label: "",
    };
  },
  props: {},
  methods: {
    writeTodo() {
      const db = getDatabase();
      if (this.label === "") {
        return;
      }
      const labelData = {
        label: this.label,
        done: false,
      };
      this.label = "";
      const newLabelKey = push(child(ref(db), "todo")).key;
      const updates = {};
      updates["/users/" + getAuth().currentUser.uid + "/todos/" + newLabelKey] =
        labelData;
      return update(ref(db), updates);
    },
  },
};
</script>

<style scoped>
.to-do-input {
  width: 100%;
  font-size: 1.6rem;
  margin-top: 1rem;
}

form {
  display: flex;
  align-items: center;
  width: inherit;
}

form > input {
  flex: 1;
  padding: 1rem;
  margin-right: 1rem;
}

.todo-submit-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/todolist/outline_add_black_24dp.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .todo-submit-click {
    background-image: url("../assets/todolist/outline_add_black_24dp_2x.png");
  }
}
</style>
