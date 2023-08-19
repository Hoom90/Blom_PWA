<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>
<template>
    <!-- mobile -->
    <div class="max-w-[400px] mx-auto">


        <!-- content -->
        <div class="min-w-[300px] max-w-[500px] mx-auto">
            <RouterView />
        </div>
    </div>
</template>