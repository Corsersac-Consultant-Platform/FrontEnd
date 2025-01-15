<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "search-option",
  props: {
    title: {
      type: String,
      required: true
    },
    onRedirectRoute: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String
    }
  }
})
</script>

<template>
  <figure
      class="flex flex-column justify-content-center align-items-center bg-white p-4 h-12rem lg:h-15rem w-15rem lg:w-20rem rounded-lg shadow-lg hover:shadow-xl transition-shadow"
  >
    <div
        class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-blue-500"
    >
      <img :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
    </div>
    <router-link :to="onRedirectRoute" class="mt-4 text-center">
      <h3
          class="text-black-alpha-90 font-semibold text-sm sm:text-base md:text-lg lg:text-xl hover:text-blue-500"
      >
        {{ title }}
      </h3>
    </router-link>
  </figure>
</template>

<style scoped>
figure{
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
  height: 150px;
}
figure:hover{
  transform: scale(1.1);
}
h3{
  transition: all 0.3s;
}
</style>