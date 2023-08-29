<script setup>
import { computed, onMounted, ref } from 'vue'
import router from '../router';
import store from '../store';
import leftSvg from '../components/leftSvg.vue'
import rightSvg from '../components/rightSvg.vue'
import logo from '../components/logo2svg.vue';

const user = { username: '', phone: '' }
const phoneError = ref(false)
const phoneIsEmpty = ref(true)

const loading = ref(false)
const errorMessage = ref(null)
const openError = ref(false)

const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn;
})

onMounted(() => {
  if (loggedIn.value) {
    router.push('/');
  }
})

const login = () => {
  if (user.phone == '') {
    phoneError.value = true
    document.querySelector("input[name=phone]").classList.add("border-red-500")
  }
  else {
    loading.value = true;
    if (user.phone) {
      store.dispatch('auth/login', user).then(
        () => {
          loading.value = false;
          router.push('/');
        },
        error => {
          if (error.toString() === 'Error: Phonenumber Not Found!') {
            register()
          }
          if (error.toString() === "Error: An error has occurred. Please try again later.") {
            errorMessage.value = 'مشکلی برامون پیش اومد. دوباره تلاش کنید.'
          }
          loading.value = false;
        }
      );
    }
  }
}

const register = () => {
  if (user.phone == '') {
    phoneError.value = true
    document.querySelector("input[name=phone]").classList.add("border-red-500")
  }
  else {
    loading.value = true;
    if (user.phone) {
      store.dispatch('auth/register', user).then(
        () => {
          loading.value = false;
          router.push('/')
        },
        error => {
          if (error.toString() === 'Error: An error has occurred. Please try again later.') {
            errorMessage.value = 'مشکلی برامون پیش اومد. دوباره تلاش کنید.'
          }
        }
      ),
        phoneError.value = false
    }
    loading.value = false
  }
}

const authorizeInput = () => {
  if (user.phone) {
    phoneIsEmpty.value = false
  }
  if (!user.phone) {
    phoneIsEmpty.value = true
  }
  if (document.querySelector("input[name=phone]").classList.contains("border-red-500") && user.phone != '') {
    document.querySelector("input[name=phone]").classList.remove("border-red-500")
    phoneError.value = false
  }
}

const userNeed = ref(false)
const openAlert = ref(false)
const clickCounter = () => {
  if (!openAlert.value) {
    if(!userNeed.value){
      userNeed.value = true
    }
    openAlert.value = true
  }
}

</script>

<template>
  <div class="h-[100svh] max-w-[500px] w-full relative">
    <!-- bg images -->
    <div class="max-w-[400px] w-full relative">
      <leftSvg class="absolute -top-10 transform -scale-x-100 opacity-40"></leftSvg>
      <rightSvg class="absolute top-0 left-0 transform -scale-x-100 opacity-40"></rightSvg>
    </div>

    <!-- main -->
    <div class="max-w-[400px] h-[100svh] w-full flex flex-col justify-between gap-2 p-2">


      <div class="flex flex-col justify-center items-center mt-[100px]">
        <logo></logo>
        <div class=" flex flex-col">
          <span class="text-[#49B779] text-[30px]">ورود / ثبت نام</span>
          <span class="text-[12px]">به سرزمین شکوفه ها خوش اومدی</span>
        </div>
      </div>

      <div class="flex flex-col gap-5" @change="authorizeInput">
        <div class="flex flex-col justify-center items-center gap-[24px]">
          <div class="flex flex-col gap-1 max-w-[300px] w-full">
            <button class="relative w-full flex justify-center items-center bg-[#f6f6f6] p-2 rounded gap-1"
              @click="clickCounter">
              <i>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px"
                  viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
                  <image id="image0" width="24" height="24" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                  AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAAD/QCD/Syf/Syb/
                  SybZPiHaPyHXPiDXQCD/SST/Sib/SibbQCLdRCL/SCj/TCbZPyH/SybZQSH/SyX/TCf/TCTXQCDY
                  QCDXQCD/pwz/Syb/TCTfQCDZPyH/2wD/1AD/gxb/SCD/1AD/Yx7/1QD/1QD/1AD/0wAVfeQXfuf/
                  1QAWfuUWfuYWfub/1QD/1AAWfub/1AD/1QAOgPEXfuQWfOUWfucWfub/1AC/yxM0tjsWfuf/2wD/
                  1gDb0AoSs0cTs0cXfegWfuYWfuYMdNyJxCMSs0cTs0gAAAATgsMWfucVfuURskcStEcQskYRs0gP
                  mz4Pmj4PmT4Rk2cWfuYQr0AStEcTip4Se+UOuEcTs0cVfeYUheAQskgRskcRj4oQs0gSs0cTs0cS
                  skcPmD4PmT0Omj4QlzwZsjP/SybZPyH/XCH/xAX/1QAWfuZNuzUSs0cPmT4Pl0gVgNz///+0ZLqL
                  AAAAaXRSTlMAEHC85O2/ZyAOf/CADyDe399ev29NQHCAfOVAV9IO5PsgYF2q28+GYMDfgO731Y/V
                  lu8SQ0bysEj7cGkH7PnvNi3v3xZs9XkBePB3vt+ceXuV7/7TENb+HRKxvxlg32tAkL/f38iQQAqG
                  x4L2AAAAAWJLR0R0322obQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cIGgwnDWUvShwA
                  AAECSURBVCjPY2AgABiZmFkys1jZ2DlQhDm5uDOBIAsEeHgR4nz8mZlwiSwBuCY+wUxkiSwhmARE
                  vbCIqJg4G1BcAiYumQ0UlpKGcGRk4eJy8jkKmYKKmA5Vys3NzVHG4gMVoIQqNq+pASXUIUyNPBjQ
                  BPK0gBJKEAltuIQOLgldIE8PKKGPLmEA5BkCJYwgEsYmpkBgBpQwB/IsgBKWVgjHWIN0aAAZNrZ2
                  +QX2DjBxRyeguLMLiOlaAARu7mBhD08vkAZviCIfkEyBr59/QGBQMEg8BKo7NKwAAgqBIBxoUATM
                  3MgohERRcXQMUrjExsEkguLRgiwhMSk5JTUtPYNQsgEAuQ5h84DLlk4AAAAldEVYdGRhdGU6Y3Jl
                  YXRlADIwMjMtMDgtMjZUMTA6Mzk6MTMrMDI6MDAUW1EhAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIz
                  LTA4LTI2VDEwOjM5OjEzKzAyOjAwZQbpnQAAAABJRU5ErkJggg==" />
                </svg>
              </i>
              <span>ورود / ثبت نام با گوگل</span>
            </button>
          </div>
        </div>

        <div class="w-full bg-black border-b flex justify-center items-center px-[20px]">
          <span class="absolute bg-white px-2 text-[#c9c9c9]">یا</span>
        </div>

        <div class="flex flex-col justify-center items-center gap-5 mb-[20px]">
          <div class="flex flex-col gap-1 max-w-[300px] w-full">
            <div class="relative w-full">
              <input type="text" name="phone"
                class="w-full text-center border rounded px-2 p-2 focus:border-[#49b779] focus:outline-none"
                v-model="user.phone">
              <span v-if="phoneIsEmpty" class="floating-label">شماره موبایلتو وارد کن</span>
            </div>
          </div>
          <button type="button" v-on:click="login()"
            class="bg-[#49B779] font-bold rounded text-white max-w-[300px] w-full px-2 p-2">ورود به بلوم</button>
        </div>
      </div>

    </div>
    <!-- <div class="h-[100svh]" @change="authorizeInput">
  </div> -->

    <!-- loading handle -->
    <div v-if="loading" class="absolute top-0 left-0 w-full bg-[#fffe]">
      <div class="h-[100vh] flex gap-[10px] text-[#49b779] items-center justify-center">
        <span class="text-[20px] font-bold">
          <svg class="rotate" width="100" height="100" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <path d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
              stroke="#49b779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36"
              stroke="#ffc93d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>

    <!-- error handle -->
    <div v-if="errorMessage && openError" class="absolute top-0 left-0 w-full h-[100svh] bg-[#fffe]"
      @click="() => { openError = false }">
      <div
        class="absolute top-[50%] left-[50%] w-[250px] h-[250px] bg-[#fff] shadow-md rounded-lg px-[20px] -translate-x-[50%] -translate-y-[50%]">
        <div class="flex flex-col gap-[10px] text-[#49b779] items-center justify-center text-center h-full">
          <button class="p-3 absolute top-0 left-0 text-red-500" @click="() => { openError = false }">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                fill="currentcolor" />
            </svg>
          </button>
          <i class="text-red-500">
            <svg width="100" height="100" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.2202 21.25H5.78015C5.14217 21.2775 4.50834 21.1347 3.94373 20.8364C3.37911 20.5381 2.90402 20.095 2.56714 19.5526C2.23026 19.0101 2.04372 18.3877 2.02667 17.7494C2.00963 17.111 2.1627 16.4797 2.47015 15.92L8.69013 5.10999C9.03495 4.54078 9.52077 4.07013 10.1006 3.74347C10.6804 3.41681 11.3346 3.24518 12.0001 3.24518C12.6656 3.24518 13.3199 3.41681 13.8997 3.74347C14.4795 4.07013 14.9654 4.54078 15.3102 5.10999L21.5302 15.92C21.8376 16.4797 21.9907 17.111 21.9736 17.7494C21.9566 18.3877 21.7701 19.0101 21.4332 19.5526C21.0963 20.095 20.6211 20.5381 20.0565 20.8364C19.4919 21.1347 18.8581 21.2775 18.2202 21.25V21.25Z"
                stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M10.8809 17.15C10.8809 17.0021 10.9102 16.8556 10.9671 16.7191C11.024 16.5825 11.1074 16.4586 11.2125 16.3545C11.3175 16.2504 11.4422 16.1681 11.5792 16.1124C11.7163 16.0567 11.8629 16.0287 12.0109 16.03C12.2291 16.034 12.4413 16.1021 12.621 16.226C12.8006 16.3499 12.9398 16.5241 13.0211 16.7266C13.1023 16.9292 13.122 17.1512 13.0778 17.3649C13.0335 17.5786 12.9272 17.7745 12.7722 17.9282C12.6172 18.0818 12.4203 18.1863 12.2062 18.2287C11.9921 18.2711 11.7703 18.2494 11.5685 18.1663C11.3666 18.0833 11.1938 17.9426 11.0715 17.7618C10.9492 17.5811 10.8829 17.3683 10.8809 17.15ZM11.2409 14.42L11.1009 9.20001C11.0876 9.07453 11.1008 8.94766 11.1398 8.82764C11.1787 8.70761 11.2424 8.5971 11.3268 8.5033C11.4112 8.40949 11.5144 8.33449 11.6296 8.28314C11.7449 8.2318 11.8697 8.20526 11.9959 8.20526C12.1221 8.20526 12.2469 8.2318 12.3621 8.28314C12.4774 8.33449 12.5805 8.40949 12.6649 8.5033C12.7493 8.5971 12.8131 8.70761 12.852 8.82764C12.8909 8.94766 12.9042 9.07453 12.8909 9.20001L12.7609 14.42C12.7609 14.6215 12.6808 14.8149 12.5383 14.9574C12.3957 15.0999 12.2024 15.18 12.0009 15.18C11.7993 15.18 11.606 15.0999 11.4635 14.9574C11.321 14.8149 11.2409 14.6215 11.2409 14.42Z"
                fill="currentcolor" />
            </svg>
          </i>
          <span>{{ errorMessage }}</span>
        </div>
      </div>
    </div>

    <!-- google click handle -->
    <div v-if="userNeed && openAlert" class="absolute top-0 left-0 w-full h-[100svh] bg-[#fffe]"
      @click="() => { openAlert = false }">
      <div
        class="absolute top-[50%] left-[50%] w-[250px] h-[250px] bg-[#fff] shadow-md rounded-lg px-[20px] -translate-x-[50%] -translate-y-[50%]">
        <div class="flex flex-col gap-[10px] text-[#49b779] items-center justify-center text-center h-full">
          <button class="p-3 absolute top-0 left-0 text-red-500" @click="() => { openAlert = false }">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                fill="currentcolor" />
            </svg>
          </button>
          <i class="text-yellow-500">
            <svg width="100" height="100" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8809 16.15C10.8809 16.0021 10.9101 15.8556 10.967 15.7191C11.024 15.5825 11.1073 15.4586 11.2124 15.3545C11.3175 15.2504 11.4422 15.1681 11.5792 15.1124C11.7163 15.0567 11.8629 15.0287 12.0109 15.03C12.2291 15.034 12.4413 15.1021 12.621 15.226C12.8006 15.3499 12.9399 15.5241 13.0211 15.7266C13.1024 15.9292 13.122 16.1512 13.0778 16.3649C13.0335 16.5786 12.9272 16.7745 12.7722 16.9282C12.6172 17.0818 12.4204 17.1863 12.2063 17.2287C11.9922 17.2711 11.7703 17.2494 11.5685 17.1663C11.3666 17.0833 11.1938 16.9426 11.0715 16.7618C10.9492 16.5811 10.8829 16.3683 10.8809 16.15ZM11.2408 13.42L11.1008 8.20001C11.0875 8.07453 11.1008 7.94766 11.1398 7.82764C11.1787 7.70761 11.2424 7.5971 11.3268 7.5033C11.4112 7.40949 11.5144 7.33449 11.6296 7.28314C11.7449 7.2318 11.8697 7.20526 11.9958 7.20526C12.122 7.20526 12.2468 7.2318 12.3621 7.28314C12.4773 7.33449 12.5805 7.40949 12.6649 7.5033C12.7493 7.5971 12.813 7.70761 12.8519 7.82764C12.8909 7.94766 12.9042 8.07453 12.8909 8.20001L12.7609 13.42C12.7609 13.6215 12.6809 13.8149 12.5383 13.9574C12.3958 14.0999 12.2024 14.18 12.0009 14.18C11.7993 14.18 11.606 14.0999 11.4635 13.9574C11.321 13.8149 11.2408 13.6215 11.2408 13.42Z"
                fill="currentcolor" />
              <path
                d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z"
                stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
          <span>این سرویس به زودی در دسترس خواهد بود</span>
        </div>
      </div>
    </div>

  </div>
</template>