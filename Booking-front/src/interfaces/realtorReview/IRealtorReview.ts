export interface IRealtorReview {
    id: number;
    description: string;
    score?: number;
    createdAtUtc: string;
    updatedAtUtc?: string;
    authorId: number;
    author: {
        id: number;
        userName: string;
        firstName: string;
        lastName: string;
        photo: string;
    };
    realtorId: number;
    realtor: {
        id: number;
        userName: string;
        firstName: string;
        lastName: string;
        photo: string;
    };
}