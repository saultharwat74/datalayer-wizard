<script setup lang="ts">
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import 'highlight.js/styles/github-dark.css';

  import { useDataLayerStore } from '@/stores/dataLayerStore';
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
  import { Button } from './ui/button';
  import { Check, Copy, Code2 } from 'lucide-vue-next';
  import { onMounted, ref } from 'vue';

  const store = useDataLayerStore();
  hljs.registerLanguage('javascript', javascript);

  const copied = ref(false);
  const codeElement = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (codeElement.value) {
      hljs.highlightElement(codeElement.value);
    }
  });

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(store.generatedScript);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };
</script>

<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        class="gap-2 h-9 px-4 py-2"
      >
        <Code2 class="h-4 w-4" />
        Preview
      </Button>
    </DialogTrigger>
    <DialogContent
      :closeButton="false"
      class="w-[600px]"
    >
      <DialogHeader class="flex flex-row items-center space-y-0 pb-2">
        <div class="flex items-center gap-2">
          <Code2 class="h-5 w-5 text-primary" />
          <DialogTitle class="text-lg font-medium">Preview Generated Code</DialogTitle>
        </div>
      </DialogHeader>

      <div class="w-full border rounded-lg overflow-hidden bg-muted/30">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div class="flex items-center gap-3">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span class="text-sm text-muted-foreground font-medium">event-script.js</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            @click="copyCode"
            class="h-8 w-8 hover:bg-muted/50 transition-colors"
            :class="{ 'text-green-500': copied }"
          >
            <Check
              v-if="copied"
              class="h-4 w-4"
            />
            <Copy
              v-else
              class="h-4 w-4"
            />
          </Button>
        </div>

        <div class="w-full overflow-auto max-h-[400px]">
          <div class="inline-flex min-w-full">
            <div class="flex-none sticky left-0 w-[60px] bg-muted/30 border-r">
              <div
                v-for="i in store.generatedScript.split('\n').length"
                :key="i"
                class="text-sm text-muted-foreground/70 font-mono text-right h-6 pr-4"
              >
                {{ i }}
              </div>
            </div>
            <pre class="flex-1 p-4 m-0"><code
                            ref="codeElement"
                            class="language-javascript text-sm font-mono whitespace-pre"
                        >{{ store.generatedScript }}</code></pre>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-4">
        <Button
          @click="copyCode"
          class="h-9"
        >
          <Copy class="mr-2 h-4 w-4" />
          {{ copied ? 'Copied!' : 'Copy Code' }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style>
  :deep(.hljs) {
    background: transparent !important;
    padding: 0 !important;
  }

  .overflow-auto {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--muted-foreground) / 0.2) transparent;
  }

  .overflow-auto::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .overflow-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-auto::-webkit-scrollbar-thumb {
    background-color: hsl(var(--muted-foreground) / 0.2);
    border-radius: 3px;
  }

  .overflow-auto::-webkit-scrollbar-thumb:hover {
    background-color: hsl(var(--muted-foreground) / 0.4);
  }

  .overflow-auto::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>
