<template>
  <div class="container mx-auto">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/node-waves@0.7.6/dist/waves.min.css"
    />

    <br />
    <button
      @click="isDarkMode"
      class="bg-white float-right border-black border dark:bg-gray-800 dark:border-transparent p-2 rounded-full text-1xl font-semibold"
    >
      <span v-if="!dark_mode">🌑</span>
      <span v-else>☀</span>
    </button>

    <br />
    <div v-if="!isLoggedIn" class="text-center">
      <div
        disabled
        class="bg-red-500 dark:bg-pink-800 text-white p-2 rounded text-1xl m-auto w-1/2 font-semibold"
      >
        Please login to add a new task.
      </div>
    </div>
    <div v-else>
      <button
        @click="showModal"
        class="bg-green-500 dark:bg-white dark:text-black text-white p-2 rounded text-1xl font-semibold"
      >
        New Todo
      </button>
    </div>

    <br />

    <!-- Cards -->
    <div class="mx-10 pt-15">
      <div class="grid gap-6 mb-8 md:grid-cols-2">
        <div
          v-for="(todo, index) in todosList"
          :key="index"
          class="min-w-0 p-4 text-white dark:bg-black bg-purple-600 rounded-lg shadow-xs"
        >
          <h4 class="mb-4 font-semibold">
            {{ todo.title }}
          </h4>
          <p>
            {{ todo.desc }}
          </p>
          <div v-if="isLoggedIn">
            <button
              @click="removeTodo(index)"
              class="float-right inline-block p-3 text-center text-white transition bg-red-500 dark:bg-pink-800 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
            >
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
            <button
              @click="editTodo(index)"
              class="float-right mr-1 inline-block p-3 text-center text-white transition bg-green-500 dark:bg-indigo-800 rounded shadow ripple hover:shadow-lg focus:outline-none"
            >
              Edit
            </button>
          </div>
          <div v-else></div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="h-full w-full flex items-center justify-center">
      <transition name="fade">
        <div v-show="show_modal" class="fixed inset-0 z-30">
          <!--       background -->
          <div
            v-show="show_modal"
            @click="showModal"
            class="bg-filter opacity-25 fixed inset-0 w-full h-full z-20"
          ></div>
          <!--          -->
          <main class="flex flex-col items-center justify-center h-full w-full">
            <transition name="fade-up-down">
              <div
                v-show="show_modal"
                class="modal-wrapper flex items-center z-30"
              >
                <div
                  class="w-100 modal max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-white dark:bg-gray-700 max-h-screen shadow-lg flex-row rounded relative"
                >
                  <form @submit.prevent="addTodo">
                    <div
                      class="modal-header p-5 bg-purple-600 dark:bg-gray-700 text-gray-900 rounded-t"
                    >
                      <h5 class="text-white text-md uppercase">Add new Todo</h5>
                    </div>
                    <div class="modal-body p-5 w-full h-full overflow-y-auto">
                      <div
                        class="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-white sm:text-lg sm:leading-7"
                      >
                        <div class="flex flex-col">
                          <label class="leading-loose">Todo Title</label>
                          <input
                            v-model.trim="newTodo.title"
                            type="text"
                            class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="Todo title"
                            required
                          />
                        </div>
                        <div class="flex flex-col">
                          <label class="leading-loose">Todo Description</label>
                          <textarea
                            v-model.trim="newTodo.desc"
                            class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="Todo Description"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="modal-footer py-3 px-5 border0-t text-right space-x-3"
                    >
                      <button
                        class="bg-blue-600 dark:bg-yellow-700 dark:text-white px-5 py-2 text-white"
                        @click="updateTodo(index)"
                      >
                        UPDATE
                      </button>
                      <button
                        class="bg-white dark:bg-black dark:text-white px-5 py-2 text-black"
                        @click="showModal()"
                      >
                        CANCEL
                      </button>

                      <button
                        type="submit"
                        class="bg-green-600 dark:bg-white dark:text-black px-5 py-2 border-black text-white"
                      >
                        OK
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </transition>
          </main>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// Compostion API
import { onMounted, reactive, toRefs } from "vue";
export default {
  name: "Todo",
  props: {
    isLoggedIn: Boolean,
  },
  setup() {
    // data
    const state = reactive({
      dark_mode : false,
      show_modal: false,
      newTodo : {
        title: null,
        desc: null
      },
      todosList : {
        title: "",
        desc: ""        
      }
    })

    onMounted(() => {
      if (localStorage.getItem("todosList")) {
        try {
          state.todosList = JSON.parse(localStorage.getItem("todosList"));
        } catch (e) {
          localStorage.removeItem("todosList");
        }
      }
    });

    // Methods
    function addTodo() {
      if (state.newTodo.title !== null && state.newTodo.desc !== null) {
        state.todosList.push({
          title: state.newTodo.title,
          desc: state.newTodo.desc,
        });
        state.newTodo.title = "";
        state.newTodo.desc = "";
        saveTodo();
        showModal();
      }
    }

    function saveTodo() {
      const parsed = JSON.stringify(state.todosList);
      localStorage.setItem("todosList", parsed);
    }

    function removeTodo(index) {
      state.todosList = state.todosList.filter((todo, i) => i != index);
      saveTodo();
    }
    let getTodo;
    function editTodo(index) {
      const todoIndex = state.todosList.findIndex((todo, i) => i === index);
      // display old data in input fields
      state.newTodo.title = state.todosList[index].title;
      state.newTodo.desc = state.todosList[index].desc;
      showModal();

      getTodo = todoIndex;
      return getTodo;
    }

    function updateTodo() {
      // get Stored Todos object
      const getTodos = localStorage.getItem("todosList");
      const parsedTodos = JSON.parse(getTodos);
      // Update Todos
      parsedTodos[getTodo].title = state.newTodo.title;
      parsedTodos[getTodo].desc = state.newTodo.desc;
      const updatedTodosForStorage = JSON.stringify(parsedTodos);
      if (state.newTodo.title !== null && state.newTodo.desc !== null) {
        removeTodo(getTodo);
      }
      localStorage.setItem("todosList", updatedTodosForStorage);
    }

    function showModal() {
      if (state.show_modal) {
        //stop screen scrolling
        document
          .getElementsByTagName("html")[0]
          .classList.remove("overflow-y-hidden");
        state.show_modal = false;
      } else {
        document
          .getElementsByTagName("html")[0]
          .classList.add("overflow-y-hidden");
        state.show_modal = true;
      }
    }

    function isDarkMode() {
      const root = document.getElementsByTagName("html")[0];
      if (state.dark_mode == false) {
        root.setAttribute("class", "dark");
        state.dark_mode = true;
      } else if (state.dark_mode == true) {
        root.classList.remove("dark");
        state.dark_mode = false;
      }
    }

    return {
      ...toRefs(state),
      removeTodo,
      addTodo,
      isDarkMode,
      showModal,
      saveTodo,
      editTodo,
      updateTodo,
    };
  },
};
</script>

<style scoped>
.modal-body {
  max-height: 500px;
}
.bg-gray-800-opacity {
  background-color: #2d374850;
}
@media screen and (max-width: 768px) {
  .modal-body {
    max-height: 400px;
  }
}

/* animation for vue transition tag */

.fade-up-down-enter-active {
  transition: all 0.3s ease;
}
.fade-up-down-leave-active {
  transition: all 0.3s ease;
}
.fade-up-down-enter {
  transform: translateY(10%);
  opacity: 0;
}
.fade-up-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.fade-enter-active {
  -webkit-transition: opacity 2s;
  transition: opacity 0.3s;
}
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>