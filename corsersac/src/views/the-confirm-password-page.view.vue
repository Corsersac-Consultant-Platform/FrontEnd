<script lang="ts">
import {defineComponent} from 'vue'
import CustomButton from "@/components/custom-button.component.vue";
import CustomInputText from "@/components/custom-input-text.component.vue";
import CustomIndicator from "@/components/custom-indicator.component.vue";
import {useAuthStore} from "@/stores/auth.ts";
import {UserService} from "@/helpers/user.service.ts";
import {Toast as PvToast} from "primevue";

export default defineComponent({
  name: "the-confirm-password-page.view" ,
  components: {PvToast, CustomIndicator, CustomInputText, CustomButton},
  data(){
    const authStore = useAuthStore()
    return {
      password: '',
      navigator: this.$router,
      authStore,
      userService:  new UserService(),
      userId: 0
    }
  },
  methods: {
    async submit() {
       await this.updatePassword();
    },
    async getUserId() {
      const response = await this.userService.getUserIdByUsername(this.authStore.username)
      this.userId = response.data;
    },
    async updatePassword() {
      console.log(this.password)
      await this.userService.updatePassword(this.userId, this.password).then(() => {
        this.navigator.push("/")
      }).catch(() => {
        this.$toast.add({ severity: 'error', summary: 'Contraseña no valida', detail: 'Contraseña no valida, recuerde que la contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial', life: 3000 });
      })
    }
  },
  mounted() {
    if (this.authStore.username === '') {
      this.navigator.push("/recover-password")
    }
    this.getUserId()
 }
})
</script>

<template>
  <section>
    <div class="auth-card ">
      <div class="auth-card-items">
        <h1 class="text-center text-white font-semibold text-xl md:text-2xl lg:text-4xl py-5"> Ingresa nueva contraseña </h1>
        <CustomInputText label="Password" type="password" v-model="password" />
        <CustomButton text="Recuperar" @onEvent="updatePassword" />
      </div>
    </div>
    <div class="mt-7">
      <CustomIndicator title="¿Aún no estas registrado?"  on-redirect-route="/sign-up"/>
    </div>
    <pv-toast/>
  </section>
</template>

<style scoped>
section{
  margin-top: 150px;
}
</style>