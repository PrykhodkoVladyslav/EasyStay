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
});

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
