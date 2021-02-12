<template>
  <div class="container mx-auto">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/node-waves@0.7.6/dist/waves.min.css"
    />

    <br>

    <div class="mx-10 pt-15">
      <div class="grid gap-6 mb-8 md:grid-cols-2">
        <div
          v-for="(todo, index) in todosList"
          :key="index"
          class="min-w-0 p-4 text-white bg-purple-600 rounded-lg shadow-xs"
        >
          <h4 class="mb-4 font-semibold">
            {{ todo.title }}
          </h4>
          <p>
            {{ todo.desc }}
          </p>
          <button @click="removeTodo(index)" class="float-right inline-block p-3 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
            <svg
              class="w-5 h-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
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
          title: "Bake Some Pizza",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
        },
        {
          title: "Go to Shops",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
        }
      ],
    };
  },
};
</script>

<style>
</style>