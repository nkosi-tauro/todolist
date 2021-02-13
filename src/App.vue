<template>
  <div>
    <Header/>
    <Todo/>
    <LoginModal/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Todo from './components/Todo.vue'
import LoginModal from './components/LoginModal.vue'

export default {
  name: 'App',
  components: {
    Todo,
    Header,
    LoginModal
  }

}
</script>

<style>
</style>