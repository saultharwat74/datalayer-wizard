<script setup lang="ts">
  import { Button } from '@/components/ui/button';
  import { XIcon } from 'lucide-vue-next';

  defineProps<{
    title: string;
    show: boolean;
  }>();

  const emit = defineEmits<{
    close: [];
  }>();
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div
      v-if="show"
      class="absolute inset-0 bg-black/50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-lg w-[600px] max-h-[80vh] flex flex-col">
        <div class="p-4 border-b flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
          <Button
            variant="ghost"
            size="icon"
            @click="emit('close')"
          >
            <XIcon class="h-4 w-4" />
          </Button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <slot></slot>
        </div>

        <div class="p-4 border-t flex justify-end gap-2">
          <slot name="footer">
            <Button
              variant="secondary"
              @click="emit('close')"
            >
              Close
            </Button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
