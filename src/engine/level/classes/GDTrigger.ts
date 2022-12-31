import GDProperty from "./GDProperty";
import GDObject from "./GDObject";
import Vector2 from "./Vector2";
import ZLayer from "./ZLayer";

export default class GDTrigger extends GDObject {

    private properties: GDProperty[];

    public constructor (position: Vector2, zLayer: ZLayer, properties: GDProperty[]) {
        super(position, zLayer);
        this.properties = properties;
    }

    public addProperty (property: GDProperty) {
        this.properties.push(property);
    }

    serialize (): string {
        let result = this.properties.reduce((prev, current) => prev + current.serialize(), "");
        return result;
    }

}