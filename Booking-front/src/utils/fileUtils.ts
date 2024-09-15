export const isImageFile = (fileName: string) => {
    return /\.(jpg|jpeg|png|webp)$/i.test(fileName);
};