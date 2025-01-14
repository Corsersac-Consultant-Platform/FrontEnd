<script setup lang="ts">
import { RouterView } from 'vue-router'
import CustomNavbar from "@/components/custom-navbar.component.vue";
</script>

<template>
  <main class="page-size">
    <CustomNavbar/>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
