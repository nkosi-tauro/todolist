<template>
  <div>
    <section
      @click="$emit('close-login-modal')"
      class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/2">
          <div class="p-2 border">
            <div class="modal-header p-5 bg-purple-600 text-gray-900 rounded-t">
              <h5 class="text-white text-center text-md uppercase">Login</h5>
            </div>
            <form @submit.prevent="submit" class="p-2 my-2">
              <div class="my-4">
                <label>Email or Username</label>
                <input class="rounded shadow p-2 w-full" placeholder="Enter Username or email" />
              </div>
              <div class="my-4">
                <label>Password</label>
                <input type="password" class="rounded shadow p-2 w-full" placeholder="Enter your password" />
              </div>
              <div class="my-4">
                <button type='submit' class="w-full rounded shadow-md bg-gradient-to-r from-green-600 to-green-900 text-white p-3"> Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login Modal",
  methods: {
    submit(){
        //   Submit form
    }

  },
  data(){
    return{
       form : {
           email : "",
           password : "",
       } 

    }
  }
};
</script>

<style>
</style>