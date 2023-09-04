export interface Collection {
	collection: string;
	symbol: string;
	image: string;
	floor_price: number;
	floor_price_1h?: number;
	listed: number;
	listed_1h?: number;
	volume: number;
	volume_1h?: number;
	mentions: number;
	mentions_1h?: number;
}
