import { Artwork } from "./Artwork.ts";

export class Statue implements Artwork {
    title: string;
    year: number;
    price: number;
    height: number;

    constructor(title: string, year: number, price: number, height: number) {
        this.title = title;
        this.year = year;
        this.price = price;
        this.height = height;
    }

    setTitle(title: string): void {
        if (title.length == 0) {
            throw new Error("A név nem lehet üres!");
        }
        else if (!/^[a-zA-z\,\-]+$/.test(title)) {
            throw new Error("A név nem felel meg a formai szabályoknak!");
        }
        this.title = title;
    }

    setHeight(height: number): void {
        if (isNaN(height)) {
            throw new Error("A magasság nem lehet üres!");
        }
        else if (height < 10) {
            throw new Error("A magasság nem lehet kevessebb, mint 10cm!");
        }
        this.height = height;
    }



}