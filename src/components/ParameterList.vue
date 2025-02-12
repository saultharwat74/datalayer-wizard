<script setup lang="ts">
  import { useDataLayerStore } from '@/stores/dataLayerStore';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';

  const store = useDataLayerStore();

  const updateParameter = (index: number, field: 'key' | 'valueSelector', event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    store.parameterList[index][field] = value;
  };
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h4 class="text-sm font-medium">Parameters</h4>
      <Button
        variant="outline"
        size="sm"
        type="button"
        @click="store.addNewParameter"
      >
        Add Parameter
      </Button>
    </div>

    <Accordion
      default-value="0"
      type="single"
      collapsible
      class="max-h-80 overflow-y-auto space-y-4 border border-gray-200 rounded-lg p-4"
    >
      <AccordionItem
        v-for="(param, index) in store.parameterList"
        :key="param.id"
        :value="String(index)"
      >
        <AccordionTrigger class="p-4 hover:no-underline">
          Parameter {{ index + 1 }}
        </AccordionTrigger>
        <AccordionContent>
          <div class="grid grid-cols-2 gap-4 p-5 rounded-md dark:bg-slate-800 bg-slate-50">
            <div class="space-y-2">
              <Label>Key</Label>
              <Input
                v-model="param.key"
                placeholder="e.g., product_name"
                @input="updateParameter(index, 'key', $event)"
              />
            </div>
            <div class="space-y-2">
              <Label>Value Selector</Label>
              <Input
                v-model="param.valueSelector"
                placeholder="e.g., .product-price"
                @input="updateParameter(index, 'valueSelector', $event)"
              />
            </div>
          </div>
          <Button
            v-if="store.parameterList.length > 1"
            type="button"
            variant="destructive"
            size="sm"
            class="mt-4 w-full"
            @click="store.deleteParameterById(param.id)"
          >
            Remove Parameter
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
