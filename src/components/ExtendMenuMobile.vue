<template>
  <div class="extend-menu-mobile">
    <div class="menu-wrap">
      <button class="menu-close-click" @click="$emit('close')"></button>
      <hr />
      <div class="profile">
        <div class="profile-img">
          <img :src="userInfo.imgSrc" alt="user img" />
        </div>
        <div class="profile-content">
          <p>{{ userInfo.email }}</p>
          <div>
            <p>{{ userInfo.name }}</p>
            <button @click="$emit('logout')" class="extend-logout-click">
              logout
            </button>
          </div>
        </div>
      </div>
      <hr />
      <ul>
        <li class="todo-list-click" @click="getItem('todoList')">
          오늘의 할일
        </li>
        <li class="todo-statistic-click" @click="getItem('todoStatistic')">
          통계
        </li>
        <li class="signout-click" @click="signOut">회원탈퇴</li>
      </ul>
    </div>
    <div class="gray-box"></div>
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
  },
};
</script>

<style scoped>
.extend-menu-mobile {
  font-size: 1.6rem;
}

li {
  margin: 2rem;
  font-size: 2rem;
}

.menu-wrap {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
  z-index: 100;
}

.gray-box {
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 10;
}

.menu-close-click {
  margin-left: 100%;
  transform: translate(-100%);
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/header/outline_close_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.menu-close-click {
  margin-top: 1rem;
}

.profile {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
}

.profile p {
  margin: 0.5rem 0;
}

.profile-content {
  padding: 0 1rem;
}

.profile-content > div {
  display: flex;
  justify-content: space-between;
}

.profile-img {
  border-radius: 4rem;
  overflow: hidden;
  width: 5rem;
  height: 5rem;
  margin-left: 1rem;
}

.profile-img > img {
  height: inherit;
  widows: inherit;
}

.signout-click {
  margin: 5rem 2rem;
}

@media screen and (min-width: 1024px) {
  .menu-close-click {
    background-image: url("../assets/header/outline_close_black_24dp_2x.png");
  }
}
</style>
