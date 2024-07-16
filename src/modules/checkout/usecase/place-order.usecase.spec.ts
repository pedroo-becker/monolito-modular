import PlaceOrderUsecase from "./place-order.usecase";
import {PlaceOrderInputDto} from "./place-order.dto";

describe("PlaceOrder Usecase", () => {

    describe("execute method", () => {

        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            }
            // @ts-ignore
            const placeOrderUseCase = new PlaceOrderUsecase();
            // @ts-ignore
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "0", products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("Client not found"));
        })

        it("should throw an error when products not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            }

            // @ts-ignore
            const placeOrderUseCase = new PlaceOrderUsecase();

            // @ts-ignore
            const mockValidateProducts = jest.spyOn(placeOrderUseCase, "validateProducts")
                // @ts-ignore
                .mockRejectedValue(new Error("No products selected"));
            // @ts-ignore
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "1", products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("No products selected"));
        })
    })

})