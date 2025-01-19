<script setup lang="ts">
  import { useColorMode } from '@vueuse/core';
  import { Moon, Sun } from 'lucide-vue-next';

  const mode = useColorMode();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between items-center">
      <div class="flex items-center gap-2">
        <img
          src="@/assets/logo.png"
          alt="DataLayer Wizard"
          class="h-8 w-8"
        />
        <h1 class="text-2xl font-bold">DataLayer Wizard</h1>
      </div>

      <button
        class="border-0 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        @click="mode = mode === 'dark' ? 'light' : 'dark'"
        aria-label="Toggle Theme"
      >
        <Sun
          v-if="mode !== 'dark'"
          class="h-5 w-5"
        />
        <Moon
          v-else
          class="h-5 w-5"
        />
      </button>
    </div>

    <div class="border-b border-gray-200 dark:border-gray-700"></div>
  </div>
</template>
