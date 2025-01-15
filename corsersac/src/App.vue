<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { AuthService } from '@/helpers/auth.service.ts'
import { UtilManager } from '@/utils/utilManager.ts'

const authService = new AuthService()
onMounted(() => {
  const payload = UtilManager.instance.decodeToken()
  const currentTime = new Date().getTime() / 1000
  if (payload < currentTime) {
    authService.refreshToken()
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
