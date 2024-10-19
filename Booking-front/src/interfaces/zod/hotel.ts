import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import {number, z} from "zod";

export const AddressSchema = z.object({
    street: z.string().min(1, "Вулиця є обов'язковою"),
    houseNumber: z.string().min(1, "Номер будинку є обов'язковим"),
    floor: z.string().optional(),
    apartmentNumber: z.string().optional(),
    cityId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Місто є обов'язковим",
    }),
});

export const HotelCreateSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    description: z.string().min(1, "Опис є обов'язковим"),
    arrivalTimeUtcFrom: z.string().min(1, "Час прибуття є обов'язковим").optional(),
    arrivalTimeUtcTo: z.string().min(1, "Час прибуття є обов'язковим").optional(),
    departureTimeUtcFrom: z.string().min(1, "Час виїзду є обов'язковим").optional(),
    departureTimeUtcTo: z.string().min(1, "Час виїзду є обов'язковим").optional(),
    isArchived: z.boolean().optional(),
    address: AddressSchema,
    categoryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Тип є обов'язковим",
    }),
    hotelAmenityIds: z.array(z.any().optional()).optional(),
    breakfastIds: z.array(z.any().optional()).optional(),
    staffLanguageIds: z.array(z.any().optional()).optional(),
    photos: z
        .any()
        .transform((files) => (files ? Array.from(files) : []))
        .refine((files: File[]) => files.length > 0, `Мінімальна кількість фото - 1`)
        .refine((files: File[]) => files.length <= 10, `Максимальна кількість фото - 10`)
        .refine(
            (files: File[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
            `Максимальний розмір файлу - 5MB`,
        )
        .refine(
            (files: File[]) =>
                files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
            "Приймаються лише файли у форматах .jpg, .jpeg, .png та .webp",
        ),
        // .array(z.instanceof(File))

        // .instanceof(File)
        // .array()

        // .object({
        //     array: z.array(z.instanceof(File)),
        // })

        // .min(1, `Мінімальна кількість фото - 1`)
        // .max(10, `Максимальна кількість фото - 10`)
        // .refine(
        //     (files: File[]) =>
        //         files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
        //     "Приймаються лише файли у форматах .jpg, .jpeg, .png та .webp",
        // ),
});

export type HotelCreateSchemaType = z.infer<typeof HotelCreateSchema>;

const HotelCreatePage1Schema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    description: z.string().min(1, "Опис є обов'язковим"),
    arrivalTimeUtcFrom: z.string().min(1, "Час прибуття є обов'язковим"),
    arrivalTimeUtcTo: z.string().min(1, "Час прибуття є обов'язковим"),
    departureTimeUtcFrom: z.string().min(1, "Час виїзду є обов'язковим"),
    departureTimeUtcTo: z.string().min(1, "Час виїзду є обов'язковим"),
    isArchived: z.preprocess((val) => (val === "true" ? true : val === "false" ? false : val), z.boolean()),
    address: AddressSchema,
    categoryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Тип є обов'язковим",
    }),
    hotelAmenityIds: z.array(z.any().optional()).optional(),
    breakfastIds: z.array(z.any().optional()).optional(),
    staffLanguageIds: z.array(z.any().optional()).optional(),
    // hotelAmenityIds: z.array(z.string().transform(val => Number(val))),
    // breakfastIds: z.array(z.string().transform(val => Number(val))),
    // staffLanguageIds: z.array(z.string().transform(val => Number(val))),
});

const HotelCreatePage2Schema = z.object({
    photos: z
        .array(z.instanceof(File))
        .min(1, `Мінімальна кількість фото - 1`)
        .max(10, `Максимальна кількість фото - 10`)
        .refine(
            (files: File[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
            `Максимальний розмір файлу - 5MB`,
        )
        .refine(
            (files: File[]) =>
                files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
            "Приймаються лише файли у форматах .jpg, .jpeg, .png та .webp",
        ),
});

const finalSchema = HotelCreatePage1Schema.and(HotelCreatePage2Schema);




export const HotelEditSchema = z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    description: z.string().min(1, "Опис є обов'язковим"),
    area: z.string().refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num > 0;
        },
        { message: "Площа повинна бути більше 0" },
    ),
    numberOfRooms: z.number().refine((val) => val > 0, "Кількість кімнат повинна бути більше 0"),
    isArchived: z.preprocess((val) => (val === "true" ? true : val === "false" ? false : val), z.boolean()),
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
