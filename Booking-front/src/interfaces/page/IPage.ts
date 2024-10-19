export default interface IPage<T> {
    data: T[];
    pagesAvailable: number;
    itemsAvailable: number;
}