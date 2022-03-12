<template>
  <div class="to-do-item" v-if="!isEdit">
    <input type="checkbox" :id="id" :checked="isDone" @change="doneChange" />
    <label :for="id" class="todo-item-click">{{ label }}</label>
    <button class="todo-edit-click" @click="isEditing"></button>
    <button class="todo-delete-click" @click="todoDelete"></button>
  </div>
  <to-do-edit
    v-else
    @editCancel="editClose"
    @editDone="editClose"
    :id="id"
    :label="label"
    :isDone="isDone"
  ></to-do-edit>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getDatabase, ref, remove, set } from "firebase/database";
import ToDoEdit from "./ToDoEdit.vue";

export default {
  components: { ToDoEdit },
  props: {
    id: { type: String },
    label: { type: String },
    isDone: { type: Boolean },
  },

  data() {
    return {
      isEdit: false,
    };
  },

  methods: {
    doneChange() {
      const db = getDatabase();
      set(ref(db, "users/" + getAuth().currentUser.uid + "/todos/" + this.id), {
        label: this.label,
        done: !this.isDone,
      });
    },

    todoDelete() {
      const db = getDatabase();
      remove(
        ref(db, "users/" + getAuth().currentUser.uid + "/todos/" + this.id)
      );
    },

    isEditing() {
      this.isEdit = true;
    },

    editClose() {
      this.isEdit = false;
    },
  },
};
</script>

<style scoped>
.to-do-item {
  width: inherit;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  margin: 1.6rem 0;
}

.to-do-item > label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1rem;
}

.to-do-item > input {
  display: none;
}

.to-do-item > input:checked + label {
  text-decoration: line-through;
  color: gray;
}

.todo-edit-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/todolist/outline_edit_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.todo-delete-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/todolist/outline_delete_forever_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .todo-edit-click {
    background-image: url("../assets/todolist/outline_edit_black_24dp_2x.png");
  }

  .todo-delete-click {
    background-image: url("../assets/todolist/outline_delete_forever_black_24dp_2x.png");
  }
}
</style>
