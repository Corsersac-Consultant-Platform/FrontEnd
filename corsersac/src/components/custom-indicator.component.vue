<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "custom-indicator",
  props:{
    title: String,
    onRedirectRoute: {
      type: [String, Object],
      required: true,
    }
  }
})
</script>

<template>
  <router-link :to="onRedirectRoute" class="text-white">
    <div class="flex items-center justify-content-center w-full" >
      <hr class="flex-grow border-2 border-white" />
      <p class="mx-3 font-bold text-lg text-center">{{ title }}</p>
      <hr class="flex-grow border-2 border-white" />
    </div>
  </router-link>
</template>

<style scoped>

</style>