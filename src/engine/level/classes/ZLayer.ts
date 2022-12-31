import GDProperty from "./GDProperty";

export default class ZLayer extends GDProperty {

    public index: number;

    constructor (index: number) {
        super();
        this.index = index;
    }

    serialize(): string {
        // todo: implement
        return "";
    }

}