<template >
  <div>
    <Header :isLoggedIn="isLoggedIn"  @open-login-modal="isLoginOpen = true" />
    <Todo :isLoggedIn="isLoggedIn" />
    <LoginModal v-if="isLoginOpen" @close-login-modal="isLoginOpen = false" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Todo from "./components/Todo.vue";
import LoginModal from "./components/LoginModal.vue";
import firebase from './utilities/firebase.js'
import {onMounted,ref} from 'vue'

export default {
  name: "App",
  components: {
    Todo,
    Header,
    LoginModal,
  },

  setup() {
    // data
    const isLoginOpen= ref(false)
    const isLoggedIn = ref(false)
    const authUser = ref({})

    // Lifecycle
    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          isLoggedIn.value = true;
          authUser.value = user;

        }
        else{
          // no user signed in
          isLoggedIn.value = false;
          authUser.value = {};
          
        }
      })
    })

    return {isLoginOpen, isLoggedIn, authUser}
  }
};
</script>

<style>
</style>