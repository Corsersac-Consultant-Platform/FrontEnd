<script lang="ts">
import {defineComponent} from 'vue'
import CustomButton from "@/components/custom-button.component.vue";
import CustomInputText from "@/components/custom-input-text.component.vue";
import CustomIndicator from "@/components/custom-indicator.component.vue";

export default defineComponent({
  name: "the-register-page" ,
  components: {CustomIndicator, CustomInputText, CustomButton},
  data(){
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    async signUp(){

    }
  }
})
</script>

<template>
  <section class="mt-8">
    <div class="auth-card ">
      <div class="auth-card-items">
        <h1 class="text-center text-white font-semibold text-xl md:text-2xl lg:text-4xl py-5"> Registra tu cuenta </h1>
        <CustomInputText v-model="username" label="Username" type="text" />
        <CustomInputText v-model="password" label="Password" type="password" />
        <CustomButton :on-click="signUp" text="Registrate" />
      </div>
    </div>
    <div class="mt-7">
      <CustomIndicator title="¿Ya estas registrado?"  on-redirect-route="/"/>
    </div>
  </section>
</template>

<style scoped>

</style>