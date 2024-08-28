import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import { z } from "zod";

export const CityCreateSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    longitude: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -180 && num <= 180;
        },
        { message: "Довгота повинна бути між -180 і 180" },
    ),
    latitude: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -90 && num <= 90;
        },
        { message: "Широта повинна бути між -90 і 90" },
    ),
    countryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Країна є обов'язковою",
    }),
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

export type CityCreateSchemaType = z.infer<typeof CityCreateSchema>;

export const CityEditSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    longitude: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -180 && num <= 180;
        },
        { message: "Довгота повинна бути між -180 і 180" },
    ),
    latitude: z.string().refine(
        (val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num >= -90 && num <= 90;
        },
        { message: "Широта повинна бути між -90 і 90" },
    ),
    countryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Країна є обов'язковою",
    }),
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

export type CityEditSchemaType = z.infer<typeof CityEditSchema>;