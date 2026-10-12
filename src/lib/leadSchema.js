import { z } from 'zod';

const name = z.string().trim().min(1, 'Enter your name.');
const email = z
  .string()
  .trim()
  .min(1, 'Enter your email address.')
  .pipe(z.email('Enter a valid email address, like name@company.com.'));
const optionalText = z.string().trim().optional();

export const leadSchema = z.discriminatedUnion(
  'type',
  [
    z.object({
      type: z.literal('download'),
      name,
      email,
      company: optionalText,
      program: optionalText,
    }),
    z.object({
      type: z.literal('inquiry'),
      name,
      email,
      company: optionalText,
      message: z
        .string()
        .trim()
        .min(1, 'Tell us what you would like to ask.')
        .max(4000, 'Keep your message under 4,000 characters.'),
      projectType: optionalText,
      projectLocation: optionalText,
      projectArea: z
        .string()
        .trim()
        .regex(/^(\d+(\.\d+)?)?$/, 'Enter the floor area as a number of square metres, like 1200.')
        .optional(),
    }),
  ],
  { error: 'Choose what you need.' },
);

export function zodResolver(schema) {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) return { values: result.data, errors: {} };

    const errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || 'type';
      errors[key] ??= { type: issue.code, message: issue.message };
    }
    return { values: {}, errors };
  };
}
