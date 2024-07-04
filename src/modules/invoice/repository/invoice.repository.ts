import InvoiceModel from "./invoice.model";
import InvoiceGateway from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice-teims";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemModel from "./invoice-item.model";

export default class InvoiceRepository implements InvoiceGateway {

    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: {id: id},
            include: ["items"],
        });
        const props = this.map(invoiceModel);
        return new Invoice(props)
    }

    private map(invoiceModel: InvoiceModel) {
        const props = {
            id: new Id(invoiceModel.id),
            document: invoiceModel.document,
            name: invoiceModel.name,
            address: new Address(
                invoiceModel.street,
                invoiceModel.number,
                invoiceModel.complement,
                invoiceModel.city,
                invoiceModel.state,
                invoiceModel.zipCode,
            ),
            items: invoiceModel.items.map(i => (new InvoiceItems({
                name: i.name,
                price: i.price,
                id: i.id
            }))),
            createdAt: invoiceModel.createdAt,
            updatedAt: invoiceModel.updatedAt
        };
        return props;
    }

    async generate(invoice: Invoice): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.create({
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                items: invoice.items.map(i => ({
                    id: i.id,
                    price: i.price,
                    name: i.name
                })),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
            },
            {
                include: [{model: InvoiceItemModel}],
            })
        return new Invoice(this.map(invoiceModel))
    }
}
