import {Column, ForeignKey, Model, PrimaryKey, Table, BelongsTo} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoice_id: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice: InvoiceModel;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
}