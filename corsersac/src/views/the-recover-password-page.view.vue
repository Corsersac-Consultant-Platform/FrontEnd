<script lang="ts">
import {defineComponent} from 'vue'
import CustomButton from "@/components/custom-button.component.vue";
import CustomInputText from "@/components/custom-input-text.component.vue";
import CustomIndicator from "@/components/custom-indicator.component.vue";
import {useAuthStore} from "@/stores/auth.ts";

export default defineComponent({
  name: "the-recover-password-page" ,
  components: {CustomIndicator, CustomInputText, CustomButton},
  data(){
    const authStore = useAuthStore()
    return {
      username: '',
      navigator: this.$router,
      authStore
    }
  },
  methods: {
    async submit() {
      this.authStore.setUsername(this.username)
      this.navigator.push("/confirm-password")
    }
  }
})
</script>

<template>
  <section class="mt-8">
    <div class="auth-card ">
      <div class="auth-card-items">
        <h1 class="text-center text-white font-semibold text-xl md:text-2xl lg:text-4xl py-5"> Ingresa tu nombre de usuario </h1>
        <CustomInputText label="Username" type="text" v-model="username" />
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