<script setup>
import { defineProps, ref, watch, getCurrentInstance ,onBeforeMount } from 'vue';
import serverURL from '../router/serverAddress'
import data from '../sickness.json'
const props = defineProps({
    symptoms: {
        required: true,
    },
    description: {
        required: true,
    },
    score:{
        required:true,
    }
});

const leaf = ref([])
const body = ref([])
const root = ref([])
onBeforeMount(() => {
    data.forEach((item,index) => {
        if(index < 9){
            leaf.value.push(item)
        }
        if(9 <= index && index < 14){
            body.value.push(item)
        }
        if(14 <= index){
            root.value.push(item)
        }
    })
})

const symptoms = ref(props.symptoms)
const description = ref(props.description)
const score = ref(props.score)
const { emit } = getCurrentInstance()
watch([symptoms,description,score], ([newsymptoms,newdescription,newscore]) => {
    // ارسال مقدار جدید به کامپوننت بالایی
    emit('update:symptoms', newsymptoms);
    emit('update:description', newdescription);
    emit('update:score', newscore);
}
,{deep:true}
);

const flag =[false,false,false,false,false,
            false,false,false,false,false,
            false,false,false,false,false,
            false,false,false,false,false]
const flag1 = ref(true)
const flag2 = ref(true)
const flag3 = ref(true)
const leafTemp = ref([])
const bodyTemp = ref([])
const rootTemp = ref([])
const setSymtom = (number) => {
  const buttons = document.querySelectorAll("#symptomButton");
  const index = number -1;
  
  if (flag[index]) {
    buttons[index].classList.replace("border-[#49b779]", "border-transparent");
    if (number === 1) {
            symptoms.value = symptoms.value.filter(item => item !== "برگاش سالمه!");
        } if (number === 2) {
            symptoms.value = symptoms.value.filter(item => item !== "(قهو ای شده");
        } if (number === 3) {
            symptoms.value = symptoms.value.filter(item => item !== "زرد شده");
        } if (number === 4) {
            symptoms.value = symptoms.value.filter(item => item !== "(لوله شده)پیچ خورده");
        } if (number === 5) {
            symptoms.value = symptoms.value.filter(item => item !== "برگاش میریزه");
        } if (number === 6) {
            symptoms.value = symptoms.value.filter(item => item !== "برگاش سوخته");
        } if (number === 7) {
            symptoms.value = symptoms.value.filter(item => item !== "برگاش رشد نمیکنه");
        }if (number === 8) {
            symptoms.value = symptoms.value.filter(item => item !== "برگاش آویزون شده");
        } if (number === 9) {
            symptoms.value = symptoms.value.filter(item => item !== "(پشت برگاش حشره داره");
        } if (number === 10) {
            symptoms.value = symptoms.value.filter(item => item !== "ساقه اش سالمه!");
        } if (number === 11) {
            symptoms.value = symptoms.value.filter(item => item !== "ساقه اش نرم شده");
        } if (number === 12) {
            symptoms.value = symptoms.value.filter(item => item !== "رنگ ساقه اش عوض شده");
        } if (number === 13) {
            symptoms.value = symptoms.value.filter(item => item !== "ساقه اش پوک شده");
        } if (number === 14) {
            symptoms.value = symptoms.value.filter(item => item !== "ساقه هاش رشد نمکنه");
        } if (number === 15) {
            symptoms.value = symptoms.value.filter(item => item !== "ریشه اش سالمه!");
        } if (number === 15) {
            symptoms.value = symptoms.value.filter(item => item !== "(نمیبینم)دسترسی ندارم");
        } if (number === 16) {
            symptoms.value = symptoms.value.filter(item => item !== "ریشه اش پوسیده");
        } if (number === 17) {
            symptoms.value = symptoms.value.filter(item => item !== "ریشه اش هوا خورده");
        } if (number === 18) {
            symptoms.value = symptoms.value.filter(item => item !== "از زیر گلدون زده بیرون");
        } if (number === 19) {
            symptoms.value = symptoms.value.filter(item => item !== "از روی خاک زده بیرون");
        }
    symptoms.value = symptoms.value.filter(item => item !== number);
    flag[index] = false;
    if(index < 9){
        if (number === 1) {
            leafTemp.value = leafTemp.value.filter(item => item !== "برگاش سالمه!");
        } if (number === 2) {
            leafTemp.value = leafTemp.value.filter(item => item !== "(قهو ای شده");
        } if (number === 3) {
            leafTemp.value = leafTemp.value.filter(item => item !== "زرد شده");
        } if (number === 4) {
            leafTemp.value = leafTemp.value.filter(item => item !== "(لوله شده)پیچ خورده");
        } if (number === 5) {
            leafTemp.value = leafTemp.value.filter(item => item !== "برگاش میریزه");
        } if (number === 6) {
            leafTemp.value = leafTemp.value.filter(item => item !== "برگاش سوخته");
        } if (number === 7) {
            leafTemp.value = leafTemp.value.filter(item => item !== "برگاش رشد نمیکنه");
        }if (number === 8) {
            leafTemp.value = leafTemp.value.filter(item => item !== "برگاش آویزون شده");
        } if (number === 9) {
            leafTemp.value = leafTemp.value.filter(item => item !== "(پشت برگاش حشره داره");
        }
    }if(index < 14 && 9 <= index){
        if (number === 10) {
            bodyTemp.value = bodyTemp.value.filter(item => item !== "ساقه اش سالمه!");
        } if (number === 11) {
            bodyTemp.value = bodyTemp.value.filter(item => item !== "ساقه اش نرم شده");
        } if (number === 12) {
            bodyTemp.value = bodyTemp.value.filter(item => item !== "رنگ ساقه اش عوض شده");
        } if (number === 13) {
            bodyTemp.value = bodyTemp.value.filter(item => item !== "ساقه اش پوک شده");
        } if (number === 14) {
            bodyTemp.value = bodyTemp.value.filter(item => item !== "ساقه هاش رشد نمکنه");
        }
    }if(14 <= index){
        if (number === 15) {
            rootTemp.value = rootTemp.value.filter(item => item !== "ریشه اش سالمه!");
        } if (number === 15) {
            rootTemp.value = rootTemp.value.filter(item => item !== "(نمیبینم)دسترسی ندارم");
        } if (number === 16) {
            rootTemp.value = rootTemp.value.filter(item => item !== "ریشه اش پوسیده");
        } if (number === 17) {
            rootTemp.value = rootTemp.value.filter(item => item !== "ریشه اش هوا خورده");
        } if (number === 18) {
            rootTemp.value = rootTemp.value.filter(item => item !== "از زیر گلدون زده بیرون");
        } if (number === 19) {
            rootTemp.value = rootTemp.value.filter(item => item !== "از روی خاک زده بیرون");
        }
    }
    if(leafTemp.value.length === 0){
        if(!flag1.value){
            score.value -= 10
            flag1.value = true
        }
    }
    if(bodyTemp.value.length === 0){
        if(!flag2.value){
            score.value -= 10
            flag2.value = true
        }
    }
    if(rootTemp.value.length === 0){
        if(!flag3.value){
            score.value -= 10
            flag3.value = true
        }
    }
  } else {
    buttons[index].classList.replace("border-transparent", "border-[#49b779]");
    if (number === 1) {
            symptoms.value.push("برگاش سالمه!");
        } if (number === 2) {
            symptoms.value.push("(قهو ای شده");
        } if (number === 3) {
            symptoms.value.push("زرد شده");
        } if (number === 4) {
            symptoms.value.push("(لوله شده)پیچ خورده");
        } if (number === 5) {
            symptoms.value.push("برگاش میریزه");
        } if (number === 6) {
            symptoms.value.push("برگاش سوخته");
        } if (number === 7) {
            symptoms.value.push("برگاش رشد نمیکنه");
        }if (number === 8) {
            symptoms.value.push("برگاش آویزون شده");
        } if (number === 9) {
            symptoms.value.push("(پشت برگاش حشره داره");
        } if (number === 10) {
            symptoms.value.push("ساقه اش سالمه!");
        } if (number === 11) {
            symptoms.value.push("ساقه اش نرم شده");
        } if (number === 12) {
            symptoms.value.push("رنگ ساقه اش عوض شده");
        } if (number === 13) {
            symptoms.value.push("ساقه اش پوک شده");
        } if (number === 14) {
            symptoms.value.push("ساقه هاش رشد نمکنه");
        } if (number === 15) {
            symptoms.value.push("ریشه اش سالمه!");
        } if (number === 15) {
            symptoms.value.push("(نمیبینم)دسترسی ندارم");
        } if (number === 16) {
            symptoms.value.push("ریشه اش پوسیده");
        } if (number === 17) {
            symptoms.value.push("ریشه اش هوا خورده");
        } if (number === 18) {
            symptoms.value.push("از زیر گلدون زده بیرون");
        } if (number === 19) {
            symptoms.value.push("از روی خاک زده بیرون");
        }
    flag[index] = true;

        if(index < 9){
            if (number === 1) {
            leafTemp.value.push("برگاش سالمه!");
        } if (number === 2) {
            leafTemp.value.push("(قهو ای شده");
        } if (number === 3) {
            leafTemp.value.push("زرد شده");
        } if (number === 4) {
            leafTemp.value.push("(لوله شده)پیچ خورده");
        } if (number === 5) {
            leafTemp.value.push("برگاش میریزه");
        } if (number === 6) {
            leafTemp.value.push("برگاش سوخته");
        } if (number === 7) {
            leafTemp.value.push("برگاش رشد نمیکنه");
        }if (number === 8) {
            leafTemp.value.push("برگاش آویزون شده");
        } if (number === 9) {
            leafTemp.value.push("(پشت برگاش حشره داره");
        }
            if (flag1.value) {
                    score.value += 10
                    flag1.value = false
                }
        }if(index < 14 && 9 <= index){
            if (number === 10) {
            bodyTemp.value.push("ساقه اش سالمه!");
        } if (number === 11) {
            bodyTemp.value.push("ساقه اش نرم شده");
        } if (number === 12) {
            bodyTemp.value.push("رنگ ساقه اش عوض شده");
        } if (number === 13) {
            bodyTemp.value.push("ساقه اش پوک شده");
        } if (number === 14) {
            bodyTemp.value.push("ساقه هاش رشد نمکنه");
        }
            if (flag2.value) {
                    score.value += 10
                    flag2.value = false
                }
        }if(14 <= index){
            if (number === 15) {
            rootTemp.value.push("ریشه اش سالمه!");
        } if (number === 15) {
            rootTemp.value.push("(نمیبینم)دسترسی ندارم");
        } if (number === 16) {
            rootTemp.value.push("ریشه اش پوسیده");
        } if (number === 17) {
            rootTemp.value.push("ریشه اش هوا خورده");
        } if (number === 18) {
            rootTemp.value.push("از زیر گلدون زده بیرون");
        } if (number === 19) {
            rootTemp.value.push("از روی خاک زده بیرون");
        }
            if (flag3.value) {
                score.value += 10
                flag3.value = false
            }
        }
    }
}

</script>
<template>
    <div class="max-w-[400px] w-full flex flex-col gap-2 p-[20px] mb-[80px]">

        <div class="shadow-[0_0_5px_0_#c9c9c9] p-[10px] rounded-md flex flex-col gap-[10px] bg-white">

            <div class='flex items-center gap-[5px] text-[12px]'>
                <i>
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19px" height="19px" viewBox="0 0 19 19" enable-background="new 0 0 19 19" xml:space="preserve">  <image id="image0" width="19" height="19" x="0" y="0"
                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAVFBMVEUAAABAr3BIr3hJt3lK
                    t3pKuHpJuHlJuHlJtnlJtnlJt3lItnhIt3hJuHlIt3hKt3pJsnlHtnZItXhIt3hKunpIt3hIt3hJ
                    tnhJtXhJtnlJt3n///+JWQqiAAAAGnRSTlMAECDff2/vr3DPv6Cfz2CfUHBggDBAIJCQUIj8Jc8A
                    AAABYktHRBsCYNSkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wgcDCQLggrjNgAAAJFJ
                    REFUGNN1kNsSgyAMRFdjEaOtlgpt9/8/tHgh+NLzAJMd5iQByDRts11oz3tDSOlwc6SzjL3vOVDz
                    aZkqMHIChrtlD85Lx2dQBsvwysaM87iyxhjXWiaViqY9e7u54j57NsrFIdPfd0loOsrhg2dZM7FM
                    E23UL2MRnxJgrn+gpfOglnmGA9blIgumy/0Ke/UDvy8J5dhyf+EAAAAldEVYdGRhdGU6Y3JlYXRl
                    ADIwMjMtMDgtMjhUMTA6MzY6MTErMDI6MDBSTe0uAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA4
                    LTI4VDEwOjM2OjExKzAyOjAwIxBVkgAAAABJRU5ErkJggg==" />
                    </svg>
                </i>
                <span>علائم بیماری گلت چیاست؟ (چند انتخابی)</span>
            </div>

            <!-- symptom -->
            <div class='flex flex-col gap-3'>
                <div class="flex flex-col gap-3">
                    <span>برگ</span>
                    <div class='grid grid-cols-3 gap-2'>
                        <button v-for="(item,index) in leaf" @click="setSymtom(index +1)" id="symptomButton" class="col-span-1 border border-transparent shadow rounded bg-white">
                            <img :src="serverURL + '/library/images/' + item.image" :alt="item.name" class="w-full rounded-t">
                            <span class="text-[10px] p-1">{{item.name}}</span>
                        </button>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <span>ساقه</span>
                    <div class='grid grid-cols-3 gap-2'>
                        <button v-for="(item,index) in body" @click="setSymtom(index +10)" id="symptomButton" class="col-span-1 border border-transparent shadow rounded bg-white">
                            <img :src="serverURL + '/library/images/' + item.image"  :alt="item.name" class="w-full rounded-t">
                            <span class="text-[10px] p-1">{{item.name}}</span>
                        </button>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <span>ریشه</span>
                    <div class='grid grid-cols-3 gap-2'>
                        <button v-for="(item,index) in root" @click="setSymtom(index +15)" id="symptomButton" class="col-span-1 border border-transparent shadow rounded bg-white">
                            <img :src="serverURL + '/library/images/' + item.image"  :alt="item.name" class="w-full rounded-t">
                            <span class="text-[10px] p-1">{{item.name}}</span>
                        </button>  
                    </div>
                </div>
            </div>

            <!-- description -->
            <div class="p-[15px]">
                <div class="flex gap-[5px] items-center mg-[10px] mb-[5px]">
                    <i class="text-[#63B89D]">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.1875 7.5C15.1875 7.64918 15.2468 7.79226 15.3523 7.89775C15.4577 8.00324 15.6008 8.0625 15.75 8.0625C15.8992 8.0625 16.0423 8.00324 16.1477 7.89775C16.2532 7.79226 16.3125 7.64918 16.3125 7.5H15.1875ZM6.75 17.0625C6.89918 17.0625 7.04226 17.0032 7.14775 16.8977C7.25324 16.7923 7.3125 16.6492 7.3125 16.5C7.3125 16.3508 7.25324 16.2077 7.14775 16.1023C7.04226 15.9968 6.89918 15.9375 6.75 15.9375V17.0625ZM9 16.5L8.45925 16.3455L8.18175 17.3205L9.15675 17.043L9 16.5ZM6.5625 1.5C6.5625 1.35082 6.50324 1.20774 6.39775 1.10225C6.29226 0.996763 6.14918 0.9375 6 0.9375C5.85082 0.9375 5.70774 0.996763 5.60225 1.10225C5.49676 1.20774 5.4375 1.35082 5.4375 1.5H6.5625ZM5.4375 3.75C5.4375 3.89918 5.49676 4.04226 5.60225 4.14775C5.70774 4.25324 5.85082 4.3125 6 4.3125C6.14918 4.3125 6.29226 4.25324 6.39775 4.14775C6.50324 4.04226 6.5625 3.89918 6.5625 3.75H5.4375ZM12.5625 1.5C12.5625 1.35082 12.5032 1.20774 12.3977 1.10225C12.2923 0.996763 12.1492 0.9375 12 0.9375C11.8508 0.9375 11.7077 0.996763 11.6023 1.10225C11.4968 1.20774 11.4375 1.35082 11.4375 1.5H12.5625ZM11.4375 3.75C11.4375 3.89918 11.4968 4.04226 11.6023 4.14775C11.7077 4.25324 11.8508 4.3125 12 4.3125C12.1492 4.3125 12.2923 4.25324 12.3977 4.14775C12.5032 4.04226 12.5625 3.89918 12.5625 3.75H11.4375ZM7.8975 10.1475C7.99686 10.0409 8.05095 9.89983 8.04838 9.75411C8.04581 9.60838 7.98678 9.46934 7.88372 9.36628C7.78066 9.26322 7.64162 9.20419 7.49589 9.20162C7.35017 9.19905 7.20913 9.25314 7.1025 9.3525L7.8975 10.1475ZM6.3525 10.1025C6.25314 10.2091 6.19905 10.3502 6.20162 10.4959C6.20419 10.6416 6.26322 10.7807 6.36628 10.8837C6.46934 10.9868 6.60838 11.0458 6.75411 11.0484C6.89983 11.051 7.04087 10.9969 7.1475 10.8975L6.3525 10.1025ZM5.25 3.1875H12.75V2.0625H5.25V3.1875ZM2.8125 13.5V5.625H1.6875V13.5H2.8125ZM15.1875 5.625V7.5H16.3125V5.625H15.1875ZM6.75 15.9375H5.25V17.0625H6.75V15.9375ZM1.6875 13.5C1.6875 14.4448 2.06283 15.351 2.73093 16.0191C3.39903 16.6872 4.30517 17.0625 5.25 17.0625V15.9375C4.60353 15.9375 3.98355 15.6807 3.52643 15.2236C3.06931 14.7665 2.8125 14.1465 2.8125 13.5H1.6875ZM12.75 3.1875C13.3965 3.1875 14.0165 3.44431 14.4736 3.90143C14.9307 4.35855 15.1875 4.97853 15.1875 5.625H16.3125C16.3125 4.68017 15.9372 3.77403 15.2691 3.10593C14.601 2.43783 13.6948 2.0625 12.75 2.0625V3.1875ZM5.25 2.0625C4.30517 2.0625 3.39903 2.43783 2.73093 3.10593C2.06283 3.77403 1.6875 4.68017 1.6875 5.625H2.8125C2.8125 4.97853 3.06931 4.35855 3.52643 3.90143C3.98355 3.44431 4.60353 3.1875 5.25 3.1875V2.0625ZM14.9843 11.4952L11.223 15.2565L12.0187 16.0522L15.78 12.291L14.9843 11.4952ZM10.2435 14.2762L14.0048 10.515L13.209 9.72L9.44775 13.4813L10.2435 14.2762ZM11.1435 15.3045L8.84775 15.9585L9.156 17.0408L11.4517 16.386L11.1435 15.3045ZM9.543 16.6545L10.1978 14.3588L9.1125 14.0505L8.45775 16.3463L9.543 16.6545ZM9.45 13.4813C9.29189 13.6395 9.17676 13.8354 9.1155 14.0505L10.197 14.3588C10.2057 14.3276 10.2222 14.2992 10.245 14.2762L9.45 13.4813ZM11.2253 15.2565C11.2025 15.2792 11.1744 15.2957 11.1435 15.3045L11.4517 16.386C11.6669 16.3247 11.8628 16.2096 12.021 16.0515L11.2253 15.2565ZM14.9865 10.5157C15.1163 10.6457 15.1892 10.8218 15.1892 11.0055C15.1892 11.1892 15.1163 11.3653 14.9865 11.4952L15.7822 12.291C16.1232 11.9501 16.3147 11.4877 16.3147 11.0055C16.3147 10.5233 16.1232 10.0609 15.7822 9.72L14.9865 10.5157ZM15.78 9.72C15.4391 9.37907 14.9767 9.18754 14.4945 9.18754C14.0123 9.18754 13.5499 9.37907 13.209 9.72L14.0048 10.515C14.1347 10.3852 14.3108 10.3131 14.4945 10.3131C14.6782 10.3131 14.8543 10.386 14.9843 10.5157L15.78 9.72ZM5.4375 1.5V3.75H6.5625V1.5H5.4375ZM11.4375 1.5V3.75H12.5625V1.5H11.4375ZM6.5625 8.25C6.5625 8.89647 6.81931 9.51645 7.27643 9.97357C7.73355 10.4307 8.35353 10.6875 9 10.6875V9.5625C8.6519 9.5625 8.31806 9.42422 8.07192 9.17808C7.82578 8.93194 7.6875 8.5981 7.6875 8.25H6.5625ZM9 10.6875C9.64647 10.6875 10.2665 10.4307 10.7236 9.97357C11.1807 9.51645 11.4375 8.89647 11.4375 8.25H10.3125C10.3125 8.5981 10.1742 8.93194 9.92808 9.17808C9.68194 9.42422 9.3481 9.5625 9 9.5625V10.6875ZM11.4375 8.25C11.4375 7.60353 11.1807 6.98355 10.7236 6.52643C10.2665 6.06931 9.64647 5.8125 9 5.8125V6.9375C9.3481 6.9375 9.68194 7.07578 9.92808 7.32192C10.1742 7.56806 10.3125 7.9019 10.3125 8.25H11.4375ZM9 5.8125C8.35353 5.8125 7.73355 6.06931 7.27643 6.52643C6.81931 6.98355 6.5625 7.60353 6.5625 8.25H7.6875C7.6875 7.9019 7.82578 7.56806 8.07192 7.32192C8.31806 7.07578 8.6519 6.9375 9 6.9375V5.8125ZM7.1025 9.3525L6.3525 10.1025L7.1475 10.8975L7.8975 10.1475L7.1025 9.3525Z"
                                fill="#49B779" />
                        </svg>
                    </i>
                    <span>چیزی مونده بخوی بهمون بگی؟</span>
                </div>
                <div class='flex justify-center items-center border border-transparent rounded'>
                    <textarea v-model="description"  rows="3"
                        class="outline-none input resize-none" placeholder="اینجا میتونی بنویسی..."></textarea>
                </div>
            </div>

        </div>

    </div>
</template>
