type InvoiceItemProps = {
    id?: string
    name: string
    price: number
}

export default class InvoiceItems {
    private readonly _id: string
    private readonly _name: string;
    private readonly _price: number;

    constructor(props: InvoiceItemProps) {
        this._name = props.name;
        this._price = props.price;
        this._id = props.id;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}