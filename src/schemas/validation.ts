import { z } from 'zod';

export const ParameterSchema = z.object({
  id: z.string(),
  key: z.string().min(1, 'Key is required'),
  valueSelector: z.string().min(1, 'Value selector is required'),
});

export const DataLayerFormSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  triggerSelector: z.string().min(1, 'Trigger selector is required'),
  parameterList: z.array(ParameterSchema),
});

export type Parameter = z.infer<typeof ParameterSchema>;
export type EventLayerForm = z.infer<typeof DataLayerFormSchema>;
