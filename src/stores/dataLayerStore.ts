import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DataLayerFormSchema, type EventLayerForm, type Parameter } from '@/schemas/validation';
import { useToast } from '@/components/ui/toast';
import { useFieldArray, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { v4 as uuidv4 } from 'uuid';
const { toast } = useToast();

export const useDataLayerStore = defineStore('dataLayer', () => {
  const generatedScript = ref<string>('');
  const { errors, defineField, handleSubmit, meta } = useForm<EventLayerForm>({
    validationSchema: toTypedSchema(DataLayerFormSchema),
    initialValues: {
      eventName: '',
      triggerSelector: '',
      parameterList: [
        {
          id: uuidv4(),
          key: '',
          valueSelector: '',
        },
      ],
    },
  });

  const [eventName, eventNameProps] = defineField('eventName');
  const [triggerSelector, triggerSelectorProps] = defineField('triggerSelector');
  const { fields: parameterList, push, remove } = useFieldArray<Parameter>('parameterList');

  const addNewParameter = () => {
    push({
      id: uuidv4(),
      key: '',
      valueSelector: '',
    });
  };

  const deleteParameterById = (id: string) => {
    remove(parameterList.value.findIndex((param) => param.value.id === id));
  };

  const getFieldError = (
    errors: Record<string, string | undefined>,
    index: number,
    field: 'key' | 'valueSelector'
  ) => {
    const errorKey = `parameterList[${index}].${field}`;
    return meta.value.touched ? errors[errorKey] || '' : '';
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

  const onSubmit = handleSubmit((formValues) => {
    generateDataLayerScript({
      eventName: formValues.eventName,
      triggerSelector: formValues.triggerSelector,
      parameterList: formValues.parameterList,
    });
  });

  return {
    generatedScript,
    generateDataLayerScript,
    eventName,
    eventNameProps,
    triggerSelector,
    triggerSelectorProps,
    parameterList,
    errors,
    addNewParameter,
    deleteParameterById,
    getFieldError,
    onSubmit,
  };
});
