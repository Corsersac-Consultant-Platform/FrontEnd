<script lang="ts">
import { defineComponent, type InputHTMLAttributes } from 'vue';

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
    modelValue: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
  methods: {
    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      this.$emit('update:modelValue', input.value);
    },
  },
});
</script>

<template>
  <div class="form-group">
    <label class="text-white font-semibold">{{ label }}</label>
    <input
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="onInput"
    />
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.50rem;
  background-color: white;
  color: black;
}
</style>
