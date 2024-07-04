import {Sequelize} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice-teims";
import InvoiceItemModel from "./invoice-item.model";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save an invoice", async () => {
        const invoice = new Invoice({
            document: "document",
            name: "name",
            address: new Address(
                "street",
                "123",
                "complement",
                "city",
                "state",
                "zipCode",
            ),
            items: [new InvoiceItems({id: "1", name: "itemName", price: 10})]
        })
        const repository = new InvoiceRepository();
        const result = await repository.generate(invoice);
        expect(result.id.id).toBe(invoice.id.id);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.items[0].id).toStrictEqual(invoice.items[0].id);
    });

    it("should return an invoice", async () => {
        const invoice = new Invoice({
            document: "document",
            name: "name",
            address: new Address(
                "street",
                "123",
                "complement",
                "city",
                "state",
                "zipCode",
            ),
            items: [new InvoiceItems({id: "1", name: "itemName", price: 10})]
        })
        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const foundInvoice = await repository.find(invoice.id.id);

        expect(foundInvoice.document).toBe(invoice.document);
        expect(foundInvoice.address.street).toBe(invoice.address.street);
        expect(foundInvoice.address.number).toBe(invoice.address.number);
        expect(foundInvoice.address.complement).toBe(invoice.address.complement);
        expect(foundInvoice.items[0].id).toStrictEqual(invoice.items[0].id);
        expect(foundInvoice.items[0].price).toBe(invoice.items[0].price);
    });
});
