<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Tweet from 'vue-tweet';

import players from '@/players.json';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const player = players.find(
  (player) => player.twitter === route.params.player
)!;

type PlayerDataKey = keyof typeof players[number];
const rankedRules = [
  ['sz', 'エリア'],
  ['tc', 'ヤグラ'],
  ['rm', 'ホコ'],
  ['cb', 'アサリ'],
] as const;
const textContents: Partial<Record<PlayerDataKey, string>> = {
  variant: 'Splatoon 2 で使っていたホクサイ種',
  achievement: '実績',
  rule_good_at: '得意なルール',
  rule_bad_at: '苦手なルール',
  respect: '尊敬する(憧れる)ホクサイ使い',
  rival: 'ライバル',
  enemy_weapon: '相手に来ると苦手な武器',
  memory: '思い出 (スプラ全作で)',
  comment: '一言',
};
const textKeys = Object.keys(textContents) as PlayerDataKey[];

if (!player) {
  router.push('/');
}

const isLoadingTweet = ref(true);
</script>

<template>
  <img
    class="absolute -top-4 left-1/2 -translate-x-1/2 player-image w-36 border-white border-4"
    :src="player.image"
  />

  <div class="h-4"></div>

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

    <h3 class="mt-8 text-xl">Xパワー</h3>
    <table class="mt-2 border-spacing-12 mx-auto">
      <tr>
        <template v-for="[key, name] in rankedRules">
          <th class="min-w-[4rem]">{{ name }}</th>
        </template>
      </tr>
      <tr>
        <template v-for="[key, name] in rankedRules">
          <td class="pt-2 min-w-[4rem]">
            {{ player[`power_${key}`] ?? '-' }}
          </td>
        </template>
      </tr>
    </table>

    <template v-for="key in textKeys">
      <div v-if="player.achievement" class="mt-8">
        <h3>{{ textContents[key] }}</h3>
        <p class="text">{{ player[key] }}</p>
      </div>
    </template>

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

h3 {
  @apply font-bold text-lg;
}
.text {
  @apply mt-2 whitespace-pre-wrap;
}
</style>
