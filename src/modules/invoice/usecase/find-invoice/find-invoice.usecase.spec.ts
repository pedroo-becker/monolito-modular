import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice-teims";
import Address from "../../../@shared/domain/value-object/address";
import FindInvoiceUsecase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    document: "doc",
    name: "Invoice",
    address: new Address(
        "street",
        "number",
        "complement",
        "city",
        "state",
        "zip"
    ),
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [new InvoiceItems({id: new Id("1"), name: "name", price: 10})]
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find Invoice Use Case", () => {
    it("should return invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUsecase(invoiceRepository);

        const result = await usecase.execute("1");

        expect(result.id).toBe("1");
        expect(result.name).toBe("Invoice");
        expect(result.document).toBe("doc");
        expect(result.items.length).toBe(1);
        expect(result.address).toBeDefined();
        expect(result.createdAt).toBeDefined();
        expect(result.total).toBe(10);
    });
});

