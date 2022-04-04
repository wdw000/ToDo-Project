<template>
  <div class="extend-menu-mobile">
    <ul>
      <li class="todo-list-click" @click="getItem('todoList')">오늘의 할일</li>
      <li class="todo-statistic-click" @click="getItem('todoStatistic')">
        통계
      </li>
      <li class="signout-click" @click="isSignOut">회원탈퇴</li>
    </ul>
  </div>
</template>

<script>
import { deleteUser, getAuth } from "firebase/auth";
import { getDatabase, remove, ref } from "firebase/database";

export default {
  props: {
    userInfo: { type: Object },
  },
  data() {
    return {};
  },
  methods: {
    getItem(item) {
      this.$emit("getItem", item);
      this.$emit("close");
    },

    async signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      remove(ref(db, "users/" + user.uid));
      deleteUser(user);
    },

    isSignOut() {
      const temp = confirm("회원 정보를 삭제하겠습니까?");

      if (temp) {
        this.signOut();
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.extend-menu-mobile {
  font-size: 1.6rem;
  position: absolute;
  top: 66px;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  border-top: solid 1px lightgrey;
  box-shadow: 0 5px 5px 2px gray;
}

ul {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

li {
  margin: 3rem 2rem;
  font-size: 2rem;
}

@media screen and (min-width: 1024px) {
  .menu-close-click {
    background-image: url("../assets/header/outline_close_black_24dp_2x.png");
  }
}
</style>
