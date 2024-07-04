import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
    private invoiceGateway: InvoiceGateway;


    constructor(invoiceGateway: InvoiceGateway) {
        this.invoiceGateway = invoiceGateway;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.invoiceGateway.find(input.id);
        return {
            id: invoice.id.id,
            document: invoice.document,
            name: invoice.name,
            address: {
                street: invoice.address.street,
                city: invoice.address.city,
                state: invoice.address.state,
                number: invoice.address.number,
                zipCode: invoice.address.zipCode,
                complement: invoice.address.complement,
            },
            items: invoice.items.map(i => ({
                id: i.id,
                name: i.name,
                price: i.price,
            })),
            total: invoice.getTotal(),
            createdAt: invoice.createdAt
        };
    }
}