k
<template>
  <div class="to-do-edit">
    <form @submit.prevent="editTodo">
      <input
        type="text"
        autocomplete="off"
        v-model.lazy.trim="newLabel"
        :placeholder="label"
        required
      />
      <button class="todo-change-click" type="submit"></button>
      <button
        class="todo-cancel-click"
        type="button"
        @click="editCancel"
      ></button>
    </form>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
export default {
  props: {
    id: { type: String },
    label: { type: String },
    isDone: { type: Boolean },
  },
  data() {
    return {
      newLabel: "",
    };
  },
  methods: {
    editCancel() {
      this.$emit("editCancel");
    },

    editTodo() {
      if (this.newLabel !== "" && this.newLabel !== this.label) {
        const db = getDatabase();
        set(
          ref(db, "users/" + getAuth().currentUser.uid + "/todos/" + this.id),
          {
            label: this.newLabel,
            done: this.isDone,
          }
        );

        this.$emit("editDone");
      }
    },
  },
};
</script>

<style scoped>
.to-do-edit {
  width: inherit;
  font-size: 1.6rem;
  margin: 1.6rem 0;
}

form {
  width: 100%;
  display: flex;
  align-items: center;
}

form > input {
  flex: 1;
}

.todo-change-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/todolist/outline_change_circle_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.todo-cancel-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/todolist/outline_cancel_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .todo-change-click {
    background-image: url("../assets/todolist/outline_change_circle_black_24dp_2x.png");
  }

  .todo-cancel-click {
    background-image: url("../assets/todolist/outline_cancel_black_24dp_2x.png");
  }
}
</style>
