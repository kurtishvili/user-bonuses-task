export class PaginatorModel {
    public pageNumber?: number;
    public pageSize?: number;
    public options?: number[];
    public totalRecords?: number;

    constructor(pageNumber: number, pageSize: number) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.options = [10, 20, 50];
        this.totalRecords = 0;
    }
}