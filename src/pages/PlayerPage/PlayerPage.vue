<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Tweet from 'vue-tweet';

import players from '@/players';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const player = players.find((player) => player.name === route.params.player)!;

if (!player) {
  router.push('/');
}

const isLoadingTweet = ref(true);
</script>

<template>
  <img class="mx-auto rounded-full w-32" :src="player.image" />
  <div class="text-center">
    <h2 class="text-white text-2xl mt-8">{{ player.name }}</h2>
    <p class="mt-4">{{ player.bio }}</p>
    <p class="mt-8">{{ player.bio }}</p>

    <div v-if="player.tweet" class="tweet-container mt-8">
      <div
        v-if="isLoadingTweet"
        role="status"
        class="flex justify-center items-center text-4xl h-60"
      >
        <Loading :size="16" />
      </div>
      <Tweet
        @tweet-load-success="isLoadingTweet = false"
        :width="500"
        :tweet-url="player.tweet"
      />
    </div>
  </div>
</template>

<style lang="scss">
.tweet-container > div > div {
  @apply mx-auto;
}
</style>
