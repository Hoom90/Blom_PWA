<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import serverURL from '../router/serverAddress'
import moment from 'jalali-moment'

let server = serverURL
const loading = ref(false)
const posts = ref([])
async function getData() {
  loading.value = true
  const res = await fetch(server + "/api/blogs");
  const data = await res.json();
  posts.value = data;
  loading.value = false
}

const router = useRouter()

const miladiToShamsi = (miladi) =>{
  const date = miladi.split('T')[0]
  const day = date.split('-')[2]
  const month = date.split('-')[1]
  const year = date.split('-')[0]
  return moment(year + month + day, 'YYYY/MM/DD').locale('fa').format('YYYY MMMM D')
}

getData()
</script>

<template>
  <div class="mb-20">
    <div class="m-10 text-[40px] text-center">بلاگ بلوم</div>
    <div v-if="loading" class="flex justify-center items-center h-[50vh]">در حال بارگذاری</div>
    <div v-if="!posts">هیچ پستی نداریم</div>
    <div class="flex flex-col mb-5  mx-2" v-if="posts" v-for="post in posts.slice().reverse()" :key="post.id">

      <div class="rounded-md shadow-[0_3px_5px_grey] -z-10">
        <div>
          <div v-if="post.is_video">
            <video :src="post.fileName" controls class="w-full"></video>
          </div>
          <div v-else>
            <img v-if="post.fileName && !post.is_video" :src="post.fileName" alt="picture" class="mx-auto w-full">
          </div>
        </div>
        <div class="p-3">
          <div v-if="post.title" class="text-[30px]">{{ post.title }}</div>
          <div v-if="post.text" class="flex flex-wrap my-2 p-2">{{ post.text }}</div>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between px-2">
              <div class="flex gap-2 pl-2">
                <div class="flex gap-1">
                  <span class="text-red-500">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentcolor"
                      xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M4.42602 12.3115L12 19.8854L19.574 12.3115C21.4753 10.4101 21.4753 7.32738 19.574 5.42602C17.6726 3.52466 14.5899 3.52466 12.6885 5.42602L12 6.11456L11.3115 5.42602C9.4101 3.52466 6.32738 3.52466 4.42602 5.42602C2.52466 7.32738 2.52466 10.4101 4.42602 12.3115Z"
                          stroke="currentcolor" stroke-width="2" stroke-linejoin="round" />
                      </g>
                    </svg>
                  </span>
                  <span>{{ post.likes }}</span>
                </div>
                <div class="flex gap-1 pr-2">
                  <span class="text-[#5c5c5c]">
                    <svg fill="currentcolor" width="25" height="25" viewBox="0 0 32 32" version="1.1"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16.108 10.044c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.686 6-6-2.686-6-6-6zM16.108 20.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.748 4.044-3.954 4.044zM31.99 15.768c-0.012-0.050-0.006-0.104-0.021-0.153-0.006-0.021-0.020-0.033-0.027-0.051-0.011-0.028-0.008-0.062-0.023-0.089-2.909-6.66-9.177-10.492-15.857-10.492s-13.074 3.826-15.984 10.486c-0.012 0.028-0.010 0.057-0.021 0.089-0.007 0.020-0.021 0.030-0.028 0.049-0.015 0.050-0.009 0.103-0.019 0.154-0.018 0.090-0.035 0.178-0.035 0.269s0.017 0.177 0.035 0.268c0.010 0.050 0.003 0.105 0.019 0.152 0.006 0.023 0.021 0.032 0.028 0.052 0.010 0.027 0.008 0.061 0.021 0.089 2.91 6.658 9.242 10.428 15.922 10.428s13.011-3.762 15.92-10.422c0.015-0.029 0.012-0.058 0.023-0.090 0.007-0.017 0.020-0.030 0.026-0.050 0.015-0.049 0.011-0.102 0.021-0.154 0.018-0.090 0.034-0.177 0.034-0.27 0-0.088-0.017-0.175-0.035-0.266zM16 25.019c-5.665 0-11.242-2.986-13.982-8.99 2.714-5.983 8.365-9.047 14.044-9.047 5.678 0 11.203 3.067 13.918 9.053-2.713 5.982-8.301 8.984-13.981 8.984z">
                      </path>
                    </svg>
                  </span>
                  <span>{{ post.views }}</span>
                </div>
              </div>
              <!-- <div class="pr-5" >{{ post.updatedAt }}</div> -->
              <div class="pr-5">{{miladiToShamsi(post.updatedAt)}}</div>
            </div>
            <button
            class="bg-[#23d278] p-3 px-5 text-white rounded-md">بیشتر</button>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- <div class="fixed top-0 left-0 bg-white text-black h-[90vh]">
  <div class="flex justify-center items-center w-full ">
    در حال بارگزاری
  </div>
</div> -->
</template>