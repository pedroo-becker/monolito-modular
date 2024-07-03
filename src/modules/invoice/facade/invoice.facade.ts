import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    FindInvoiceUseCaseInputDTO,
    FindInvoiceUseCaseOutputDTO,
    GenerateInvoiceUseCaseInputDto,
    GenerateInvoiceUseCaseOutputDto
} from "./facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(private findInvoiceUseCase : UseCaseInterface,
                private generateInvoiceUseCase : UseCaseInterface) {
    }

    find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        return this.findInvoiceUseCase.execute(input)
    }

    generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        return this.generateInvoiceUseCase.execute(input)
    }
}
