<script setup>
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue'
import flowers from '../flowerLibrary.json'
import serverURL from '../router/serverAddress'

const LIBRARY_URL = serverURL + "/library/images/";

const data = ref([])
onMounted(() => {
    flowers.forEach(item => {
        if (item.id !== 0 && item.id !== -1) {
            data.value.push(item);
        }
    });
})


const searchInput = ref(false)
const searchBox = ref(null)
const searchBoxEffect = (e) => {
    if (e.target.value) {
        searchBoxEffect.value = e.target.value
        searchInput.value = true
    }
    else {
        searchInput.value = false
    }
}

const searchWord = () => {
    // Declare variables
    let filter, li, a, i, txtValue;
    filter = searchBox.value.value.toUpperCase();
    li = document.querySelectorAll('#libraryData');
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

const setInputEmpty = () => {
    searchBox.value.value = null
    searchInput.value = false
    searchWord()
}

const reversed = ref(false)
const sortTable = () => {
    if (reversed.value) {
        data.value.reverse()
        reversed.value = false
    }
    else {
        data.value.reverse()
        reversed.value = true
    }
}

</script>

<template>
    <div>
        <!-- tool -->
        <div id="plantheader" class="flex flex-col gap-3 fixed top-0 max-w-[400px] w-full p-[20px] z-10 bg-white">
            <!-- navigation -->
            <div class="flex justify-between items-center gap-[5px]">
                <p class="font-bold">بهم بگو گلت چیه</p>
                <RouterLink to="/garden" fill="currentcolor" class="z-10">
                    <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m1394.006 0 92.299 92.168-867.636 867.767 867.636 867.636-92.299 92.429-959.935-960.065z"
                            fill-rule="evenodd" />
                    </svg>
                </RouterLink>
            </div>
            <!-- search -->
            <div class="flex justify-between items-center gap-[5px]">
                <div class="flex justify-between gap-[5px] w-full">
                    <div class="bg-[#49b7792b] rounded-md flex gap-1 justify-between p-2 w-full h-[40px]">
                        <i class="text-[#49b779] flex items-center" disabled>
                            <svg width="20" height="20" fill="currentcolor" viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z" />
                            </svg>
                        </i>
                        <input ref="searchBox" type="text"
                            class="bg-transparent w-full outline-none text-[#00000088] placeholder-[#00000088]"
                            @input="searchBoxEffect" @keyup="searchWord" placeholder="جستجو">
                        <button @click="setInputEmpty" v-if="searchInput" class="flex items-center text-red-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                                    fill="currentcolor" />
                            </svg>
                        </button>
                    </div>
                    <button class="rounded-md p-2 h-[40px] flex items-center bg-[#49b7792b] text-[#49b779]"
                        @click="sortTable">
                        <svg v-if="!reversed" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 3V21M7 3L11 7M7 3L3 7M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
                                stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 3V21M7 21L3 17M7 21L11 17M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
                                stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- main -->
        <div id="plantlibrary" class="overflow-y-auto mt-[120px] px-[20px] pb-[100px] grid grid-cols-2 gap-3">

            <RouterLink :to="'/addplant/' + flower.id" v-for="flower in data" id="libraryData"
                class="col-span-1 shadow rounded bg-white pb-3">
                <div class="flex flex-col gap-1">
                    <div class="pb-[10px]">
                        <img v-if="flower.image != '-' && flower.id != 0" :src="LIBRARY_URL + flower.image" loading="lazy"
                            class="aspect-square object-cover rounded-t w-full h-full" :alt="flower.name" />
                        <div v-else :src="LIBRARY_URL + flower.image" loading="lazy"
                            class="aspect-square object-cover rounded w-full h-full bg-[#f6f6f6] flex justify-center items-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
                                    stroke="#33363F" stroke-width="2" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.9997 13.5854L18.9794 13.5651C18.5898 13.1754 18.2537 12.8393 17.9536 12.5864C17.6367 12.3193 17.2917 12.0845 16.8665 11.9562C16.3014 11.7857 15.6986 11.7857 15.1335 11.9562C14.7083 12.0845 14.3633 12.3193 14.0464 12.5864C13.7463 12.8393 13.4102 13.1754 13.0206 13.5651L12.9921 13.5936C12.6852 13.9004 12.5046 14.0795 12.3645 14.1954L12.3443 14.2118L12.3317 14.1891C12.2447 14.0295 12.1435 13.7961 11.9726 13.3972L11.9191 13.2726L11.8971 13.2211L11.897 13.221C11.5411 12.3904 11.2422 11.693 10.9464 11.1673C10.6416 10.6257 10.2618 10.1178 9.66982 9.82106C9.17604 9.57352 8.6235 9.46711 8.07311 9.51356C7.41323 9.56924 6.87197 9.89977 6.38783 10.2894C5.98249 10.6157 5.52754 11.0598 5 11.5859V12.9999C5 13.5166 5.0003 13.9848 5.00308 14.411L6.117 13.2971C6.80615 12.6079 7.26639 12.1497 7.64186 11.8475C8.01276 11.5489 8.17233 11.5123 8.24128 11.5065C8.42475 11.491 8.60893 11.5265 8.77352 11.609C8.83539 11.64 8.96994 11.7333 9.20344 12.1482C9.43981 12.5682 9.69693 13.1646 10.0809 14.0605L10.1343 14.1851L10.1506 14.2232C10.2995 14.5707 10.4378 14.8936 10.5759 15.1468C10.7206 15.412 10.9308 15.7299 11.2847 15.9489C11.702 16.2072 12.1997 16.3031 12.6831 16.2182C13.093 16.1463 13.4062 15.9292 13.6391 15.7367C13.8613 15.5529 14.1096 15.3045 14.3769 15.0371L14.377 15.0371L14.4063 15.0078C14.8325 14.5816 15.1083 14.307 15.3353 14.1157C15.5526 13.9325 15.6552 13.8878 15.7112 13.8709C15.8995 13.8141 16.1005 13.8141 16.2888 13.8709C16.3448 13.8878 16.4474 13.9325 16.6647 14.1157C16.8917 14.307 17.1675 14.5816 17.5937 15.0078L18.9441 16.3582C18.9902 15.6404 18.9983 14.7479 18.9997 13.5854Z"
                                    fill="#33363F" />
                                <circle cx="16.5" cy="7.5" r="1.5" fill="#33363F" />
                            </svg>
                        </div>
                    </div>
                    <span class="px-[20px]">{{ flower.name }}</span>
                    <span class="text-[12px] text-[#c9c9c9] px-[20px]">{{ flower.name }}</span>
                </div>
            </RouterLink>

        </div>

        <!-- footer button -->
        <div
            class="max-w-[400px] flex justify-center gap-3 fixed w-full bottom-0 p-[10px] px-[20px] text-[14px] z-10 bg-white">
            <RouterLink to="/addplant/-1"
                class="bg-[#49b7792c] px-3 py-2 rounded">نمیدونم گلم چیه
            </RouterLink>
            <RouterLink to="/addplant/0"
                class="bg-[#49b7792c] px-3 py-2 rounded">اسم گلم تو لیست
                نیست
            </RouterLink>

        </div>
    </div>
</template>