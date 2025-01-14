<script lang="ts">
import {defineComponent, type InputHTMLAttributes} from 'vue'

export default defineComponent({
  name: "custom-input-text",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String as () => InputHTMLAttributes["type"],
      default: "text",
    },
    value: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
})
</script>

<template>
  <div class="form-group">
     <label class="text-white font-semibold">{{label}}</label>
    <input :type="type" :value="value" :placeholder="placeholder" />
  </div>
</template>

<style scoped>
  .form-group{
    margin-bottom: 1rem;
  }
  label{
    display: block;
    margin-bottom: 0.5rem;
  }
  input{
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.50rem;
    background-color: white;
    color: black;
  }
</style>