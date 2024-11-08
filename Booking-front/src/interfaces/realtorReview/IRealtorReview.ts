export interface IRealtorReview {
    id: number;
    description: string;
    score: number;
    minScore?: number;
    maxScore?: number;
    createdAtUtc: string;
    minCreatedAtUtc?: string;
    maxCreatedAtUtc?: string;
    updatedAtUtc?: string;
    minUpdatedAtUtc?: string;
    maxUpdatedAtUtc?: string;
    authorId: number;
    realtorId: number;
}