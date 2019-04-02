export class Product {
    id: number;
    isDiscontinued: boolean;
    associatedCategoryId: number;
    associatedSnapshotTypeId: number;
    associatedGroupId: number;
    associatedScreenId: number; //nullable 
    associatedImageId: number; //nullable 
    associatedRecycleId: number; //nullable 
    merchantNumber: string;
    productDescription: string;
    aiPartNumber: string;
    manufacture: string;
    manufactureName: string;
    mfgUrl: string;
    mfgManualUrl: string;
    associatedPrimaryVendorId: number; //nullable 
    associatedSecondaryVendorId: number; //nullable 
    associatedTertiaryVendorId: number; //nullable  
    retail: number; //nullable 
    cost: number; //nullable  
    additionalCost: boolean;
    defaultPriority: number; //nulable 
    isTaxable: boolean;
    isRecycleFee: boolean;
    itemsAssociated: string;
    isExcludedDesAinumOverrwrite: boolean;
    costVerificationDate: Date;
    costVerificationBy: number;
    associatedFavoriteIds: string;
    aliases: string;
    isShownOnPickSheet: boolean;
}