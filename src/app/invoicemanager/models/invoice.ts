export class Invoice {
    id: number;
    invoiceDescription: string
    isDisabled: boolean;
    isNoDepositNeeded: boolean;
    associatedCustomerId:number;
    associatedStatusId:number;
    associatedLocation: number;
    associatedCreatorId: number;
    deliveryPayment: number;
    totalEquipment: number;
    totalLabor: number;
    totalProgramming: number;
    totalFreight: number;
    totalWarranty: number;
    totalMisc: number;
}