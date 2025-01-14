<script lang="ts">
import {defineComponent} from 'vue'
import CustomButton from "@/components/custom-button.component.vue";
import CustomInputText from "@/components/custom-input-text.component.vue";
import CustomIndicator from "@/components/custom-indicator.component.vue";
import {AuthService} from "@/helpers/auth.service.ts";
import {SignUpDto} from "@/dtos/sign-up.dto.ts";

export default defineComponent({
  name: "the-register-page" ,
  components: {CustomIndicator, CustomInputText, CustomButton},
  data(){
    return {
      username: "",
      password: "",
      authService: new AuthService(),
      navigator: this.$router
    }
  },
  methods: {
    async signUp(){
      const signUpRequest = new SignUpDto(this.username, this.password);
      await this.authService.signUp(signUpRequest).then(
          response => {
             if (response.status === 200){
                alert("Usuario registrado correctamente");
                this.navigator.push("/");
             }
          }
      ).catch(
          _ => {
            alert("Error al registrar usuario");
          }
      )
    }
  }
})
</script>

<template>
  <section>
    <div class="auth-card ">
      <div class="auth-card-items">
        <h1 class="text-center text-white font-semibold text-xl md:text-2xl lg:text-4xl py-5"> Registra tu cuenta </h1>
        <CustomInputText v-model="username" label="Username" type="text" />
        <CustomInputText v-model="password" label="Password" type="password" />
        <CustomButton @onEvent="signUp" text="Registrate" />
      </div>
    </div>
    <div class="mt-7">
      <CustomIndicator title="¿Ya estas registrado?"  on-redirect-route="/"/>
    </div>
  </section>
</template>

<style scoped>
section{
  margin-top: 150px;
}
</style>