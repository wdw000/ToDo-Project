<template>
  <div class="header-mobile">
    <button class="menu-open-click" @click="menuOpen"></button>
    <button class="logout-click" @click="logout"></button>
  </div>
  <extend-menu-mobile
    :userInfo="this.userInfo"
    @logout="logout"
    @close="menuClose"
    @getItem="chageItem"
    v-if="extendHeader"
  ></extend-menu-mobile>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import ExtendMenuMobile from "../components/ExtendMenuMobile.vue";

export default {
  components: { ExtendMenuMobile },

  props: {
    userInfo: { type: Object },
    chageItem: { type: Function },
  },

  data() {
    return {
      extendHeader: false,
    };
  },

  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        console.log("로그아웃 성공");
      });
    },

    menuOpen() {
      this.extendHeader = true;
    },

    menuClose() {
      this.extendHeader = false;
    },
  },
};
</script>

<style scoped>
.header-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px;
  width: inherit;
  margin: 0 auto;
  padding: 1rem;
}

.menu-open-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/header/outline_menu_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.logout-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/header/outline_logout_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .menu-open-click {
    background-image: url("../assets/header/outline_menu_black_24dp_2x.png");
  }

  .logout-click {
    background-image: url("../assets/header/outline_logout_black_24dp_2x.png");
  }
}
</style>
