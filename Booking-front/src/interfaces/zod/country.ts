import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import { z } from "zod";

export const CountryCreateSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    image: z
        .any()
        .transform((files) => (files ? Array.from(files) : []))
        .refine((files: any[]) => files.length > 0, `Зображення є обов'язковим`)
        .refine((files: any[]) => files.length <= 1, `Максимальна кількість фото - 1`)
        .refine(
            (files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
            `Максимальний розмір файлу - 5MB`,
        )
        .refine(
            (files: any[]) =>
                files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
            "Приймаються лише файли у форматах .jpg, .jpeg, .png та .webp",
        ),
});

export type CountryCreateSchemaType = z.infer<typeof CountryCreateSchema>;

export const CountryEditSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
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
});

export type CountryEditSchemaType = z.infer<typeof CountryEditSchema>;