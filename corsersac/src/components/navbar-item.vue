<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "navbar-item",
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <li>
    <router-link :to="to">{{label}}</router-link>
  </li>
</template>

<style scoped>

</style>