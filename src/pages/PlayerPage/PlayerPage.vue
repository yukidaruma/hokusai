<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Tweet from 'vue-tweet';

import players from '@/players';

const route = useRoute();
const router = useRouter();
const player = players.find((player) => player.name === route.params.player)!;

if (!player) {
  router.push('/');
}
</script>

<template>
  <img class="mx-auto rounded-full w-32" :src="player.image" />
  <div class="text-center">
    <h2 class="text-white text-2xl mt-8">{{ player.name }}</h2>
    <p class="mt-4">{{ player.bio }}</p>

    <div v-if="player.tweet" class="tweet-container mt-8">
      <Tweet :width="500" :tweet-url="player.tweet" />
    </div>
  </div>
</template>

<style lang="scss">
.tweet-container > div > div {
  @apply mx-auto;
}
</style>
