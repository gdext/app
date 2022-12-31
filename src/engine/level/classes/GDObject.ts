import Vector2 from "./Vector2";
import ZLayer from "./ZLayer";

export default abstract class GDObject {
    
    public position: Vector2;
    public zLayer: ZLayer;

    public constructor (position: Vector2, zLayer: ZLayer) {
        this.position = position;
        this.zLayer = zLayer;
    }

    abstract serialize(): string;

}