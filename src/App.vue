<template >
  <div>
    <Header :isLoggedIn="isLoggedIn" :authUser="authUser" @open-login-modal="isLoginOpen = true" />
    <Todo :isLoggedIn="isLoggedIn" />
    <LoginModal v-if="isLoginOpen" @close-login-modal="isLoginOpen = false" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Todo from "./components/Todo.vue";
import LoginModal from "./components/LoginModal.vue";
import firebase from './utilities/firebase.js'
import {onMounted,toRefs, reactive} from 'vue'

export default {
  name: "App",
  components: {
    Todo,
    Header,
    LoginModal,
  },

  setup() {
    // data
    const state = reactive({
      isLoginOpen : false,
      isLoggedIn : false,
      authUser : {}
    })

    // Lifecycle
    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          state.isLoggedIn = true;
          state.authUser = user;

        }
        else{
          // no user signed in
          state.isLoggedIn = false;
          state.authUser = {};
          
        }
      })
    })

    return {...toRefs(state)}
  }
};
</script>

<style>
</style>