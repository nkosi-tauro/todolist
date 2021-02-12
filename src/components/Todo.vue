<template>
  <div>
    <h1>ToDo List</h1>
    <ul>
      <li v-for="(todo, index) in todosList" :key="index">
        <div>
            <p>{{ todo.title }}</p>
            <p>{{ todo.desc }}</p>
            <button @click="removeTodo(index)">❌</button>
        </div>
      </li>
    </ul>

    <form @submit.prevent="addTodo">
        <input v-model.trim="newTodo.title" required/>
        <br>
        <input v-model.trim="newTodo.desc" required/>
        <button type="submit">Add Todo</button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'Todo',
    methods: {
        addTodo(){
            if(this.newTodo.title !== '' && this.newTodo.desc !== ''){
                this.todosList.push({title : this.newTodo.title, desc : this.newTodo.desc})
                this.newTodo.title = ''
                this.newTodo.desc = ''
            }
        },

        removeTodo(index){
            this.todosList = this.todosList.filter((todo, i)=> i != index)
        }
    },

    data(){
        return{
            newTodo: {
                title : "",
                desc : ""
            },
            todosList : [
                {   
                    title : "Pizza",
                    desc : "Hawaiian"
                
                },
                {   
                    title : "Pizza",
                    desc : "Mexican"
                
                },
                {   
                    title : "Pizza",
                    desc : "Macaroni"
                
                }
            ]
        }
    }
}
</script>

<style>
</style>