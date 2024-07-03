import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    const repository = new InvoiceRepository();
    const findUsecase = new FindInvoiceUsecase(repository);
    const generateUseCase = new GenerateInvoiceUsecase(repository);
    const facade = new InvoiceFacade(findUsecase, generateUseCase);

    const generateInvoiceUseCaseOutputDto = await facade.generate({
      document: "doc 1",
      name: "any_name 1",
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
    });

    expect(generateInvoiceUseCaseOutputDto.id).toBeDefined();
    expect(generateInvoiceUseCaseOutputDto.name).toBe("any_name 1");
    expect(generateInvoiceUseCaseOutputDto.items[0].id).toBeDefined();
  });

  it("should return an invoice", async () => {
    const repository = new InvoiceRepository();
    const findUsecase = new FindInvoiceUsecase(repository);
    const generateUseCase = new GenerateInvoiceUsecase(repository);
    const facade = new InvoiceFacade(findUsecase, generateUseCase);

    const generateInvoiceUseCaseOutputDto = await facade.generate({
      document: "doc 1",
      name: "any_name 1",
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
    });

    const findInvoiceUseCaseOutputDTO = await facade.find({id: generateInvoiceUseCaseOutputDto.id});

    expect(findInvoiceUseCaseOutputDTO.id).toBe(generateInvoiceUseCaseOutputDto.id);
    expect(findInvoiceUseCaseOutputDTO.name).toBe("any_name 1");
    expect(findInvoiceUseCaseOutputDTO.items[0].id).toBeDefined();
  });
});
