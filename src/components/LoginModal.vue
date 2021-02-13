<template>
    <div>
        <section @click="$emit('close-login-modal')" class=" z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"></section>
        <div class="absolute inset-0">
            <div class="  flex h-full">
                <div class=" z-30 m-auto bg-white p-2 rounded shadow w-1/3">
                    <h1>
                        Login
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "Login Modal",

}
</script>

<style>

</style>