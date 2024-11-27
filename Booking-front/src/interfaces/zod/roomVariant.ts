import { z } from "zod";

export const GuestSchema = z.object({
    adultCount: z
        .number()
        .min(1, "Мінімум 1 дорослий"),
    childCount: z.number(),
});

export const BedInfoSchema = z.object({
    singleBedCount: z.number(),
    doubleBedCount: z .number(),
    extraBedCount: z.number(),
    sofaCount: z.number(),
    kingsizeBedCount: z.number(),
}).refine(
    (data) =>
        data.singleBedCount > 0 ||
        data.doubleBedCount > 0 ||
        data.extraBedCount > 0 ||
        data.sofaCount > 0 ||
        data.kingsizeBedCount > 0,
    {
        message: "Ви повинні вказати хоча б один тип ліжка",
        path: [],
    }
);

export const RoomVariantCreateSchema = z.object({
    // id: z.number().optional(),
    discountPrice: z.preprocess((val) => (val ? Number(val) : 0),
        z.number().min(1, "Ціна повинна бути більше 0"),
        z.number().max(1000000, "Ціна не повинна перевищувати 1000000")),
    price: z.preprocess((val) => (val ? Number(val) : 0),
        z.number().max(1000000, "Знижка не повинна перевищувати 1000000"))
        .optional(),
    guest: GuestSchema,
    bedInfo: BedInfoSchema,
});

export type RoomVariantCreateSchemaType = z.infer<typeof RoomVariantCreateSchema>;
