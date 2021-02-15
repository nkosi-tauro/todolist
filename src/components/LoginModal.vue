<template>
  <div>
    <section
      @click="close"
      class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white dark:text-white dark:bg-gray-800 p-2 rounded shadow w-1/2">
          <div class="p-2 border dark:border-transparent">
            <div class="modal-header p-5 bg-purple-600 dark:bg-pink-800 text-gray-900 rounded-t">
              <h5 class="text-white text-center text-md uppercase">Login</h5>
            </div>
            <GoogleLogin @close-login-from-google="close"/>
            <p class="my-3 text-center">Or</p>
            <form @submit.prevent="submit" class="p-2 my-2">
              <div class="my-4">
                <label>Email or Username</label>
                <input
                 
                  v-model="email"
                  class="rounded shadow p-2 w-full dark:text-black"
                  placeholder="Enter Username or email"
                  autocomplete="username"
                />
              </div>
              <div class="my-4">
                <label>Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="rounded shadow p-2 w-full dark:text-black"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
              </div>
              <div class="my-4">
                <button
                  type="submit"
                  class="w-full rounded shadow-md dark:bg-pink-800 bg-purple-600 text-white p-3"
                >
                  <span v-if="!isLoading"> Login </span>
                  <span v-else>⏳</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from './Login/GoogleLogin.vue'
import firebase from "../utilities/firebase.js";

export default {
  name: "Login Modal",
  components: {
    GoogleLogin
  },

  methods: {
    submit() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          (this.email = ""), (this.password = ""), (this.isLoading = false);
          this.close();
        })
        .catch((err) => {
          // console.log(err)
          this.isLoading = false;
        });
    },
    close() {
      this.$emit("close-login-modal");
    }
  
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
};
</script>

<style>
</style>