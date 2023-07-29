<script setup>
import {ref} from 'vue'
import { RouterLink} from 'vue-router'
import cities from '../cities.json'
// stage 1
const plantHealth = ref('')
const plantName = ref('')
const plantRot = ref('')
const carePackage = ref('')
const month = ref('')
const monthlyCost = ref()
const damageCost = ref()
const userBasket = ref()
const stage = ref(true)

// stage 2
const plantData = ref('')
const basket = ref('')
plantData.value = {
  name: 'برگ انجیری',
  health: '80',
}
basket.value = {
  title: 'گلبرگ',
  price: 30000,
  timeLaps: 3,
  damageSupport: 360000,
}

const phoneError = ref(false)
const nameError = ref(false)
const cityError = ref(false)
const userData = ref({
  name: '',
  city: '',
  phone: '',
  creditCard: '',
});


const activeService = () => {
  if (userData.value.name == '') {
    nameError.value = true
    document.getElementById("nameInput").classList.add("border-red-500")
  }
  if (userData.value.city == '') {
    cityError.value = true
    document.getElementById("cityInput").classList.add("border-red-500")
  }
  if (userData.value.phone == '') {
    phoneError.value = true
    document.getElementById("phoneInput").classList.add("border-red-500")
  }
  else {
    //send to me
    console.log(200);
    nameError.value = false
    cityError.value = false
    phoneError.value = false
  }
}

const authorizeInput = () => {
  if (document.getElementById("nameInput").classList.contains("border-red-500") && userData.value.name != '') {
    document.getElementById("nameInput").classList.remove("border-red-500")
    nameError.value = false
  }
  if (document.getElementById("cityInput").classList.contains("border-red-500") && userData.value.city != '') {
    document.getElementById("cityInput").classList.remove("border-red-500")
    cityError.value = false
  }
  if (document.getElementById("phoneInput").classList.contains("border-red-500") && userData.value.phone != '') {
    document.getElementById("phoneInput").classList.remove("border-red-500")
    phoneError.value = false
  }
}


plantHealth.value = 80
plantName.value = 'گیاه برگ انجیری'
plantRot.value = 200 - plantHealth.value
carePackage.value = {
  name: "گلبرگ",
  price: 10000
}
month.value = 1
monthlyCost.value = (carePackage.value.price * plantRot.value) / 100
damageCost.value = monthlyCost.value * 10
userBasket.value = monthlyCost.value * 3

const setPackage = (number) => {
  switch (number) {
    case 1:
      carePackage.value = {
        name: "گلستان",
        price: 30000
      }
      document.querySelector('button[name=pak1]').classList.replace('border-grey-500','border-[#49b779]')
      document.querySelector('button[name=pak2]').classList.replace('border-[#49b779]','border-grey-500')
      document.querySelector('button[name=pak3]').classList.replace('border-[#49b779]','border-grey-500')
      break;
    case 2:
      carePackage.value = {
        name: "گلدان",
        price: 20000
      }
      document.querySelector('button[name=pak2]').classList.replace('border-grey-500','border-[#49b779]')
      document.querySelector('button[name=pak1]').classList.replace('border-[#49b779]','border-grey-500')
      document.querySelector('button[name=pak3]').classList.replace('border-[#49b779]','border-grey-500')
      break;
    case 3:
      carePackage.value = {
        name: "گلبرگ",
        price: 10000
      }
      document.querySelector('button[name=pak3]').classList.replace('border-grey-500','border-[#49b779]')
      document.querySelector('button[name=pak2]').classList.replace('border-[#49b779]','border-grey-500')
      document.querySelector('button[name=pak1]').classList.replace('border-[#49b779]','border-grey-500')
      break;
  }
  calculator()
}

const setMonth = (e) => {
  month.value = e.target.value
}

const calculator = () => {
  monthlyCost.value = (carePackage.value.price * plantRot.value) / 100
  damageCost.value = monthlyCost.value * 10
  userBasket.value = monthlyCost.value * month.value
}

</script>
<template>
  <div class="flex h-[90svh] flex-col gap-[30px] justify-center items-center p-[20px] mt-[50px] mb-[100px]">

    <div id="steps" class="flex justify-center items-center">
      <div v-if="stage" class="px-2 bg-[#f6f6f6] rounded-full text-[#adadad] font-bold">2</div>
      <div v-else class="px-2 bg-[#49B779] rounded-full text-white font-bold">2</div>
      <div class="h-[1px] w-[20px] bg-[#c9c9c9]"></div>
      <div class="px-2 bg-[#49B779] rounded-full text-white font-bold">1</div>
    </div>

    <div v-if="stage" @input="calculator" class="max-w-[400px] w-full">

      <div id="header" class="flex justify-between p-[20px] bg-[#f6f6f6] rounded-t-[20px]">
        <div id="name" class="flex items-center justify-center w-full text-[25px]">{{ plantName }}</div>
        <div id="health" class="flex flex-col">
          <div class="text-[30px] text-[#49B779]">{{ plantHealth }}%</div>
          <div class="text-[12px] flex justify-center text-[#adadad]">سلامت گل</div>
        </div>
      </div>

      <div id="content" class="p-[20px] border border-[#f6f6f6] flex flex-col gap-[10px]">

        <div id="share" class="flex flex-col gap-[20px]">
          <span>اشتراک مورد نظر خود را انتخاب کنید</span>
          <div id="cards" class="flex justify-around gap-[5px] items-center flex-wrap">

            <button class="bg-[#f6f6f6] rounded p-[10px] h-[80px] border border-grey-500" name="pak1" @click="setPackage(1)">
              <div class="flex justify-center items-center">
                <svg width="46" height="29" viewBox="0 0 46 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M35.8642 10.436C36.3541 11.9336 36.3939 13.5394 35.9788 15.0589C35.5637 16.5783 34.7116 17.9464 33.5256 18.9973C32.3395 20.0481 30.8705 20.7368 29.2963 20.9799C27.7222 21.2229 26.1105 21.01 24.6563 20.3667L23.4101 22.4989C23.2983 22.6902 23.1141 22.8298 22.8981 22.887C22.6821 22.9442 22.452 22.9142 22.2583 22.8038C22.0647 22.6933 21.9233 22.5114 21.8655 22.2981C21.8076 22.0847 21.8379 21.8573 21.9497 21.666L23.1959 19.5339C21.9049 18.6115 20.9123 17.3392 20.3384 15.8711C19.7644 14.4029 19.6336 12.8019 19.9619 11.2618C20.2903 9.72175 21.0636 8.30875 22.1882 7.19393C23.3128 6.0791 24.7405 5.31028 26.2984 4.98055L31.7125 3.83656C32.223 3.72846 32.756 3.81139 33.2082 4.06929C33.6604 4.32718 33.9996 4.74168 34.1601 5.23249L35.8642 10.436ZM29.3115 12.4021C29.4233 12.2108 29.4536 11.9834 29.3957 11.7701C29.3379 11.5567 29.1965 11.3748 29.0029 11.2643C28.8092 11.1539 28.5791 11.1239 28.3631 11.1811C28.1471 11.2383 27.9629 11.3779 27.8511 11.5692L24.045 18.0811C24.4937 18.4194 24.9845 18.6993 25.5054 18.914L29.3115 12.4021Z"
                    fill="#81E7AD" />
                  <path
                    d="M40.9187 17.7575C40.5849 19.2964 39.8066 20.7067 38.678 21.8177C37.5494 22.9286 36.119 23.6924 34.5599 24.0167C33.0008 24.341 31.38 24.2119 29.8937 23.6449C28.4074 23.0779 27.1194 22.0975 26.1857 20.8222L24.0272 22.0532C23.8335 22.1637 23.6034 22.1936 23.3874 22.1364C23.1714 22.0793 22.9872 21.9397 22.8754 21.7484C22.7636 21.5571 22.7333 21.3297 22.7912 21.1164C22.8491 20.903 22.9904 20.7211 23.184 20.6106L25.3425 19.3796C24.6914 17.9432 24.4758 16.3511 24.7218 14.7962C24.9679 13.2412 25.6651 11.7901 26.7289 10.6185C27.7928 9.44696 29.1777 8.6052 30.716 8.19519C32.2542 7.78518 33.8798 7.82451 35.3959 8.30841L40.6636 9.9917C41.1605 10.1502 41.5801 10.4853 41.8412 10.932C42.1023 11.3787 42.1862 11.9052 42.0768 12.4095L40.9187 17.7575ZM34.2487 16.2238C34.4424 16.1134 34.5837 15.9314 34.6416 15.7181C34.6995 15.5047 34.6692 15.2774 34.5573 15.0861C34.4455 14.8948 34.2614 14.7552 34.0454 14.698C33.8294 14.6408 33.5992 14.6707 33.4055 14.7812L26.8132 18.5409C27.0306 19.0554 27.314 19.5402 27.6564 19.9835L34.2487 16.2238Z"
                    fill="#49B779" />
                  <path
                    d="M17.3368 5.26982C16.1545 6.32482 15.3072 7.6958 14.8976 9.21672C14.4879 10.7376 14.5334 12.3433 15.0286 13.8391C15.5238 15.335 16.4475 16.657 17.6877 17.645C18.9279 18.633 20.4315 19.2445 22.0164 19.4057V21.8677C22.0164 22.0886 22.1052 22.3005 22.2634 22.4567C22.4215 22.6129 22.636 22.7006 22.8596 22.7006C23.0832 22.7006 23.2977 22.6129 23.4558 22.4567C23.6139 22.3005 23.7028 22.0886 23.7028 21.8677V19.4057C25.2877 19.2445 26.7913 18.633 28.0315 17.645C29.2717 16.657 30.1953 15.335 30.6905 13.8391C31.1857 12.3433 31.2313 10.7376 30.8216 9.21672C30.412 7.6958 29.5647 6.32482 28.3824 5.26982L24.2727 1.60509C23.8853 1.2593 23.3817 1.06787 22.8596 1.06787C22.3374 1.06787 21.8339 1.2593 21.4464 1.60509L17.3368 5.26982ZM22.0164 10.2089C22.0164 9.98798 22.1052 9.77613 22.2634 9.61993C22.4215 9.46373 22.636 9.37598 22.8596 9.37598C23.0832 9.37598 23.2977 9.46373 23.4558 9.61993C23.6139 9.77613 23.7028 9.98798 23.7028 10.2089V17.7282C23.143 17.7995 22.5762 17.7995 22.0164 17.7282V10.2089Z"
                    fill="#49B779" />
                  <path
                    d="M10.097 10.436C9.60711 11.9336 9.56729 13.5394 9.98236 15.0589C10.3974 16.5783 11.2496 17.9464 12.4356 18.9973C13.6217 20.0481 15.0907 20.7368 16.6649 20.9799C18.239 21.2229 19.8507 21.01 21.3049 20.3667L22.5511 22.4989C22.6629 22.6902 22.847 22.8298 23.063 22.887C23.2791 22.9442 23.5092 22.9142 23.7029 22.8038C23.8965 22.6933 24.0378 22.5114 24.0957 22.2981C24.1536 22.0847 24.1233 21.8573 24.0115 21.666L22.7653 19.5339C24.0563 18.6115 25.0488 17.3392 25.6228 15.8711C26.1968 14.4029 26.3275 12.8019 25.9992 11.2618C25.6709 9.72175 24.8976 8.30875 23.773 7.19393C22.6484 6.0791 21.2207 5.31028 19.6628 4.98055L14.2487 3.83656C13.7382 3.72846 13.2052 3.81139 12.753 4.06929C12.3008 4.32718 11.9616 4.74168 11.801 5.23249L10.097 10.436ZM16.6497 12.4021C16.5379 12.2108 16.5076 11.9834 16.5654 11.7701C16.6233 11.5567 16.7646 11.3748 16.9583 11.2643C17.152 11.1539 17.3821 11.1239 17.5981 11.1811C17.8141 11.2383 17.9983 11.3779 18.1101 11.5692L21.9162 18.0811C21.4675 18.4194 20.9767 18.6993 20.4558 18.914L16.6497 12.4021Z"
                    fill="#81E7AD" />
                  <path
                    d="M5.04201 17.7575C5.3758 19.2964 6.15412 20.7067 7.28271 21.8177C8.41129 22.9286 9.84173 23.6924 11.4008 24.0167C12.9599 24.341 14.5807 24.2119 16.067 23.6449C17.5533 23.0779 18.8413 22.0975 19.775 20.8222L21.9335 22.0532C22.1271 22.1637 22.3573 22.1936 22.5733 22.1364C22.7893 22.0793 22.9735 21.9397 23.0853 21.7484C23.1971 21.5571 23.2274 21.3297 23.1695 21.1164C23.1116 20.903 22.9703 20.7211 22.7767 20.6106L20.6182 19.3796C21.2693 17.9432 21.4849 16.3511 21.2389 14.7962C20.9928 13.2412 20.2956 11.7901 19.2318 10.6185C18.1679 9.44696 16.783 8.6052 15.2447 8.19519C13.7065 7.78518 12.0809 7.82451 10.5648 8.30841L5.29706 9.9917C4.80018 10.1502 4.38057 10.4853 4.11949 10.932C3.85841 11.3787 3.77446 11.9052 3.88389 12.4095L5.04201 17.7575ZM11.712 16.2238C11.5183 16.1134 11.377 15.9314 11.3191 15.7181C11.2612 15.5047 11.2915 15.2774 11.4034 15.0861C11.5152 14.8948 11.6993 14.7552 11.9153 14.698C12.1313 14.6408 12.3615 14.6707 12.5552 14.7812L19.1475 18.5409C18.9301 19.0554 18.6467 19.5402 18.3043 19.9835L11.712 16.2238Z"
                    fill="#49B779" />
                </svg>
              </div>
              <span class="text-[12px] flex justify-center text-[#49B779] font-bold">گلستان</span>
              <div class="text-[8px] flex gap-1">
                <span>30.000</span>
                <span>تومان</span>
              </div>
            </button>

            <button class="bg-[#f6f6f6] rounded p-[10px] h-[80px] border border-grey-500" name="pak2" @click="setPackage(2)">
              <div class="flex justify-center items-center">
                <svg width="46" height="28" viewBox="0 0 46 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M28.416 4.50101C29.5897 5.54835 30.4308 6.90936 30.8375 8.41923C31.2442 9.9291 31.199 11.5231 30.7074 13.0081C30.2158 14.4931 29.2989 15.8055 28.0676 16.7863C26.8364 17.7671 25.3438 18.3742 23.7704 18.5342V20.9783C23.7704 21.1976 23.6822 21.4079 23.5252 21.563C23.3682 21.718 23.1553 21.8052 22.9333 21.8052C22.7113 21.8052 22.4984 21.718 22.3415 21.563C22.1845 21.4079 22.0963 21.1976 22.0963 20.9783V18.5342C20.5229 18.3742 19.0302 17.7671 17.799 16.7863C16.5678 15.8055 15.6509 14.4931 15.1593 13.0081C14.6677 11.5231 14.6225 9.9291 15.0292 8.41923C15.4358 6.90936 16.277 5.54835 17.4507 4.50101L21.5304 0.862903C21.9151 0.519632 22.415 0.32959 22.9333 0.32959C23.4517 0.32959 23.9516 0.519632 24.3362 0.862903L28.416 4.50101ZM23.7704 9.40418C23.7704 9.18489 23.6822 8.97458 23.5252 8.81952C23.3682 8.66445 23.1553 8.57734 22.9333 8.57734C22.7113 8.57734 22.4984 8.66445 22.3415 8.81952C22.1845 8.97458 22.0963 9.18489 22.0963 9.40418V16.8689C22.652 16.9397 23.2147 16.9397 23.7704 16.8689V9.40418Z"
                    fill="#49B779" />
                  <path
                    d="M40.6213 16.8979C40.2899 18.4257 39.5173 19.8257 38.3969 20.9286C37.2765 22.0314 35.8564 22.7897 34.3087 23.1117C32.7609 23.4336 31.1519 23.3054 29.6764 22.7426C28.2009 22.1797 26.9223 21.2063 25.9954 19.9404L23.8525 21.1624C23.6603 21.2721 23.4318 21.3018 23.2174 21.245C23.0029 21.1883 22.8201 21.0497 22.7091 20.8598C22.5981 20.6699 22.568 20.4442 22.6255 20.2324C22.6829 20.0205 22.8232 19.8399 23.0155 19.7303L25.1583 18.5082C24.5119 17.0823 24.2978 15.5018 24.5421 13.9581C24.7864 12.4145 25.4785 10.9739 26.5346 9.81082C27.5908 8.64775 28.9656 7.81211 30.4927 7.40508C32.0198 6.99805 33.6335 7.03709 35.1386 7.51748L40.3681 9.18853C40.8614 9.34593 41.2779 9.67856 41.5371 10.122C41.7963 10.5654 41.8796 11.0881 41.771 11.5888L40.6213 16.8979ZM33.9998 15.3754C34.192 15.2657 34.3323 15.0851 34.3898 14.8733C34.4472 14.6615 34.4172 14.4358 34.3062 14.2459C34.1952 14.056 34.0123 13.9174 33.7979 13.8606C33.5835 13.8039 33.355 13.8336 33.1627 13.9432L26.6183 17.6756C26.8341 18.1864 27.1154 18.6677 27.4553 19.1077L33.9998 15.3754Z"
                    fill="#81E7AD" />
                  <path
                    d="M5.00542 16.8979C5.33679 18.4257 6.10945 19.8257 7.22984 20.9286C8.35023 22.0314 9.77028 22.7897 11.318 23.1117C12.8658 23.4336 14.4748 23.3054 15.9503 22.7426C17.4258 22.1797 18.7044 21.2063 19.6313 19.9404L21.7742 21.1624C21.9664 21.2721 22.1949 21.3018 22.4093 21.245C22.6238 21.1883 22.8066 21.0497 22.9176 20.8598C23.0286 20.6699 23.0587 20.4442 23.0012 20.2324C22.9438 20.0205 22.8035 19.8399 22.6112 19.7303L20.4684 18.5082C21.1148 17.0823 21.3289 15.5018 21.0846 13.9581C20.8403 12.4145 20.1482 10.9739 19.0921 9.81082C18.0359 8.64775 16.6611 7.81211 15.134 7.40508C13.607 6.99805 11.9932 7.03709 10.4881 7.51748L5.25862 9.18853C4.76535 9.34593 4.34879 9.67856 4.0896 10.122C3.83042 10.5654 3.74708 11.0881 3.85572 11.5888L5.00542 16.8979ZM11.6269 15.3754C11.4347 15.2657 11.2944 15.0851 11.2369 14.8733C11.1795 14.6615 11.2095 14.4358 11.3205 14.2459C11.4315 14.056 11.6144 13.9174 11.8288 13.8606C12.0432 13.8039 12.2717 13.8336 12.464 13.9432L19.0084 17.6756C18.7926 18.1864 18.5113 18.6677 18.1714 19.1077L11.6269 15.3754Z"
                    fill="#81E7AD" />
                </svg>
              </div>
              <span class="text-[12px] flex justify-center text-[#49B779] font-bold">گلدان</span>
              <div class="text-[8px] flex gap-1">
                <span>20.000</span>
                <span>تومان</span>
              </div>
            </button>

            <button class="bg-[#f6f6f6] rounded p-[10px] h-[80px] border border-grey-500" name="pak3" @click="setPackage(3)">
              <div class="flex justify-center items-center">
                <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.6619 4.17142C14.8356 5.21876 15.6767 6.57977 16.0834 8.08964C16.4901 9.59951 16.4449 11.1935 15.9532 12.6785C15.4616 14.1635 14.5447 15.4759 13.3135 16.4567C12.0823 17.4375 10.5896 18.0446 9.01624 18.2046V20.6487C9.01624 20.868 8.92805 21.0783 8.77107 21.2334C8.6141 21.3885 8.40119 21.4756 8.17919 21.4756C7.95719 21.4756 7.74428 21.3885 7.58731 21.2334C7.43033 21.0783 7.34214 20.868 7.34214 20.6487V18.2046C5.76876 18.0446 4.27609 17.4375 3.04488 16.4567C1.81367 15.4759 0.896738 14.1635 0.405129 12.6785C-0.0864796 11.1935 -0.131679 9.59951 0.275005 8.08964C0.681689 6.57977 1.52281 5.21876 2.69651 4.17142L6.77629 0.533313C7.16092 0.190042 7.66083 0 8.17919 0C8.69755 0 9.19746 0.190042 9.58209 0.533313L13.6619 4.17142ZM9.01624 9.07459C9.01624 8.8553 8.92805 8.64499 8.77107 8.48993C8.6141 8.33486 8.40119 8.24775 8.17919 8.24775C7.95719 8.24775 7.74428 8.33486 7.58731 8.48993C7.43033 8.64499 7.34214 8.8553 7.34214 9.07459V16.5393C7.89787 16.6101 8.46051 16.6101 9.01624 16.5393V9.07459Z"
                    fill="#49B779" />
                </svg>
              </div>
              <span class="text-[12px] flex justify-center text-[#49B779] font-bold">گلبرگ</span>
              <div class="text-[8px] flex gap-1">
                <span>10.000</span>
                <span>تومان</span>
              </div>
            </button>

            <button class="bg-[#f6f6f6] rounded p-[10px] h-[80px] border border-grey-500 focus:border">
              <div class="flex justify-center items-center">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                    fill="#C9C9C9" />
                </svg>
              </div>
              <span class="text-[12px] flex justify-center text-[#adadad] font-bold">توضیحات</span>
              <div class="text-[8px] flex gap-1">
                <span>مطالعه کنید!</span>
              </div>
            </button>
          </div>
        </div>

        <div id="time" class="flex flex-col">
          <span>مدت زمان اشتراک (ماه)</span>
          <div class="flex gap-[5px] items-center text-[16px]">
            <span class="">{{ month }}/12</span>
            <input @input="setMonth" type="range" min="1" max="12" dir="ltr" class="my-[22px]" value="1">
          </div>
        </div>

        <div id="damagecal" class="flex justify-between">
          <div class="flex flex-col gap-[5px]">
            <div>
              هزینه اشتراک ماهیانه
            </div>
            <div class="flex justify-center font-bold text-[#adadad]">
              <span>{{ monthlyCost }}</span>
              <span>تومان</span>
            </div>
          </div>
          <div class="flex flex-col gap-[5px]">
            <div>
              خسارت تضمین شده
            </div>
            <div class="flex justify-center font-bold text-[#adadad]">
              <span>{{ damageCost }}</span>
              <span>تومان</span>
            </div>
          </div>
        </div>

      </div>

      <div id="calculator" class="bg-[#f6f6f6] rounded-b-[10px] shadow-[0_5px_5px_0_#c9c9c9] p-[20px] flex justify-between">
        <div class="text-[20px] font-bold">هزینه اشتراک <span>{{ month }} ماه</span></div>
        <div class="text-[#49B779] font-bold flex items-center">{{ userBasket }} تومان</div>
      </div>

    </div>

    <div v-else @click="authorizeInput" class="max-w-[400px] w-full">

      <div id="header" class="flex justify-between p-[20px] bg-[#f6f6f6] rounded-t-[20px]">
        <div id="name" class="flex items-center justify-center w-full text-[25px]">گیاه {{ plantData.name }}</div>
        <div id="health" class="flex flex-col">
          <div class="text-[30px] text-[#49B779]">{{ plantData.health }}%</div>
          <div class="text-[12px] flex justify-center text-[#adadad]">سلامت گل</div>
        </div>
      </div>

      <div id="content" class="p-[20px] border border-[#f6f6f6] flex flex-col gap-[10px] max-w-[360px] w-full">

        <div id="receipt" class="flex gap-[20px] justify-center">

          <div class="relative bg-[#f6f6f6] rounded p-[10px] border focus:border-[#49B779]">
            <div class="absolute top-1 -right-3 bg-black text-white rounded-full p-[2px]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Interface / Check_Big">
                  <path id="Vector" d="M4 12L8.94975 16.9497L19.5572 6.34326" stroke="currentcolor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
            </div>
            <div class="flex justify-center items-center">
              <svg width="46" height="29" viewBox="0 0 46 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M35.8642 10.436C36.3541 11.9336 36.3939 13.5394 35.9788 15.0589C35.5637 16.5783 34.7116 17.9464 33.5256 18.9973C32.3395 20.0481 30.8705 20.7368 29.2963 20.9799C27.7222 21.2229 26.1105 21.01 24.6563 20.3667L23.4101 22.4989C23.2983 22.6902 23.1141 22.8298 22.8981 22.887C22.6821 22.9442 22.452 22.9142 22.2583 22.8038C22.0647 22.6933 21.9233 22.5114 21.8655 22.2981C21.8076 22.0847 21.8379 21.8573 21.9497 21.666L23.1959 19.5339C21.9049 18.6115 20.9123 17.3392 20.3384 15.8711C19.7644 14.4029 19.6336 12.8019 19.9619 11.2618C20.2903 9.72175 21.0636 8.30875 22.1882 7.19393C23.3128 6.0791 24.7405 5.31028 26.2984 4.98055L31.7125 3.83656C32.223 3.72846 32.756 3.81139 33.2082 4.06929C33.6604 4.32718 33.9996 4.74168 34.1601 5.23249L35.8642 10.436ZM29.3115 12.4021C29.4233 12.2108 29.4536 11.9834 29.3957 11.7701C29.3379 11.5567 29.1965 11.3748 29.0029 11.2643C28.8092 11.1539 28.5791 11.1239 28.3631 11.1811C28.1471 11.2383 27.9629 11.3779 27.8511 11.5692L24.045 18.0811C24.4937 18.4194 24.9845 18.6993 25.5054 18.914L29.3115 12.4021Z"
                  fill="#81E7AD" />
                <path
                  d="M40.9187 17.7575C40.5849 19.2964 39.8066 20.7067 38.678 21.8177C37.5494 22.9286 36.119 23.6924 34.5599 24.0167C33.0008 24.341 31.38 24.2119 29.8937 23.6449C28.4074 23.0779 27.1194 22.0975 26.1857 20.8222L24.0272 22.0532C23.8335 22.1637 23.6034 22.1936 23.3874 22.1364C23.1714 22.0793 22.9872 21.9397 22.8754 21.7484C22.7636 21.5571 22.7333 21.3297 22.7912 21.1164C22.8491 20.903 22.9904 20.7211 23.184 20.6106L25.3425 19.3796C24.6914 17.9432 24.4758 16.3511 24.7218 14.7962C24.9679 13.2412 25.6651 11.7901 26.7289 10.6185C27.7928 9.44696 29.1777 8.6052 30.716 8.19519C32.2542 7.78518 33.8798 7.82451 35.3959 8.30841L40.6636 9.9917C41.1605 10.1502 41.5801 10.4853 41.8412 10.932C42.1023 11.3787 42.1862 11.9052 42.0768 12.4095L40.9187 17.7575ZM34.2487 16.2238C34.4424 16.1134 34.5837 15.9314 34.6416 15.7181C34.6995 15.5047 34.6692 15.2774 34.5573 15.0861C34.4455 14.8948 34.2614 14.7552 34.0454 14.698C33.8294 14.6408 33.5992 14.6707 33.4055 14.7812L26.8132 18.5409C27.0306 19.0554 27.314 19.5402 27.6564 19.9835L34.2487 16.2238Z"
                  fill="#49B779" />
                <path
                  d="M17.3368 5.26982C16.1545 6.32482 15.3072 7.6958 14.8976 9.21672C14.4879 10.7376 14.5334 12.3433 15.0286 13.8391C15.5238 15.335 16.4475 16.657 17.6877 17.645C18.9279 18.633 20.4315 19.2445 22.0164 19.4057V21.8677C22.0164 22.0886 22.1052 22.3005 22.2634 22.4567C22.4215 22.6129 22.636 22.7006 22.8596 22.7006C23.0832 22.7006 23.2977 22.6129 23.4558 22.4567C23.6139 22.3005 23.7028 22.0886 23.7028 21.8677V19.4057C25.2877 19.2445 26.7913 18.633 28.0315 17.645C29.2717 16.657 30.1953 15.335 30.6905 13.8391C31.1857 12.3433 31.2313 10.7376 30.8216 9.21672C30.412 7.6958 29.5647 6.32482 28.3824 5.26982L24.2727 1.60509C23.8853 1.2593 23.3817 1.06787 22.8596 1.06787C22.3374 1.06787 21.8339 1.2593 21.4464 1.60509L17.3368 5.26982ZM22.0164 10.2089C22.0164 9.98798 22.1052 9.77613 22.2634 9.61993C22.4215 9.46373 22.636 9.37598 22.8596 9.37598C23.0832 9.37598 23.2977 9.46373 23.4558 9.61993C23.6139 9.77613 23.7028 9.98798 23.7028 10.2089V17.7282C23.143 17.7995 22.5762 17.7995 22.0164 17.7282V10.2089Z"
                  fill="#49B779" />
                <path
                  d="M10.097 10.436C9.60711 11.9336 9.56729 13.5394 9.98236 15.0589C10.3974 16.5783 11.2496 17.9464 12.4356 18.9973C13.6217 20.0481 15.0907 20.7368 16.6649 20.9799C18.239 21.2229 19.8507 21.01 21.3049 20.3667L22.5511 22.4989C22.6629 22.6902 22.847 22.8298 23.063 22.887C23.2791 22.9442 23.5092 22.9142 23.7029 22.8038C23.8965 22.6933 24.0378 22.5114 24.0957 22.2981C24.1536 22.0847 24.1233 21.8573 24.0115 21.666L22.7653 19.5339C24.0563 18.6115 25.0488 17.3392 25.6228 15.8711C26.1968 14.4029 26.3275 12.8019 25.9992 11.2618C25.6709 9.72175 24.8976 8.30875 23.773 7.19393C22.6484 6.0791 21.2207 5.31028 19.6628 4.98055L14.2487 3.83656C13.7382 3.72846 13.2052 3.81139 12.753 4.06929C12.3008 4.32718 11.9616 4.74168 11.801 5.23249L10.097 10.436ZM16.6497 12.4021C16.5379 12.2108 16.5076 11.9834 16.5654 11.7701C16.6233 11.5567 16.7646 11.3748 16.9583 11.2643C17.152 11.1539 17.3821 11.1239 17.5981 11.1811C17.8141 11.2383 17.9983 11.3779 18.1101 11.5692L21.9162 18.0811C21.4675 18.4194 20.9767 18.6993 20.4558 18.914L16.6497 12.4021Z"
                  fill="#81E7AD" />
                <path
                  d="M5.04201 17.7575C5.3758 19.2964 6.15412 20.7067 7.28271 21.8177C8.41129 22.9286 9.84173 23.6924 11.4008 24.0167C12.9599 24.341 14.5807 24.2119 16.067 23.6449C17.5533 23.0779 18.8413 22.0975 19.775 20.8222L21.9335 22.0532C22.1271 22.1637 22.3573 22.1936 22.5733 22.1364C22.7893 22.0793 22.9735 21.9397 23.0853 21.7484C23.1971 21.5571 23.2274 21.3297 23.1695 21.1164C23.1116 20.903 22.9703 20.7211 22.7767 20.6106L20.6182 19.3796C21.2693 17.9432 21.4849 16.3511 21.2389 14.7962C20.9928 13.2412 20.2956 11.7901 19.2318 10.6185C18.1679 9.44696 16.783 8.6052 15.2447 8.19519C13.7065 7.78518 12.0809 7.82451 10.5648 8.30841L5.29706 9.9917C4.80018 10.1502 4.38057 10.4853 4.11949 10.932C3.85841 11.3787 3.77446 11.9052 3.88389 12.4095L5.04201 17.7575ZM11.712 16.2238C11.5183 16.1134 11.377 15.9314 11.3191 15.7181C11.2612 15.5047 11.2915 15.2774 11.4034 15.0861C11.5152 14.8948 11.6993 14.7552 11.9153 14.698C12.1313 14.6408 12.3615 14.6707 12.5552 14.7812L19.1475 18.5409C18.9301 19.0554 18.6467 19.5402 18.3043 19.9835L11.712 16.2238Z"
                  fill="#49B779" />
              </svg>
            </div>
            <span class="text-[12px] flex justify-center text-[#49B779] font-bold">{{ basket.title }}</span>
            <div class="text-[8px] flex gap-1">
              <span>{{ basket.price }}</span>
              <span>تومان</span>
            </div>
          </div>

          <div class="relative bg-[#f6f6f6] rounded p-[10px] border focus:border-[#49B779]">
            <div class="absolute top-1 -right-3 bg-black text-white rounded-full p-[2px]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Interface / Check_Big">
                  <path id="Vector" d="M4 12L8.94975 16.9497L19.5572 6.34326" stroke="currentcolor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
            </div>
            <div class="flex justify-center items-center">
              <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 20.25H2.25V7.875H18M14.625 0V2.25H5.625V0H3.375V2.25H2.25C1.00125 2.25 0 3.25125 0 4.5V20.25C0 20.8467 0.237053 21.419 0.65901 21.841C1.08097 22.2629 1.65326 22.5 2.25 22.5H18C18.5967 22.5 19.169 22.2629 19.591 21.841C20.0129 21.419 20.25 20.8467 20.25 20.25V4.5C20.25 3.90326 20.0129 3.33097 19.591 2.90901C19.169 2.48705 18.5967 2.25 18 2.25H16.875V0M15.75 12.375H10.125V18H15.75V12.375Z"
                  fill="#49B779" />
              </svg>
            </div>
            <span class="text-[12px] flex justify-center text-[#49B779] font-bold">{{ basket.timeLaps }} ماهه</span>
            <div class="text-[8px] flex gap-1">
              <span>خسارت</span>
              <span>{{ basket.damageSupport }}</span>
              <span>تومانی</span>
            </div>
          </div>

        </div>

        <div id="message" class="flex flex-col justify-center items-center mb-[20px]">
          <div class="text-[20px] font-bold">
            عملیات با موفقیت انجام شد
          </div>
          <span class="text-[13px]">
            جهت فعالسازی اشتراک فرم زیر را پر کنید
          </span>
        </div>

        <div id="info" class="flex flex-col gap-[10px] max-w-[360px] w-full text-[14px]">
          <div class="grid grid-cols-2 gap-[10px]">
            <div class="flex flex-col gap-1" id="name">
              <input id="nameInput" type="text" placeholder="نام و نام خانوادگی" class="border rounded p-2"
                v-model="userData.name" required>
              <div class="flex gap-1 text-[#AC0202]" v-if="nameError">
                <i fill="currentcolor">
                  <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                      fill="currentcolor" />
                  </svg>
                </i>
                <span class="text-[8px]">وارد کردن نام و نام خانوادگی الزامی است</span>
              </div>
            </div>
            <div class="flex flex-col gap-1" id="city">
              <select name="" id="cityInput" class="border rounded p-2" v-model="userData.city" required>
                <option selected disabled>شهر محل سکونت</option>
                <option :value="city.title" v-for="city in cities">{{ city.title }}</option>
              </select>
              <div class="flex gap-1 text-[#AC0202]" v-if="cityError">
                <i fill="currentcolor">
                  <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                      fill="currentcolor" />
                  </svg>
                </i>
                <span class="text-[8px]">وارد کردن شهر محل سکونت الزامی است</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-[10px]">
            <div class="flex flex-col gap-1" id="phone">
              <input id="phoneInput" type="text" placeholder="شماره موبایل" class="border rounded p-2 h-[40px]"
                v-model="userData.phone" required>
              <div class="flex gap-1 text-[#AC0202]" v-if="phoneError">
                <i fill="currentcolor">
                  <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                      fill="currentcolor" />
                  </svg>
                </i>
                <span class="text-[8px]">وارد کردن شماره موبایل الزامی است</span>
              </div>
            </div>
            <div class="flex flex-col gap-1" id="creditcard">
              <input type="text" placeholder="شماره کارت" class="border rounded p-2 h-[40px]"
                v-model="userData.creditCard">
              <div class="flex gap-1 text-[#49B779]">
                <i fill="currentcolor">
                  <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                      fill="currentcolor" />
                  </svg>
                </i>
                <span class="text-[8px]">جهت واریز خسارت در صورت خرابی گل</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div id='footer' class="bg-[#f6f6f6] rounded-b-[10px] shadow-[0_5px_5px_0_#c9c9c9] p-[20px] flex justify-between">
        <div class="text-[20px] font-bold">وقتی حال گلت خوب بشه کنارتیم :)</div>
      </div>

    </div>

    <div class="flex justify-center items-center gap-[10px]">
      <div class="w-[100px] p-1 px-3 rounded font-bold text-white bg-[#49b779] text-center">
        <button v-if="stage" @click="() => stage = false">پرداخت</button>
        <button v-else @click="activeService">فعال سازی</button>
      </div>
      <RouterLink to="/info" class="bg-[#f6f6f6] px-5 p-1 text-[#adadad] rounded font-bold">لغو</RouterLink>
    </div>
  </div>
</template>