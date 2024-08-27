import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import { z } from "zod";

export const AddressSchema = z.object({
    street: z.string().min(1, "Вулиця є обов'язковою"),
    houseNumber: z.string().min(1, "Номер будинку є обов'язковим"),
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
    cityId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Місто є обов'язковим",
    }),
});

export const HotelCreateSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    description: z.string().min(1, "Опис є обов'язковим"),
    area: z.string().refine((val) => val > 0, "Площа повинна бути більше 0"),
    numberOfRooms: z.string().refine((val) => val > 0, "Кількість кімнат повинна бути більше 0"),
    categoryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Тип є обов'язковим",
    }),
    address: AddressSchema,
    photos: z
        .any()
        .transform((files) => (files ? Array.from(files) : []))
        .refine((files: any[]) => files.length > 0, `Мінімальна кількість фото - 1`)
        .refine((files: any[]) => files.length <= 10, `Максимальна кількість фото - 10`)
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

export type HotelCreateSchemaType = z.infer<typeof HotelCreateSchema>;

export const HotelEditSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    description: z.string().min(1, "Опис є обов'язковим"),
    area: z.string().refine((val) => parseFloat(val) > 0, "Площа повинна бути більше 0"),
    numberOfRooms: z.string().refine((val) => parseInt(val) > 0, "Кількість кімнат повинна бути більше 0"),
    categoryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Тип є обов'язковим",
    }),
    address: AddressSchema,
    photos: z
        .any()
        .transform((files) => (files ? Array.from(files) : []))
        .refine(
            (files: any[]) => files.length <= 10,
            `Максимальна кількість фото - 10`,
        )
        .refine(
            (files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
            `Максимальний розмір файлу - 5MB`,
        )
        .refine(
            (files: any[]) =>
                files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
            "Приймаються лише файли у форматах .jpg, .jpeg, .png та .webp",
        )
        .optional(), // Photos can be optional during editing
});

export type HotelEditSchemaType = z.infer<typeof HotelEditSchema>;

// export const RoomCreateSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     price: z.string().refine(
//         (val) => {
//             const num = parseFloat(val);
//             return !isNaN(num) && num > 0;
//         },
//         { message: "Price must be greater than 0" },
//     ),
//     adultPlaces: z.string().refine(
//         (val) => {
//             const num = parseFloat(val);
//             return !isNaN(num) && num > 0;
//         },
//         { message: "Adult places must be greater than 0" },
//     ),
//     childrenPlaces: z.string().refine(
//         (val) => {
//             const num = parseFloat(val);
//             return !isNaN(num);
//         },
//         { message: "Children places must be a number" },
//     ),
//     photos: z
//         .any()
//         .transform((files) => (files ? Array.from(files) : []))
//         .refine((files: any[]) => files.length <= 5, `Max photo count is 5.`)
//         .refine(
//             (files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
//             `Max file size is 5MB.`,
//         )
//         .refine(
//             (files: any[]) =>
//                 files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
//             "Only .jpg, .jpeg, .png and .webp files are accepted.",
//         ),
//     convenienceIds: z.array(z.number()).nonempty("Convenience IDs must be an array and cannot be empty"),
// });

// export type RoomCreateSchemaType = z.infer<typeof RoomCreateSchema>;
