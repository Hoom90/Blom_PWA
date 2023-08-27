<script setup>

</script>
<template>
    <!-- buttons -->
    <div class="flex justify-center items-center">
        <button v-if="stage == 1" @click="saveForm"
            class="text-white bg-[#49B779] font-semibold rounded-md max-w-[200px] w-full px-2 p-1 shadow-[0_4px_4px_0_#c9c9c9]">
            مرحله بعدی
        </button>
        <button v-if="stage == 2" @click="saveForm"
            class="text-white bg-[#49B779] font-semibold rounded-md max-w-[200px] w-full px-2 p-1 shadow-[0_4px_4px_0_#c9c9c9]">
            ثبت اطلاعات
        </button>
        <div v-if="stage == 3" class="flex gap-[10px]">
            <button @click="saveForm"
                class="text-white bg-[#49B779] font-semibold rounded-md p-1 px-3 shadow-[0_4px_4px_0_#c9c9c9]">
                دریافت نسخه
            </button>
            <!-- <button @click="stage == 1" to="/garden" class="text-white bg-[#49B779] font-semibold rounded-md p-1 px-3 shadow-[0_4px_4px_0_#c9c9c9]">
                        دریافت نسخه
                    </button> -->
            <!-- <button v-if="!compeleteInfo" @click="setInformation" class="text-[#49b779] p-1 px-3 semibold">
                        تکمیل اطلاعات
                    </button> -->
        </div>
    </div>
</template>

