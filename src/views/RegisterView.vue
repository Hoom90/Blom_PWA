<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import router from '../router';
import store from '../store';
import serverURL from '../router/serverAddress'
import rightSvg from '../components/rightSvg.vue'
import leftSvg from '../components/leftSvg.vue'
import logo from '../components/logo2Svg.vue'

const LIBRARY_URL = serverURL + "/library/images/";
const user = { username: '', phone: '' }
const usernameError = ref(false)
const phoneError = ref(false)
const usernameIsEmpty = ref(true)
const phoneIsEmpty = ref(true)

let submitted = false
const loading = ref(false)
const successful = ref(false)
const errorMessage = ref(null)

const loggedIn = computed(() =>{
  return store.state.auth.status.loggedIn;
})
onMounted(() => {
  if(loggedIn.value) {
    router.push('/profile')
  }
})
const register = () => {
  if (user.username == '') {
    usernameError.value = true
    document.querySelector("input[name=username]").classList.add("border-red-500")
  }
  if (user.phone == '') {
    phoneError.value = true
    document.querySelector("input[name=phone]").classList.add("border-red-500")
  }
  else {
    submitted = true;
    loading.value = true;
    if(user.username != '' && user.phone != ''){
        store.dispatch('auth/register', user).then(
          () => {
            successful.value = true;
            loading.value = false;
            router.push('/profile')
          },
          error => {
            // message = (error.response && error.response.data) || error.message || error.toString()
            if(error.toString() === 'Error: Uesrname or Phonenumber Is Used!'){
              errorMessage.value = 'نام کاربری یا شماره تلفن استفاده شده است!'
            }
            if(error.toString() === 'Error: An error has occurred. Please try again later.'){
              errorMessage.value = 'مشکلی برامون پیش اومد. دوباره تلاش کنید.'
            }
          }
        ),
        usernameError.value = false
        phoneError.value = false
      }
      loading.value = false
    }
}

const authorizeInput = () => {
  if (user.username) {
    usernameIsEmpty.value = false
  }
  if (user.phone) {
    phoneIsEmpty.value = false
  }
  if(!user.username){
    usernameIsEmpty.value = true
  }
  if(!user.phone){
    phoneIsEmpty.value = true
  }
  if (document.querySelector("input[name=username]").classList.contains("border-red-500") && user.username != '') {
    document.querySelector("input[name=username]").classList.remove("border-red-500")
    usernameError.value = false
  }
  if (document.querySelector("input[name=phone]").classList.contains("border-red-500") && user.phone != '') {
    document.querySelector("input[name=phone]").classList.remove("border-red-500")
    phoneError.value = false
  }
}

</script>

<template>
  <div class="max-w-[400px] w-full relative">
    <leftSvg class="absolute -top-10 left-0 max-w-[100px] opacity-40"></leftSvg>
    <rightSvg class="absolute top-0 right-0 max-w-[100px] opacity-40"></rightSvg>
  </div>
  <div class="flex flex-col justify-center items-center h-[90svh]" @change="authorizeInput">
    <div class="max-w-[400px] w-full flex flex-col gap-2 p-2">
      

      <div class="text-center flex flex-col">
        <logo></logo>
        <div class="flex flex-col">
          <span class="text-[40px] text-[#49B779] font-bold">ثبت نام</span>
          <span class="text-[20px]">به بلوم خوش اومدی! </span>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center gap-[24px]">
        <div class="flex flex-col gap-1 max-w-[300px] w-full">
          <div class="relative w-full">
            <input type="text" name="username" class="w-full border rounded px-2 p-2 focus:border-[#49b779] focus:outline-none" v-model="user.username">
            <span v-if="usernameIsEmpty" class="floating-label">نام کاربری</span>
          </div>
          <div class="flex gap-1 text-[#AC0202]" v-if="usernameError">
              <i fill="currentcolor">
                <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                    fill="currentcolor" />
                </svg>
              </i>
              <span class="text-[12px]">وارد کردن نام کاربری الزامی است</span>
          </div>
        </div>
        <div class="flex flex-col gap-1 max-w-[300px] w-full">
          <div class="relative w-full">
            <input type="text" name="phone" class="w-full border rounded px-2 p-2 focus:border-[#49b779] focus:outline-none" v-model="user.phone">
            <span v-if="phoneIsEmpty" class="floating-label">شماره تماس</span>
          </div>
          <div class="flex gap-1 text-[#AC0202]" v-if="phoneError">
              <i fill="currentcolor">
                <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                    fill="currentcolor" />
                </svg>
              </i>
              <span class="text-[12px]">وارد کردن شماره تماس الزامی است</span>
          </div>
        </div>
        <button type="button" v-on:click="register()" class="bg-[#49B779] font-bold rounded text-white max-w-[300px] w-full px-2 p-2">ثبت نام</button>
      </div>

    </div>
  </div>

  <div v-if="loading" class="absolute top-0 left-0 w-full bg-[#fffe]">
    <div class="h-[90vh] flex flex-col gap-[10px] text-blue-500 items-center justify-center">
      <span class="text-[20px] font-bold">
         در حال بررسی....
      </span>
    </div>
  </div>

  <div v-if="errorMessage" class="absolute top-0 left-0 w-full bg-[#fffe]">
    <div class="h-[90vh] flex flex-col gap-[10px] text-red-500 items-center justify-center">
      <span class="text-[20px] font-bold">
        {{ errorMessage }}
      </span>
      <RouterLink to="/login" class="bg-blue-500 rounded text-white w-[100px] px-2 p-1 text-center" @click="() => {errorMessage = null}">فهمیدم</RouterLink>
    </div>
  </div>

  <div v-if="successful" class="absolute top-0 left-0 w-full bg-[#fffe]">
    <div class="h-[90vh] flex flex-col gap-[10px] text-blue-500 items-center justify-center">
      <span class="text-[20px] font-bold">
        تبریک میگم شما الان یه بلومی هستین!
      </span>
      <RouterLink to="/login" class="bg-blue-500 rounded text-white w-[100px] px-2 p-1 text-center" @click="() => {successful=false}">ورود به پنل</RouterLink>
    </div>
  </div>
</template>