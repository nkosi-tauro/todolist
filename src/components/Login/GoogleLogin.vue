<template>
  <section class="my-5 text-center">
    <button @click="googleAuth" class="border px-2 rounded-sm">
      Login with Google
    </button>
  </section>
</template>

<script>
import firebase from '../../utilities/firebase.js'
export default {
  name: "Google login",
  methods: {
    googleAuth() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$emit("close-login-from-google");
        });
    },
  },
};
</script>


<style>
</style>