import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email("Неправильний формат електронної пошти"),
    password: z.string().min(6, "Пароль має містити не менше 6 символів"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const RegistrationSchema = z.object({
    firstName: z.string().min(1, "Ім'я не може бути порожнім"),
    lastName: z.string().min(1, "Прізвище не може бути порожнім"),
    email: z
        .string()
        .min(1, "Дане поле повинно бути заповнене")
        .email("Неправильний формат електронної пошти"),
    username: z
        .string()
        .min(3, "Ім'я користувача повинно містити не менше 3 символів")
        .max(20, "Ім'я користувача не повинно перевищувати 20 символів"),
    password: z
        .string()
        .min(8, "Пароль повинен містити не менше 8 символів")
        .max(100, "Пароль не повинен перевищувати 100 символів"),
    type: z
        .enum(["Customer", "Realtor"]),
});

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;

export const CreateAdminSchema = z.object({
    firstName: z.string().min(1, "Ім'я не може бути порожнім"),
    lastName: z.string().min(1, "Прізвище не може бути порожнім"),
    email: z
        .string()
        .min(1, "Дане поле повинно бути заповнене")
        .email("Неправильний формат електронної пошти"),
    username: z
        .string()
        .min(3, "Ім'я користувача повинно містити не менше 3 символів")
        .max(20, "Ім'я користувача не повинно перевищувати 20 символів"),
    password: z
        .string()
        .min(8, "Пароль повинен містити не менше 8 символів")
        .max(100, "Пароль не повинен перевищувати 100 символів"),
});

export type CreateAdminSchemaType = z.infer<typeof CreateAdminSchema>;

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Дане поле повинно бути заповнене")
        .email("Неправильний формат електронної пошти"),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Пароль повинен містити не менше 8 символів")
        .max(100, "Пароль не повинен перевищувати 100 символів"),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const UpdateRealtorInformationSchema = z.object({
    description: z.string().max(4000, "Опис не може перевищувати 4000 символів").optional(),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
    // citizenshipId: z.number().optional(),
    genderId: z.number().optional(),
    address: z.string().optional(),
    cityId: z.string().optional(),
});

export type UpdateRealtorInformationSchemaType = z.infer<typeof UpdateRealtorInformationSchema>;
