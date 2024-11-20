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
    description: z
        .string()
        .min(1, "Опис є обов'язковим полем")
        .max(4000, "Опис не може перевищувати 4000 символів"),
    phoneNumber: z
        .string()
        .min(1, "Номер телефону є обов'язковим полем")
        .regex(/^\+\d{12}$/, "Використовуйте формат +XXXXXXXXXXXX"),
    dateOfBirth: z
        .string()
        .refine((date) => date.length > 0, "Дата народження є обов'язковою")
        .refine((date) => {
            const parsedDate = new Date(date);
            const minDate = new Date("1900-01-01");
            return parsedDate >= minDate;
        }, {
            message: "Дата народження повинна бути після 01.01.1900",
        })

        .refine((date) => {
            const parsedDate = new Date(date);
            const today = new Date();
            return parsedDate <= today;
        }, {
            message: "Невірна дата.",
        })
        .refine((date) => {
            const parsedDate = new Date(date);
            const today = new Date();
            const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            return parsedDate <= eighteenYearsAgo;
        }, {
            message: "Вам має бути 18 років або більше",
        }),
    citizenshipId: z.coerce
        .number()
        .min(1, "Громадянство є обов'язковим полем"),
    genderId: z.coerce
        .number()
        .min(1, "Стать є обов'язковим полем"),
    address: z
        .string()
        .min(1, "Адреса є обов'язковим полем"),
    cityId: z.coerce
        .number()
        .min(1, "Місто є обов'язковим полем"),
});

export type UpdateRealtorInformationSchemaType = z.infer<typeof UpdateRealtorInformationSchema>;
