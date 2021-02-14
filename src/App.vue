<template>
  <div>
    <Header :isLoggedIn="isLoggedIn" @open-login-modal="isLoginOpen = true" />
    <Todo :isLoggedIn="isLoggedIn"/>
    <LoginModal v-if="isLoginOpen" @close-login-modal="isLoginOpen= false"/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Todo from "./components/Todo.vue";
import LoginModal from "./components/LoginModal.vue";
import firebase from './utilities/firebase.js'
export default {
  name: "App",
  components: {
    Todo,
    Header,
    LoginModal,
  },
  data() {
    return {
      isLoginOpen: false,
      isLoggedIn : false,
      authUser : {},
    };
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.isLoggedIn = true;
        this.authUser = user;
      }
      else{
        // no user signed in
        this.isLoggedIn = false;
        this.authUser = {};
        
      }
    })

  }
};
</script>

<style>
</style>