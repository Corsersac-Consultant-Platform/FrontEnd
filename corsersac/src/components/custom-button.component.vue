<script lang="ts">
import {defineComponent, type InputHTMLAttributes} from 'vue'

export default defineComponent({
  name: "custom-button",
  props: {
    text: {
      type: String,
      default: 'Click me'
    },
    onClick: {
      type: Function as unknown as () => InputHTMLAttributes["onClick"],
      default: () => {}
    }
  },
})
</script>

<template>
  <button @click="onClick" class="bg-black-alpha-90  lg:text-base border-transparent text-white font-bold py-3 px-4 ">
    {{text}}
  </button>
</template>

<style scoped>
  button{
    border-radius: 0.50rem;
  }
</style>