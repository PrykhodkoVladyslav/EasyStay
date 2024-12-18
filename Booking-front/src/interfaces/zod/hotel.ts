import { z } from "zod";

export const AddressSchema = z.object({
    street: z.string().min(1, "Вулиця є обов'язковою"),
    houseNumber: z.string().min(1, "Номер будинку є обов'язковим"),
    floor: z.preprocess((val) => (val ? Number(val) : undefined), z.number().optional()),
    apartmentNumber: z.string().nullable().optional(),
    cityId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Місто є обов'язковим",
    }),
});

export const HotelCreatePage1Schema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Назва є обов'язковою"),
    description: z.string().min(1, "Опис є обов'язковим"),
    arrivalTimeUtcFrom: z.string().min(1, "Час прибуття є обов'язковим"),
    arrivalTimeUtcTo: z.string().min(1, "Час прибуття є обов'язковим"),
    departureTimeUtcFrom: z.string().min(1, "Час виїзду є обов'язковим"),
    departureTimeUtcTo: z.string().min(1, "Час виїзду є обов'язковим"),
    isArchived: z.preprocess(
        (val) => val === "true",
        z.boolean().optional(),
    ),
    address: AddressSchema,
    categoryId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Тип є обов'язковим",
    }),
    hotelAmenityIds: z.array(z.any().optional()).optional(),
    breakfastIds: z.array(z.any().optional()).optional(),
    staffLanguageIds: z.array(z.any().optional()).optional(),
});

const HotelCreatePage2Schema = z.object({
    photos: z
        .any()
        .transform((files) => (files ? Array.from(files) : [])),
});

export const HotelCreateSchema = HotelCreatePage1Schema.and(HotelCreatePage2Schema);
export type HotelCreateSchemaType = z.infer<typeof HotelCreateSchema>;
