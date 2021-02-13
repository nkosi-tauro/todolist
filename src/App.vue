<template>
  <div>
    <Header @open-login-modal="isLoginOpen = true" />
    <Todo />
    <LoginModal v-if="isLoginOpen" @close-login-modal="isLoginOpen= false"/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Todo from "./components/Todo.vue";
import LoginModal from "./components/LoginModal.vue";

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
    };
  },
};
</script>

<style>
</style>