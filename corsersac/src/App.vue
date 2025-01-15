<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { AuthService } from '@/helpers/auth.service.ts'
import { UtilManager } from '@/utils/utilManager.ts'

const authService = new AuthService()
onMounted(async () => {
  const payload = UtilManager.instance.decodeToken();
  const currentTime = new Date().getTime() / 1000;
  const refreshThreshold = payload.exp - 600;

  if (currentTime > refreshThreshold) {
    await authService.refreshToken();
  }

})

</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
