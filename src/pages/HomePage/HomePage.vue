<script setup lang="ts">
import rawPlayers from '@/players';
import { computed, ref } from 'vue';

const search = ref('');

const searchKeys: Array<keyof typeof rawPlayers[number]> = ['name', 'twitter'];
const players = computed(() => {
  const searchValue = search.value.trim();
  if (!searchValue) {
    return rawPlayers;
  }

  return rawPlayers.filter((player) => {
    return searchKeys.some((key) =>
      (player[key]! as string).includes(searchValue)
    );
  });
});
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-xl">プレイヤー一覧</h2>
    <form class="flex items-center">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <fa icon="fa-search" />
        </div>
        <input
          v-model="search"
          class="bg-gray-500 bg-opacity-20 border border-gray-300 placeholder:text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5"
          placeholder="検索"
        />
      </div>
    </form>
  </div>

  <div class="mt-6 flex flex-col space-y-4">
    <div class="flex p-2 items-center text-center text-shadow">
      <div class="w-20"><!-- Twitterアイコン --></div>
      <div class="w-52">名前</div>
      <div class="w-16">パワー</div>
      <div class="w-32">リンク</div>
    </div>
    <template v-for="player in players" :key="player.name">
      <router-link
        class="block rounded-lg cursor-default hover:bg-gray-50 hover:bg-opacity-25"
        :to="`/players/${player.name}`"
      >
        <div class="flex p-2 items-center text-center">
          <div class="w-20">
            <img class="mx-auto rounded-full w-16" :src="player.image" />
          </div>
          <div class="w-52">{{ player.name }}</div>
          <div class="w-16">
            {{ player.power }}
          </div>
          <div class="flex justify-center items-center w-32 social-links">
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
        </div>
      </router-link>
    </template>
  </div>
</template>

<style scoped lang="scss">
.social-links {
  @apply space-x-2;

  a {
    @apply flex
     justify-center
     items-center
     w-10
     h-10
     rounded-full
     text-xl
    /*
     hover:bg-gray-50
     hover:bg-opacity-25
     */;
  }
}
</style>
