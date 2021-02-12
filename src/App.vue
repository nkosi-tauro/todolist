<template>
  <div>
    <Header/>
    <Todo/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
    Todo,
    Header
  }

}
</script>

<style>
</style>