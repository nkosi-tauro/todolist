<template>
  <div class="container mx-auto">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/node-waves@0.7.6/dist/waves.min.css" />
    <h1>ToDo List</h1>
    
    <div  class="mx-10 pt-15">
      <div class="grid gap-6 mb-8 md:grid-cols-2">
        <div v-for="(todo, index) in todosList" :key="index" class="min-w-0 p-4 text-white bg-purple-600 rounded-lg shadow-xs">
          <h4 class="mb-4 font-semibold">
            {{ todo.title }}
          </h4>
          <p>
            {{ todo.desc }}
          </p>
          <button @click="removeTodo(index)">❌</button>
        </div>
      </div>
    </div>

    <form @submit.prevent="addTodo">
      <input v-model.trim="newTodo.title" required />
      <br />
      <textarea v-model.trim="newTodo.desc" required></textarea>
      <button type="submit">Add Todo</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Todo",
  methods: {
    addTodo() {
      if (this.newTodo.title !== "" && this.newTodo.desc !== "") {
        this.todosList.push({
          title: this.newTodo.title,
          desc: this.newTodo.desc,
        });
        this.newTodo.title = "";
        this.newTodo.desc = "";
      }
    },

    removeTodo(index) {
      this.todosList = this.todosList.filter((todo, i) => i != index);
    },
  },

  data() {
    return {
      newTodo: {
        title: "",
        desc: "",
      },
      todosList: [
        {
          title: "Pizza",
          desc: "Hawaiian",
        },
        {
          title: "Pizza",
          desc: "Mexican",
        },
        {
          title: "Pizza",
          desc: "Macaroni",
        },
      ],
    };
  },
};
</script>

<style>
</style>