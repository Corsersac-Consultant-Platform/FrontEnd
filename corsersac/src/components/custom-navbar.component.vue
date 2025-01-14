<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "custom-navbar"
})
</script>

<template>
  <nav class="bg-white flex justify-content-between p-2">
    <img src="../assets/corsersac-logo.webp" alt="Corsersac Logo" class=" w-2 lg:w-3" />
    <ul class="flex gap-5 text-2xl mr-3 ">
      <li><a class="text-black-alpha-90" href="/">Home</a></li>
      <li><a class="text-black-alpha-90" href="/about">About</a></li>
      <li><a class="text-black-alpha-90" href="/contact">Contact</a></li>
    </ul>
  </nav>
</template>

<style scoped>

</style>