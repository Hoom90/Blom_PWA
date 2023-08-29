<script setup>
import { defineProps, ref, watch, getCurrentInstance } from 'vue';
import serverURL from '../router/serverAddress'

const props = defineProps({
    file: {
        required: true,
    },
    filename: {
        required: true,
    },
    score:{
        require:true,
    }
});

const userImages = ref([])
const filename = ref(props.filename)
const file = ref(props.file)
const score = ref(props.score)
const { emit } = getCurrentInstance();
watch([file, filename , score], ([newFile, newName , newScore]) => {
    // ارسال مقدار جدید به کامپوننت بالایی
    emit('update:file', newFile);
    emit('update:filename', newName);
    emit('update:score', newScore);
},
{ deep: true } // فعال کردن ویژگی deep برای تمامی ویژگی‌ها
);

// file input
const openFileInput = () => {
    const imageInput = document.querySelector('input[name=fileInput]')
    imageInput.click()
}

// set image data
const setNewImage = (e) => {
    if (e.target.files.length === 3 || userImages.value.length >= 3) {
        if(userImages.value.length === 1){
            score.value -= 10;
        }
        if(userImages.value.length === 2){
            score.value -= 20;
        }
        if(userImages.value.length === 3){
            score.value -= 30;
        }
        userImages.value = []
        file.value = []
        filename.value = []
    }
    const files = []
    for (let i = 0; i < e.target.files.length; i++) {
        let temp = e.target.files[i]
        score.value += 10;
        // Prompt the user to enter a new file name
        // const newFileName = "user_" + localStorage.getItem('userId') + "_" + Date.now();
        // filename.value.push(newFileName);
        filename.value.push(temp.name);
        // temp.name = newFileName

        // Get file name and file itself to send to the database
        file.value.push(temp);
        files.push(temp)
    }
    files.forEach(item => {
        const reader = new FileReader();
        reader.onload = (event) => {
            userImages.value.push(event.target.result);
        };
        reader.readAsDataURL(item);
    });
};
</script>
<template>
    <div class="max-w-[400px] w-full h-full flex flex-col gap-2 p-[20px] mb-[80px]">

        <div class="bg-gray-100 rounded-[20px] relative cursor-pointer" @click="openFileInput">
            <img :src="serverURL + '/library/images/pic1.avif'" class="w-full h-full" alt="عکس گرفتن">
            <div
                class="absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] flex justify-center items-center gap-3">
                <div class="flex flex-col gap-3 jusctify-center items-center text-[12px]">
                    <div class="w-[80px] h-[80px]">
                        <div class="flex justify-center items-center shadow-md w-full h-full bg-white rounded-md">
                            <img v-if="userImages[0]" :src="userImages[0]" class="object-cover aspect-square rounded-md">
                            <div v-else class="flex items-center justify-center">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="28px" viewBox="0 0 30 28" enable-background="new 0 0 30 28" xml:space="preserve">  <image id="image0" width="30" height="28" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEUAAABAr3BFtXVIs3hK
                                uHpJuHlJt3lKt3pIt3hJtnlJtnlIt3hIr3hItXhItXhKt3pJsnlKunpJt3lIt3hQr4BJtnlIt3hJ
                                tnhJtXhKtXpGtnZKtXtJuHlJuHlJtnlJt3n///8gU/OiAAAAH3RSTlMAEDBAb+/ff2BwUEAgYICf
                                UDC/IBDPgJCQMFAfr8+PGBdHUwAAAAFiS0dEILNrPYAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAH
                                dElNRQfnCB0LDDWjxSHXAAAA9ElEQVQoz5WS0WLCMAhFE7uyahexkDh1Tv7/L0eTtomOPew+FU4a
                                4BLnqvyum+WdqbdesuDdooNs2hsYBA6j6qAfL+gjHFEklGAvgsfTboMTlZpcwlh6SEs45bAnXo8z
                                lUy+gEHkzK+dTJ/K5yzanc6TXHLHZPtA8wSx/TlSyp5xguR1Au+uIrcNdyLjMpvc9PavLfOE4wXP
                                JTBxDWqGAHTGHuBuYa4r8RVHWM0cENXdO2IwKv1R+z/4+hv7rjW6sT/botaaG3FOd1act98myHe5
                                Aw3o19elw8IjdK1O4aEGprLFJKZorTkYB+ipYR5bTbz8+QMVGx1vnhj2VgAAACV0RVh0ZGF0ZTpj
                                cmVhdGUAMjAyMy0wOC0yOVQwOToxMjo1MyswMjowMKTtkUkAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                                MjMtMDgtMjlUMDk6MTI6NTMrMDI6MDDVsCn1AAAAAElFTkSuQmCC" />
                                </svg>
                            </div>
                        </div>
                        <div class="hidden">
                            <input ref="fileInput" name="fileInput" type="file" @input="setNewImage" multiple />
                        </div>
                    </div>
                    <span>گیاه و گلدان</span>
                </div>
                <div class="flex flex-col gap-3 justify-center items-center text-[12px]">
                    <div class="w-[80px] h-[80px]">
                        <div class="flex justify-center items-center shadow-md w-full h-full bg-white rounded-md">
                            <img v-if="userImages[1]" :src="userImages[1]" class="object-cover aspect-square rounded-md">
                            <div v-else class="flex items-center justify-center">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="28px" viewBox="0 0 30 28" enable-background="new 0 0 30 28" xml:space="preserve">  <image id="image0" width="30" height="28" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEUAAABAr3BFtXVIs3hK
                                uHpJuHlJt3lKt3pIt3hJtnlJtnlIt3hIr3hItXhItXhKt3pJsnlKunpJt3lIt3hQr4BJtnlIt3hJ
                                tnhJtXhKtXpGtnZKtXtJuHlJuHlJtnlJt3n///8gU/OiAAAAH3RSTlMAEDBAb+/ff2BwUEAgYICf
                                UDC/IBDPgJCQMFAfr8+PGBdHUwAAAAFiS0dEILNrPYAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAH
                                dElNRQfnCB0LDDWjxSHXAAAA9ElEQVQoz5WS0WLCMAhFE7uyahexkDh1Tv7/L0eTtomOPew+FU4a
                                4BLnqvyum+WdqbdesuDdooNs2hsYBA6j6qAfL+gjHFEklGAvgsfTboMTlZpcwlh6SEs45bAnXo8z
                                lUy+gEHkzK+dTJ/K5yzanc6TXHLHZPtA8wSx/TlSyp5xguR1Au+uIrcNdyLjMpvc9PavLfOE4wXP
                                JTBxDWqGAHTGHuBuYa4r8RVHWM0cENXdO2IwKv1R+z/4+hv7rjW6sT/botaaG3FOd1act98myHe5
                                Aw3o19elw8IjdK1O4aEGprLFJKZorTkYB+ipYR5bTbz8+QMVGx1vnhj2VgAAACV0RVh0ZGF0ZTpj
                                cmVhdGUAMjAyMy0wOC0yOVQwOToxMjo1MyswMjowMKTtkUkAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                                MjMtMDgtMjlUMDk6MTI6NTMrMDI6MDDVsCn1AAAAAElFTkSuQmCC" />
                                </svg>
                            </div>
                        </div>
                        <!-- <div class="hidden">
                            <input ref="fileInput" name="fileInput" type="file" @input="setNewImage" />
                        </div> -->
                    </div>
                    <span>برگ</span>
                </div>
                <div class="flex flex-col gap-3 jusctify-center items-center text-[12px]">
                    <div class="w-[80px] h-[80px]">
                        <div class="flex justify-center items-center shadow-md w-full h-full bg-white rounded-md">
                            <img v-if="userImages[2]" :src="userImages[2]" class="object-cover aspect-square rounded-md">
                            <div v-else class="flex items-center justify-center">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="28px" viewBox="0 0 30 28" enable-background="new 0 0 30 28" xml:space="preserve">  <image id="image0" width="30" height="28" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEUAAABAr3BFtXVIs3hK
                                uHpJuHlJt3lKt3pIt3hJtnlJtnlIt3hIr3hItXhItXhKt3pJsnlKunpJt3lIt3hQr4BJtnlIt3hJ
                                tnhJtXhKtXpGtnZKtXtJuHlJuHlJtnlJt3n///8gU/OiAAAAH3RSTlMAEDBAb+/ff2BwUEAgYICf
                                UDC/IBDPgJCQMFAfr8+PGBdHUwAAAAFiS0dEILNrPYAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAH
                                dElNRQfnCB0LDDWjxSHXAAAA9ElEQVQoz5WS0WLCMAhFE7uyahexkDh1Tv7/L0eTtomOPew+FU4a
                                4BLnqvyum+WdqbdesuDdooNs2hsYBA6j6qAfL+gjHFEklGAvgsfTboMTlZpcwlh6SEs45bAnXo8z
                                lUy+gEHkzK+dTJ/K5yzanc6TXHLHZPtA8wSx/TlSyp5xguR1Au+uIrcNdyLjMpvc9PavLfOE4wXP
                                JTBxDWqGAHTGHuBuYa4r8RVHWM0cENXdO2IwKv1R+z/4+hv7rjW6sT/botaaG3FOd1act98myHe5
                                Aw3o19elw8IjdK1O4aEGprLFJKZorTkYB+ipYR5bTbz8+QMVGx1vnhj2VgAAACV0RVh0ZGF0ZTpj
                                cmVhdGUAMjAyMy0wOC0yOVQwOToxMjo1MyswMjowMKTtkUkAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                                MjMtMDgtMjlUMDk6MTI6NTMrMDI6MDDVsCn1AAAAAElFTkSuQmCC" />
                                </svg>
                            </div>
                        </div>
                        <!-- <div class="hidden">
                            <input ref="fileInput" name="fileInput" type="file" @input="setNewImage" />
                        </div> -->
                    </div>
                    <span>محیط نگهداری</span>
                </div>
            </div>
        </div>

        <div class="text-[10px] flex gap-1 justify-center items-center mt-[80px]">
            <i class="text-yellow-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888Z"
                        fill="currentcolor" />
                </svg>
            </i>
            <span>حتما لنز دوربینت رو تمیز کنی که عکس واضح باشه</span>
        </div>

    </div>
</template>