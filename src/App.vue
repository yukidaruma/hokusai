<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <router-link to="/">
      <div class="marginals">
        <div class="container">
          <h1 class="text-white font-bold text-3xl">上位勢ホクサイ使い</h1>
        </div>
      </div>
    </router-link>

    <div
      :class="route.name === 'player.details' && 'mt-16'"
      class="container relative flex-grow"
    >
      <div
        class="border-transparent rounded-2xl shadow-2xl m-16 p-8 bg-slate-100 bg-opacity-10"
      >
        <router-view />
      </div>
    </div>

    <div class="marginals footer">
      <div class="container">
        <p class="text-lg">制作</p>
        <div class="flex mt-2 space-x-4">
          <p>
            みーらみあ (<a
              href="https://twitter.com/IloveHokusai_8"
              target="_blank"
              >@IloveHokusai_8</a
            >)
          </p>
          <p>
            ゆきリング (<a
              href="https://twitter.com/IloveHokusai_8"
              target="_blank"
              >@Yukidering</a
            >)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marginals {
  @apply py-4 bg-gray-300 bg-opacity-10;
  &.footer {
    @apply bg-gray-800 bg-opacity-25;
  }
  .container {
    @apply pl-24;
  }
  a {
    @apply underline;
    &:hover {
      @apply text-gray-300;
    }
  }
}

.container {
  @apply mx-auto w-full max-w-7xl;
}
</style>
