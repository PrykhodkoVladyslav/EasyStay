import { z } from "zod";
import {ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE} from "constants/index.ts";

export const SignInSchema = z.object({
    email: z.string().email("Неправильний формат електронної пошти"),
    password: z.string().min(6, "Пароль має містити не менше 6 символів"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const RegistrationSchema = z.object({
    firstName: z.string().min(1, "Ім'я не може бути порожнім"),
    lastName: z.string().min(1, "Прізвище не може бути порожнім"),
    image: z
        .any()
        .transform((files) => (files ? Array.from(files) : []))
        .refine((files: any[]) => files.length > 0, `Зображення є обов'язковим`)
        .refine((files: any[]) => files.length <= 1, `Максимальна кількість фото - 1`)
        .refine(
            (files: any[]) =>
                files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
            `Максимальний розмір файлу - 5MB`,
        )
        .refine(
            (files: any[]) =>
                files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
            "Приймаються лише файли у форматах .jpg, .jpeg, .png та .webp",
        ),
    email: z
        .string()
        .min(1,  "Дане поле повинно бути заповнене")
        .email("Неправильний формат електронної пошти"),
    username: z
        .string()
        .min(3, "Ім'я користувача повинно містити не менше 3 символів")
        .max(20, "Ім'я користувача не повинно перевищувати 20 символів"),
    password: z
        .string()
        .min(1, "Дане поле повинно бути заповнене")
        .min(6, "Пароль повинен містити не менше 6 символів")
        .max(100, "Пароль не повинен перевищувати 100 символів"),
    type: z.enum(["Customer", "Realtor"], "Тип користувача повинен бути або 'user' або 'realtor'"),
});

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
