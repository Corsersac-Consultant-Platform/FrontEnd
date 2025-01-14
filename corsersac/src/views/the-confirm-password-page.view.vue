<script lang="ts">
import {defineComponent} from 'vue'
import CustomButton from "@/components/custom-button.component.vue";
import CustomInputText from "@/components/custom-input-text.component.vue";
import CustomIndicator from "@/components/custom-indicator.component.vue";
import {useAuthStore} from "@/stores/auth.ts";

export default defineComponent({
  name: "the-confirm-password-page.view" ,
  components: {CustomIndicator, CustomInputText, CustomButton},
  data(){
    const authStore = useAuthStore()
    return {
      password: '',
      navigator: this.$router,
      authStore
    }
  },
  methods: {
    async submit() {
      this.navigator.push("/")
    }
  }
})
</script>

<template>
  <section class="mt-8">
    <div class="auth-card ">
      <div class="auth-card-items">
        <h1 class="text-center text-white font-semibold text-xl md:text-2xl lg:text-4xl py-5"> Ingresa nueva contraseña </h1>
        <CustomInputText label="Password" type="password" v-model="password" />
        <CustomButton text="Recuperar" :on-click="submit" />
      </div>
    </div>
    <div class="mt-7">
      <CustomIndicator title="¿Aún no estas registrado?"  on-redirect-route="/sign-up"/>
    </div>
  </section>
</template>

<style scoped>

</style>