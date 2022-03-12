<template>
  <div class="home">
    <h1>ToDo</h1>
    <p>로그인 및 회원가입 후 시작</p>
    <div class="login-click" @click="loginGoogle">
      <img
        src="../assets/google/btn_google_light_normal_ios.svg"
        alt="google"
      />
      <p>Google</p>
    </div>
  </div>
</template>

<script>
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

export default {
  name: "Login",
  components: {},
  created() {
    const auth = getAuth();
    getRedirectResult(auth).then((result) => {
      if (GoogleAuthProvider.credentialFromResult(result)) {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      }
      this.$router.replace("main");
    });
  },
  methods: {
    loginGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      auth.useDeviceLanguage();
      signInWithRedirect(auth, provider);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
h1 {
  font-size: 10rem;
}

.home {
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.home > p {
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  font-size: 1.4rem;
}

.login-click {
  display: flex;
  background-color: white;
  height: fit-content;
  margin: 1rem 0;
}

.login-click > p {
  height: fit-content;
  margin: auto 8px;
  flex: 1;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  text-align: center;
}
</style>
