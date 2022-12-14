<script setup lang="ts">
import { computed, ref } from 'vue';
import { orderBy } from 'lodash-es';
import rawPlayers from '@/players.json';
import { useHead } from '@vueuse/head';

const search = ref('');

type RawPlayerType = typeof rawPlayers[number];
const searchKeys: Array<keyof RawPlayerType> = ['name', 'twitter'];

type SortKey = 'all' | 'sz' | 'tc' | 'rm' | 'cb';
const sortKey = ref(null as null | SortKey);
const sortByDesc = ref(false);

const players = computed(() => {
  const searchValue = search.value.trim().toLowerCase();
  const filteredPlayers = searchValue
    ? rawPlayers.filter((player) => {
        return searchKeys.some((key) =>
          (player[key]! as string).toLowerCase().includes(searchValue)
        );
      })
    : rawPlayers;

  if (sortKey.value === null) return filteredPlayers;
  return orderBy(
    filteredPlayers,
    (player) => {
      if (sortKey.value === 'all') {
        const highestKey = getMaxPowerRule(player);
        if (!highestKey) {
          return 0;
        }
        return player[highestKey];
      } else {
        return (player as any)[`power_${sortKey.value}`] ?? 0;
      }
    },
    sortByDesc.value ? 'desc' : 'asc'
  );
});
const getMaxPowerRule = (player: RawPlayerType) => {
  const searchKeys = ['power_sz', 'power_tc', 'power_rm', 'power_cb'] as const;
  const highestKey = searchKeys.reduce((a, b) =>
    (player[a] as number) > (player[b] as number) ? a : b
  );

  if (player[highestKey] === null) {
    return null;
  }
  return highestKey;
};

const setSortBy = (key?: SortKey) => {
  key ??= 'all';

  if (sortKey.value === key) {
    if (sortByDesc.value) {
      // Desc -> Reset sort
      sortKey.value = null;
    } else {
      // Asc -> Desc
      sortByDesc.value = true;
    }
  } else {
    sortByDesc.value = false;
    sortKey.value = key;
  }
};

const sortIcon = (key: SortKey) => {
  const icons = ['fa-solid'];
  if (key === sortKey.value) {
    icons.push(sortByDesc.value ? 'sort-down' : 'sort-up');
  } else {
    icons.push('fa-sort');
  }
  return icons;
};

useHead({
  title: '???????????????????????????',
  meta: [
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: '???????????????????????????',
    },
  ],
});
</script>

<template>
  <div class="sm:flex justify-between items-center">
    <h2 class="text-xl">?????????????????????</h2>
    <form class="mt-2 sm:mt-0 flex items-center" @submit.prevent>
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <fa icon="fa-search" />
        </div>
        <input
          @input="search = ($event.target! as HTMLInputElement).value"
          class="bg-gray-500 bg-opacity-20 border border-gray-300 placeholder:text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5"
          placeholder="??????"
        />
      </div>
    </form>
  </div>

  <div
    class="mt-6 flex flex-col divide-y-2 divide-gray-500 divide-opacity-10 text-base"
  >
    <div class="flex p-2 items-center text-center text-shadow">
      <div class="w-14 sm:w-20"><!-- Twitter???????????? --></div>
      <div class="w-40 sm:w-52">??????</div>
      <div class="show-sp cursor-pointer w-24" @click="setSortBy()">
        <fa :icon="sortIcon('all')"></fa>
        ???????????????
      </div>
      <div class="show-sm cursor-pointer w-16" @click="setSortBy('sz')">
        <fa :icon="sortIcon('sz')"></fa>
        ?????????
      </div>
      <div class="show-sm cursor-pointer w-16" @click="setSortBy('tc')">
        <fa :icon="sortIcon('tc')"></fa>
        ?????????
      </div>
      <div class="show-sm cursor-pointer w-16" @click="setSortBy('rm')">
        <fa :icon="sortIcon('rm')"></fa>
        ??????
      </div>
      <div class="show-sm cursor-pointer w-16" @click="setSortBy('cb')">
        <fa :icon="sortIcon('cb')"></fa>
        ?????????
      </div>
      <div class="show-sm w-32">?????????</div>
    </div>
    <template v-if="players.length === 0">
      <p>???????????????????????????????????????</p>
    </template>
    <template v-for="player in players" :key="player.name">
      <router-link
        class="block cursor-default hover:bg-gray-50 hover:bg-opacity-25"
        :to="`/${player.twitter}`"
      >
        <div class="flex px-2 py-4 items-center text-center">
          <div class="w-14 sm:w-20">
            <img class="player-image mx-auto w-16" :src="player.image" />
          </div>
          <div class="w-40 sm:w-52">{{ player.name }}</div>
          <div class="show-sp w-24">
            <p v-if="getMaxPowerRule(player)" class="whitespace-nowrap">
              {{
                {
                  power_sz: '???',
                  power_tc: '???',
                  power_rm: '???',
                  power_cb: '???',
                }[getMaxPowerRule(player)!]
              }}
              {{ player[getMaxPowerRule(player)!] }}
            </p>
            <p v-else>-</p>
          </div>
          <div class="show-sm w-16">
            {{ player.power_sz ?? '-' }}
          </div>
          <div class="show-sm w-16">
            {{ player.power_tc ?? '-' }}
          </div>
          <div class="show-sm w-16">
            {{ player.power_rm ?? '-' }}
          </div>
          <div class="show-sm w-16">
            {{ player.power_cb ?? '-' }}
          </div>
          <div
            class="social-links hidden sm:flex justify-center items-center w-32"
          >
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
              @click.stop
              :href="`https://www.youtube.com/channel/${player.youtube}`"
              target="_blank"
            >
              <fa class="color-youtube" icon="fa-brands fa-youtube" />
            </a>
            <a
              v-if="player.twitch"
              @click.stop
              :href="`https://www.twitch.tv/${player.twitch}`"
              target="_blank"
            >
              <fa class="color-twitch" icon="fa-brands fa-twitch" />
            </a>
            <div v-if="!player.twitch && !player.youtube" class="w-10"></div>
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

.show-sp {
  @apply block sm:hidden;
}
.show-sm {
  @apply hidden sm:block;
}
</style>
