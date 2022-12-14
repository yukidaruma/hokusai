<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

import players from '@/players.json';
import { computed } from '@vue/reactivity';

const route = useRoute();
const router = useRouter();
const player = computed(
  () => players.find((player) => player.twitter === route.params.player)!
);
if (!player.value) {
  router.replace('/');
}

const title = `${player.value.name} | 上位勢ホクサイ使い`;
useHead({
  title,
  meta: [
    {
      property: 'og:type',
      content: 'profile',
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:image',
      content: `https://hokusai.pages.dev${player.value.image}`,
    },
    {
      property: 'twitter:image',
      content: `https://hokusai.pages.dev${player.value.image}`,
    },
  ],
});

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
</script>

<template>
  <img
    class="absolute -top-14 sm:-top-10 md:-top-2 left-1/2 -translate-x-1/2 player-image w-36"
    :src="player.image"
  />

  <div class="h-4"></div>

  <div class="text-center">
    <h2 class="text-white text-3xl mt-16 md:mt-10">{{ player.name }}</h2>

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
      <a
        v-if="player.twitch"
        :href="`https://twitch.tv/${player.twitch}`"
        target="_blank"
      >
        <fa class="color-twitch" icon="fa-brands fa-twitch" />
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
      <div v-if="player[key]" class="mt-8">
        <h3>{{ textContents[key] }}</h3>
        <p class="text" v-linkify="player[key]"></p>
      </div>
    </template>
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
  a {
    @apply underline;
  }
}
</style>
