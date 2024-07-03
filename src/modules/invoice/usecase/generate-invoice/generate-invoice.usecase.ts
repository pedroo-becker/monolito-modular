import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import Invoice from "../../domain/invoice";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/invoice-teims";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
    private invoiceGateway: InvoiceGateway;

    constructor(invoiceGateway: InvoiceGateway) {
        this.invoiceGateway = invoiceGateway;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const props = {
            document: input.document,
            name: input.name,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            ),
            items: input.items.map(i => (new InvoiceItems({
                id: new Id(i.id),
                name: i.name,
                price: i.price,
            })))
        };
        const invoice = new Invoice(props);
        const savedInvoice = await this.invoiceGateway.generate(invoice);
        return {
            id: savedInvoice.id.id,
            document: savedInvoice.document,
            name: savedInvoice.name,
            street: savedInvoice.address.street,
            city: savedInvoice.address.city,
            state: savedInvoice.address.state,
            number: savedInvoice.address.number,
            zipCode: savedInvoice.address.zipCode,
            complement: savedInvoice.address.complement,
            items: savedInvoice.items.map(i => ({
                id: i.id.id,
                name: i.name,
                price: i.price,
            })),
            total: savedInvoice.getTotal(),
        };
    }
}