import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Parameter, EventLayerForm } from '@/schemas/validation';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/toast';

const { toast } = useToast();

export const useDataLayerStore = defineStore('dataLayer', () => {
  const parameterList = ref<Parameter[]>([
    {
      id: uuidv4(),
      key: '',
      valueSelector: '',
    },
  ]);
  const generatedScript = ref<string>('');

  const addNewParameter = () => {
    parameterList.value.push({
      id: uuidv4(),
      key: '',
      valueSelector: '',
    });
  };

  const deleteParameterById = (id: string) => {
    parameterList.value = parameterList.value.filter((param) => param.id !== id);
  };

  const generateDataLayerScript = (formData: EventLayerForm) => {
    const customHTMLTag = `
<script>
  document.addEventListener("click", function (e) {
    if (e.target.matches("${formData.triggerSelector}")) {
      var data = { event: "${formData.eventName}" };
      ${formData.parameterList
        .map(
          (param) => `
      var ${param.key}Element = document.querySelector("${param.valueSelector}");
      data["${param.key}"] = ${param.key}Element ? ${param.key}Element.textContent.trim() : "Not Found";`
        )
        .join('\n')}
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(data);
      console.log("Custom HTML Tag: Event fired with data:", data);
    }
  });
</script>`;

    generatedScript.value = customHTMLTag;
    toast({
      title: 'Success!',
      description: `DataLayer event '${formData.eventName}' has been generated successfully.`,
      duration: 3000,
    });
  };

  return {
    parameterList,
    generatedScript,
    addNewParameter,
    deleteParameterById,
    generateDataLayerScript,
  };
});
