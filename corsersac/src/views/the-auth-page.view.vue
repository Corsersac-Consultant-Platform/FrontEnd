<script lang="ts">
import {defineComponent} from 'vue'
import CustomInputText from "@/components/custom-input-text.component.vue";
import CustomIndicator from "@/components/custom-indicator.component.vue";
import CustomButton from "@/components/custom-button.component.vue";
import {SignInDto} from "@/dtos/sign-in.dto.ts";
import {AuthService} from "@/helpers/auth.service.ts";
import {Toast as PvToast} from "primevue";

export default defineComponent({
  name: "the-auth-page",
  components: {PvToast, CustomButton, CustomIndicator, CustomInputText},
  data(){
    return {
      username: "",
      password: "",
      authService: new AuthService(),
      navigator: this.$router
    }
  },
  methods: {
    async signIn(){
      const signInRequest = new SignInDto(this.username, this.password);
      await this.authService.signIn(signInRequest).then(
         response => {
            if (response.status === 200){
              this.navigator.push("/invoice-options");
              this.$toast.add({ severity: 'success', summary: 'Inicio de sesión exitoso', detail: 'Bienvenido al sistema de corsersac', life: 3000 });
            }
         }
      ).catch(
       _ => {
         this.$toast.add({ severity: 'error', summary: 'Credenciales incorrectas', detail: 'Por favor, revise sus datos y vuelva a intentar', life: 3000 });
        }
      )
    }
  }
})
</script>

<template>
  <section>
         <div class="auth-card">
           <div class="auth-card-items">
             <h1 class="text-center text-white font-semibold text-xl md:text-2xl lg:text-4xl py-5"> Inicio de Sesión </h1>
             <CustomInputText v-model="username"  label="Username" type="text" />
             <CustomInputText v-model="password"  label="Password" type="password" />
              <CustomButton text="Iniciar Sesión" @onEvent="signIn" />
              <router-link to="/recover-password">
                <p class="text-white font-medium mt-4"> ¿Perdiste tu contraseña?</p>
              </router-link>
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