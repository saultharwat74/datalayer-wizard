<script setup lang="ts">
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  import { useDataLayerStore } from '@/stores/dataLayerStore';
  import { storeToRefs } from 'pinia';

  const store = useDataLayerStore();
  const { parameterList, errors } = storeToRefs(store);
  const { addNewParameter, deleteParameterById, getFieldError } = store;
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h4 class="text-sm font-medium">Parameters</h4>
      <Button
        variant="outline"
        size="sm"
        type="button"
        @click="addNewParameter"
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
        v-for="(param, index) in parameterList"
        :key="param.value.id"
        :value="String(index)"
      >
        <AccordionTrigger class="p-4 hover:no-underline">
          Parameter {{ index + 1 }}
        </AccordionTrigger>
        <AccordionContent>
          <div class="grid grid-cols-2 gap-4 p-5 rounded-md dark:bg-slate-800 bg-slate-50">
            <div class="space-y-2">
              <Label>Key</Label>
              <div class="space-y-1">
                <Input
                  v-model="param.value.key"
                  :class="{ 'border-red-500': getFieldError(errors, index, 'key') }"
                  placeholder="e.g., product_name"
                  class="w-full"
                />
                <span
                  v-if="getFieldError(errors, index, 'key')"
                  class="text-red-500 text-xs"
                >
                  {{ getFieldError(errors, index, 'key') }}
                </span>
              </div>
            </div>
            <div class="space-y-2">
              <Label>Value Selector</Label>
              <div class="space-y-1">
                <Input
                  v-model="param.value.valueSelector"
                  :class="{ 'border-red-500': getFieldError(errors, index, 'valueSelector') }"
                  placeholder="e.g., .product-price"
                  class="w-full"
                />
                <span
                  v-if="getFieldError(errors, index, 'valueSelector')"
                  class="text-red-500 text-xs"
                >
                  {{ getFieldError(errors, index, 'valueSelector') }}
                </span>
              </div>
            </div>
          </div>
          <Button
            v-if="parameterList.length > 1"
            type="button"
            variant="destructive"
            size="sm"
            class="mt-4 w-full"
            @click="deleteParameterById(param.value.id)"
          >
            Remove Parameter
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
