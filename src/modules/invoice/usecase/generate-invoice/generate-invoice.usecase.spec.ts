import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice-teims";
import Address from "../../../@shared/domain/value-object/address";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const invoice = new Invoice({
    document: "doc",
    id: new Id("1"),
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
    items: [new InvoiceItems({id: "1", name: "name", price: 10})]
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Generate Invoice Use Case", () => {
    it("should generate and return an invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(invoiceRepository);

        const input = {
            name: "Invoice",
            document: "doc",
            street: "street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zip",
            items: [{
                id: "1",
                name: "name",
                price: 10
            }]
        }

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe("Invoice");
        expect(result.document).toBe("doc");
        expect(result.items.length).toBe(1);
        expect(result.state).toBe("state");
        expect(result.city).toBe("city");
        expect(result.street).toBe("street");
        expect(result.zipCode).toBe("zip");
    });
});

