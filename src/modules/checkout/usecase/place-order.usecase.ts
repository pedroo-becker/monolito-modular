import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {PlaceOrderInputDto, PlaceOrderOutputDto} from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface {
    constructor() {
    }

    execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        return Promise.resolve(undefined);
    }
}