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
  <img class="mx-auto rounded-full w-36" :src="player.image" />
  <div class="text-center">
    <h2 class="text-white text-3xl mt-8">{{ player.name }}</h2>

    <div class="mt-4 divide-x-2 divide-gray-50 divide-opacity-10 social-icons">
      <a
        v-if="player.twitter"
        @click.stop
        :href="`https://twitter.com/${player.twitter}`"
        target="_blank"
      >
        <fa class="color-twitter" icon="fa-brands fa-twitter" />
      </a>
      <a
        v-if="player.youtube"
        :href="`https://www.youtube.com/channel/${player.youtube}`"
        target="_blank"
      >
        <fa class="color-youtube" icon="fa-brands fa-youtube" />
      </a>
    </div>

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
.social-icons {
  > a {
    @apply px-4 text-2xl;
  }
}

.tweet-container > div > div {
  @apply mx-auto;
}
</style>
