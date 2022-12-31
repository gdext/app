import GDProperty from "./GDProperty";

export default class Vector2 extends GDProperty {

    public x: number;
    public y: number;

    constructor (x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    serialize(): string {
        // todo: implement
        return "";
    }

}