export interface RetrieveCalculatedStats {
    type: string;
    collection_name: string;
    budget: number;
    range?: string;
}