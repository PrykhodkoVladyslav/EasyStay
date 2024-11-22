import { z } from "zod";

export const RoomCreateSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Назва є обов'язковою"),
    area: z.preprocess((val) => (val ? Number(val) : 0), z.number().min(1, "Площа є обов'язковою")),
    numberOfRooms: z.preprocess((val) => (val ? Number(val) : 0), z.number().min(1, "Кількість кімнат є обов'язковою")),
    quantity: z.preprocess((val) => (val ? Number(val) : 0), z.number().min(0, "Кількість не може бути меншою за 0")),
    hotelId: z.number().optional(),
    roomTypeId: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
        message: "Тип номеру є обов'язковим",
    }),
    rentalPeriodIds: z.array(z.any().optional()).optional(),
    roomAmenityIds: z.array(z.any().optional()).optional(),
});

export type RoomCreateSchemaType = z.infer<typeof RoomCreateSchema>;
