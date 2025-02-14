<script setup lang="ts">
  import { Card, CardContent } from '@/components/ui/card';
  import { Label } from '@/components/ui/label';
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import { useDataLayerStore } from '@/stores/dataLayerStore';
  import { Linkedin } from 'lucide-vue-next';
  import DataLayerScriptPreview from './DataLayerScriptPreview.vue';
  import ParameterList from './ParameterList.vue';
  import { storeToRefs } from 'pinia';

  const store = useDataLayerStore();
  const { errors, eventName, eventNameProps, triggerSelector, triggerSelectorProps } =
    storeToRefs(store);
  const { onSubmit } = store;
</script>

<template>
  <form
    @submit="onSubmit"
    class="max-h-96 p-3 text-[#fff]"
  >
    <Card class="w-full max-w-2xl border-0">
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="eventName">Event Name</Label>
              <Input
                v-model="eventName"
                v-bind="eventNameProps"
                placeholder="e.g., add-to-cart"
                :class="{ 'border-red-500': errors.eventName }"
              />
              <span
                v-if="errors.eventName"
                class="text-red-500 text-sm"
              >
                {{ errors.eventName }}
              </span>
            </div>

            <div class="space-y-2">
              <Label for="triggerSelector">Trigger Selector</Label>
              <Input
                v-model="triggerSelector"
                v-bind="triggerSelectorProps"
                :class="{ 'border-red-500': errors.triggerSelector }"
                placeholder="e.g., .add-to-cart-button"
              />
              <span
                class="text-red-500 text-sm"
                v-if="errors.triggerSelector"
              >
                {{ errors.triggerSelector }}
              </span>
            </div>
          </div>

          <ParameterList />
          <div class="flex gap-2">
            <Button type="submit"> Generate Event </Button>
            <DataLayerScriptPreview />
          </div>
        </div>
      </CardContent>
    </Card>
    <footer class="mt-auto pt-4 border-t border-border">
      <div class="flex flex-col items-center justify-between text-sm text-muted-foreground">
        <span>Created by Ahmed Mostafa</span>
        <a
          href="https://www.linkedin.com/in/ahmedalasar"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 hover:text-[#0A66C2] transition-colors group"
        >
          <Linkedin class="h-4 w-4 text-[#0A66C2]" />
          <span class="group-hover:text-[#0A66C2]">Get in touch now</span>
        </a>
      </div>
    </footer>
  </form>
</template>
