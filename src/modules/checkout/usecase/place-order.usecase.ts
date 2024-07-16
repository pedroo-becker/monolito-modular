import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {PlaceOrderInputDto, PlaceOrderOutputDto} from "./place-order.dto";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";

export default class PlaceOrderUsecase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;

    constructor(clientFacade: ClientAdmFacadeInterface) {
        this._clientFacade = clientFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientFacade.find({id: input.clientId})
        if (!client) {
            throw new Error("Client not found")
        }
        await this.validateProducts(input);
        return Promise.resolve(undefined);
    }

    private async validateProducts(input: PlaceOrderInputDto) {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }
        // for (const p of input.products) {
        //     const product = await this._productFacade.checkStock({
        //         productId: p.productId,
        //     });
        //     if (product.stock <= 0) {
        //         throw new Error(`Product ${product.productId} is not available in stock`);
        //     }
        // }
    }
}