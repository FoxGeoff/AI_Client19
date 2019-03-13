export class Product {
    id: number;
    isDiscontinued: boolean;
    associatedCategoryId: number;
    associatedSnapshotTypeId: number;
    associatedGroupId: number;
/*
    [Column("associated_screen_id", TypeName = "int(10)")]
    public int? AssociatedScreenId { get; set; }

    [Column("associated_image_id", TypeName = "int(10)")]
    public int? AssociatedImageId { get; set; }

    [Column("associated_recycle_id", TypeName = "int(10)")]
    public int? AssociatedRecycleId { get; set; }

    [Column("merchant_number", TypeName = "varchar(25)")]
    public string MerchantNumber { get; set; }
*/
    productDescription: string;
/*
    [Column("ai-part_number", TypeName = "varchar(10)")]
    public string AiPartNumber { get; set; }

    [Column("manufacture_number", TypeName = "varchar(25)")]
    public string ManufactureNumber { get; set; }

    [Column("manufacture_name", TypeName = "varchar(50)")]
    public string ManufactureName { get; set; }

    [Column("mfg_url", TypeName = "varchar(512)")]
    public string MfgUrl { get; set; }

    [Column("mfg_manual_url", TypeName = "varchar(512)")]
    public string MfgManualUrl { get; set; }

    [Column("associated_primary_vendor_id", TypeName = "int(10)")]
    public int? AssociatedPrimaryVendorId { get; set; }

    [Column("associated_secondary_vendor_id", TypeName = "int(10)")]
    public int? AssociatedSecondaryVendorId { get; set; }

    [Column("associated_tertiary_vendor_id", TypeName = "int(10)")]
    public int? AssociatedTertiaryVendorId { get; set; }

    [Column("retail", TypeName = "double")]
    public double? Retail { get; set; }

    [Column("cost", TypeName = "double")]
    public double? Cost { get; set; }

    [Column("addional_cost", TypeName = "tinyint(1)")]
    public byte AdditionalCost { get; set; }

    [Column("default_priority", TypeName = "double")]
    public double? DefaultPriority { get; set; }

    [Column("is_taxable", TypeName = "tinyint(1)")]
    public sbyte? IsTaxable { get; set; }

    [Column("is_recycle_free", TypeName = "tinyint(1)")]
    public sbyte IsRecycleFee { get; set; }

    [Column("items_associated", TypeName = "text")]
    public string ItemsAssociated { get; set; }

    [Column("is_excluded_des_ainum_overwrite", TypeName = "tinyint(1)")]
    public sbyte IsExcludedDesAinumOverrwrite { get; set; }

    //TODO add default value = null OR make DateTime? (better)
    [Column("cost_verification_date", TypeName = "date")]
    public DateTime? CostVerificationDate { get; set; }

    [Column("cost_verification_by", TypeName = "int(11)")]
    public int CostVerificationBy { get; set; }

    [Column("associated_favorite_ids", TypeName = "text")]
    public string AssociatedFavoriteIds { get; set; }

    [Column("aliases", TypeName = "text")]
    public string Aliases { get; set; }

    [Column("is_shown_on_pick_sheet", TypeName = "tinyint(4)")]
    public sbyte IsShownOnPickSheet { get; set; }
*/
}