<template>
    <form>
        <div>
            <label for="account">帳號</label>
            <input v-model="account" type="text" name="account" id="account">
        </div>
        <div>
            <label for="password">密碼</label>
            <input v-model="password" type="password" name="password" id="password" :class="{ 'error-message': isShowErrorMessage }">
            <p v-if="isShowErrorMessage" class="error-message">密碼長度過短</p>
        </div>
        <button @click.prevent="onSubmit" :disabled="!formIsDirty">送出</button>
    </form>
</template>
<script setup lang="ts">
import router from '@/router';
import { computed, ref } from 'vue';
const account = ref('123456789')
const password = ref('123456789')
const isShowErrorMessage = ref(false)  
const formIsDirty = computed(() => account.value !== '' && password.value !== '')
const onSubmit = () => {
    if(password.value.length < 8) {
        isShowErrorMessage.value=true
        return
    }
    isShowErrorMessage.value=false
    router.push('/about')
}
</script>
<style scoped>
.error-message {
    color: red;
}
</style>