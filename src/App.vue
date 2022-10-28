<script setup lang="ts">
//
</script>

<template>
  <div class="min-h-full flex flex-col">
    <router-link to="/">
      <div class="py-4 pl-16 bg-gray-300 bg-opacity-10">
        <h1 class="text-white font-light text-3xl">ホクサイプレイヤー名鑑</h1>
      </div>
    </router-link>

    <div
      class="border-transparent rounded-2xl shadow-2xl m-16 p-8 bg-slate-100 bg-opacity-10"
    >
      <router-view />
    </div>
  </div>
</template>
