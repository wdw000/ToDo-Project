<template>
  <div class="to-do-list">
    <to-do-input></to-do-input>
    <to-do-progress :todos="todos"></to-do-progress>
    <to-do-filter @todoType="todoType"></to-do-filter>
    <ul>
      <li v-for="todo in todosData" :key="todo.id">
        <to-do-item
          :id="todo.id"
          :label="todo.label"
          :isDone="todo.done"
        ></to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoInput from "../components/ToDoInput.vue";
import ToDoProgress from "../components/ToDoProgress.vue";
import ToDoFilter from "../components/ToDoFilter.vue";
import ToDoItem from "../components/ToDoItem.vue";

import { getAuth } from "firebase/auth";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  onValue,
  remove,
} from "firebase/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export default {
  components: { ToDoInput, ToDoProgress, ToDoFilter, ToDoItem },
  created() {
    this.updateToday();
    this.initRef();
  },

  data() {
    return {
      todos: {},
      todosStatus: "all",
      date: "",
    };
  },

  mounted() {
    setInterval(this.updateToday.bind(this), 1000);
  },

  methods: {
    updateToday() {
      const offset = new Date().getTimezoneOffset() * 60000;
      const today = new Date(Date.now() - offset);
      this.date = today.toISOString().slice(0, 10);
    },

    initRef() {
      const db = getDatabase();
      const dbRef = ref(db);

      get(child(dbRef, "users/" + getAuth().currentUser.uid)).then(
        (snapshot) => {
          const data = snapshot.val();
          if (!snapshot.exists()) {
            this.makeDatabase();
          } else {
            if (data.date !== this.date) {
              this.initStore(data)
                .then(() => {
                  this.removeRef();
                })
                .then(() => {
                  this.makeDatabase();
                });
            }
          }
          this.getTodoData();
        }
      );
    },

    makeDatabase() {
      const db = getDatabase();
      set(ref(db, "users/" + getAuth().currentUser.uid), {
        date: this.date,
      });
    },

    removeRef() {
      const db = getDatabase();
      remove(ref(db, "users/" + getAuth().currentUser.uid));
    },

    getTodoData() {
      const db = getDatabase();
      const todosRef = ref(db, "users/" + getAuth().currentUser.uid + "/todos");
      onValue(todosRef, (snapshot) => {
        this.todos = snapshot.val();
      });
    },

    async initStore(data) {
      const db = getFirestore();

      await setDoc(doc(db, getAuth().currentUser.uid, data.date), data.todos);
    },

    todoType(type) {
      this.todosStatus = type;
    },
  },

  computed: {
    todosData() {
      let result = [];

      if (this.todosStatus === "all") {
        for (const todo in this.todos) {
          const data = {
            id: todo,
            label: this.todos[todo].label,
            done: this.todos[todo].done,
          };
          result.push(data);
        }
      } else if (this.todosStatus === "progress") {
        for (const todo in this.todos) {
          if (!this.todos[todo].done) {
            const data = {
              id: todo,
              label: this.todos[todo].label,
              done: this.todos[todo].done,
            };
            result.push(data);
          }
        }
      } else if (this.todosStatus === "done") {
        for (const todo in this.todos) {
          if (this.todos[todo].done) {
            const data = {
              id: todo,
              label: this.todos[todo].label,
              done: this.todos[todo].done,
            };
            result.push(data);
          }
        }
      }

      return result;
    },
  },
};
</script>

<style scoped>
.to-do-list {
  width: inherit;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 1rem;
}

ul,
li {
  list-style: disc;
}

ul {
  padding: 0 1rem;
}
</style>
