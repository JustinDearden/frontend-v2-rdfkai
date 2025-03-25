import { z } from 'zod';
import type { TFunction } from 'i18next';

export const getFormSchema = (t: TFunction) =>
  z.object({
    firstName: z.string().nonempty(t('form.errors.firstNameError')),
    lastName: z.string().nonempty(t('form.errors.lastNameError')),
    email: z
      .string()
      .nonempty(t('form.errors.emailError'))
      .email(t('form.errors.emailInvalid')),
    phone: z
      .string()
      .nonempty(t('editPage.validation.phoneError'))
      .regex(/^[0-9]+$/, t('editPage.validation.phoneNumberRequired'))
      .min(10, t('editPage.validation.phoneNumberMinLen'))
      .max(10, t('editPage.validation.phoneNumberMaxLen')),
  });

export type FormData =
  ReturnType<typeof getFormSchema> extends z.ZodObject<any>
    ? z.infer<ReturnType<typeof getFormSchema>>
    : never;
