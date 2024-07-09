export interface DataOrderBook {
    asks: [number, number][];
    bids: [number, number][];
    feed: string; 
    product_id: string;
}