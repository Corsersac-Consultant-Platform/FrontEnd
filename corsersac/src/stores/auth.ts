import {defineStore} from "pinia";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', () => {
    const username = ref("")
    function setUsername(name: string) {
        username.value = name
    }

    function getUsername() {
        return username.value
    }

    function resetUsername() {
        username.value = ""
    }

    return { username, setUsername }
})
