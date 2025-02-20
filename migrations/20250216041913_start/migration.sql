-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "subcategory" TEXT,
    "category" TEXT,
    "url" TEXT NOT NULL,
    "brand" TEXT,
    "supplier_article_number" TEXT,
    "external_uid" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL,
    "conversion_ratio" DOUBLE PRECISION NOT NULL,
    "images" JSONB NOT NULL,
    "composition" TEXT,
    "web_page" TEXT,
    "article_type" TEXT,
    "accounting_category" TEXT,
    "in_use" BOOLEAN NOT NULL,
    "main_image" TEXT,
    "internal_uid" TEXT,
    "created_by" TEXT NOT NULL,
    "archived_on" TIMESTAMP(3),
    "preferred_uoms" JSONB NOT NULL,
    "storage_instructions" TEXT,
    "modified_date" TIMESTAMP(3) NOT NULL,
    "custom_fields" JSONB NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "allergens" JSONB NOT NULL,
    "name_translations" JSONB NOT NULL,
    "description_translations" JSONB NOT NULL,
    "storage_instructions_translations" JSONB NOT NULL,
    "composition_translations" JSONB NOT NULL,
    "shelf_life_translations" JSONB NOT NULL,
    "short_name" TEXT,
    "short_name_translations" JSONB NOT NULL,
    "allergen_verified" BOOLEAN NOT NULL,
    "nutrition_info" JSONB NOT NULL,
    "additional_info" JSONB NOT NULL,
    "shelf_life" TEXT,
    "carbon_footprint" JSONB NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsedInRecipe" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "UsedInRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outlet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "billing_contact" TEXT,
    "external_name" TEXT,
    "internal_supplier_outlet" JSONB,
    "timezone" TEXT,
    "description" TEXT,
    "procurement_contact" JSONB,
    "contact" JSONB,
    "suppliers" JSONB NOT NULL,
    "menus" JSONB NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainStockItem" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "main_ingredient_id" TEXT NOT NULL,
    "main_ingredient_name" TEXT NOT NULL,
    "stockable_recipe" TEXT,
    "created_by" TEXT NOT NULL,
    "content" TEXT,
    "package_description" JSONB NOT NULL,
    "average_price_per_package" DOUBLE PRECISION,
    "average_price_per_standard_unit" DOUBLE PRECISION,
    "base_stock_item_quantity" DOUBLE PRECISION,
    "base_stock_item_unit" TEXT,
    "base_stock_item_unit_id" TEXT,
    "gtin" TEXT,
    "modified_date" TIMESTAMP(3) NOT NULL,
    "piece" BOOLEAN NOT NULL,
    "stockable" BOOLEAN NOT NULL,
    "weighted" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "name_translations" JSONB NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "MainStockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_first_name" TEXT,
    "contact_last_name" TEXT,
    "email" TEXT,
    "supplier_email_list" JSONB NOT NULL,
    "tax_number" TEXT,
    "customer_number" TEXT,
    "internal_supplier_outlet_id" TEXT,
    "address" JSONB NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierPackage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "stock_item_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "average_price_per_package" DOUBLE PRECISION,
    "average_price_per_standard_unit" DOUBLE PRECISION,
    "supplier_article_number" TEXT,
    "supplier_product_name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "orderable" BOOLEAN NOT NULL,
    "portioning" BOOLEAN NOT NULL,
    "dynamic_pricing_fee" DOUBLE PRECISION,
    "use_dynamic_pricing" BOOLEAN NOT NULL,

    CONSTRAINT "SupplierPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL,
    "modified_date" TIMESTAMP(3) NOT NULL,
    "starting_date" TIMESTAMP(3) NOT NULL,
    "ending_date" TIMESTAMP(3),
    "time_of_day" TEXT,
    "target_profit_margin" DOUBLE PRECISION,
    "tax" DOUBLE PRECISION NOT NULL,
    "created_by" TEXT NOT NULL,
    "current_sell_price" JSONB NOT NULL,
    "sell_price_history" JSONB NOT NULL,
    "custom_fields" JSONB NOT NULL,
    "web_page" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manual_net_weight" DOUBLE PRECISION,
    "subcategory" TEXT,
    "net_weight_unit" TEXT,
    "current_sell_price" JSONB NOT NULL,
    "nutrition_info_per_portion" JSONB NOT NULL,
    "outlet_prices" JSONB NOT NULL,
    "prep_time_passive" TEXT,
    "web_page" TEXT,
    "cuisine" TEXT,
    "remarks" TEXT,
    "recipe_stage" TEXT,
    "sell_price_history" JSONB NOT NULL,
    "modified_date" TIMESTAMP(3) NOT NULL,
    "custom_fields" JSONB NOT NULL,
    "allergens" JSONB NOT NULL,
    "manual_net_volume" DOUBLE PRECISION,
    "net_weight" DOUBLE PRECISION,
    "clones" JSONB NOT NULL,
    "url" TEXT NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "financial" JSONB NOT NULL,
    "is_semi_finished_product" BOOLEAN NOT NULL,
    "cooking_time" TEXT,
    "used_in_menus" JSONB NOT NULL,
    "allergen_verified" BOOLEAN NOT NULL,
    "is_stockable_recipe" BOOLEAN NOT NULL,
    "manual_net_volume_unit" TEXT,
    "steps" JSONB NOT NULL,
    "portion_pieces" INTEGER,
    "carbon_footprint_ingredient_contribution" JSONB NOT NULL,
    "automatically_calculate_carbon_footprint" BOOLEAN NOT NULL,
    "carbon_footprint" JSONB NOT NULL,
    "portion_weight" DOUBLE PRECISION,
    "persons" INTEGER,
    "recipe_class" TEXT,
    "recipe_type" TEXT,
    "prep_time" TEXT,
    "main_image" JSONB NOT NULL,
    "name_translations" JSONB NOT NULL,
    "storage_conditions" TEXT,
    "portion_weight_unit" TEXT,
    "images" JSONB NOT NULL,
    "season" TEXT,
    "composition" TEXT,
    "highly_perishable" BOOLEAN NOT NULL,
    "main_stock_items" JSONB NOT NULL,
    "difficulty" INTEGER,
    "courseId" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutletIngredient" (
    "outletId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "OutletIngredient_pkey" PRIMARY KEY ("outletId","ingredientId")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "waste_percentage" DOUBLE PRECISION,
    "remarks" TEXT,
    "unit" TEXT,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "active_outlet" TEXT,
    "is_beta_access_active" BOOLEAN NOT NULL,
    "permissions" JSONB NOT NULL,
    "outlet_user" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "outlet" JSONB NOT NULL,
    "production_runs" JSONB NOT NULL,
    "tasks" JSONB NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProductionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryStockItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "package_description" JSONB NOT NULL,
    "par" DOUBLE PRECISION,
    "minimum_quantity_required" DOUBLE PRECISION,
    "quantity" DOUBLE PRECISION NOT NULL,
    "stock_value" DOUBLE PRECISION NOT NULL,
    "aggregated_quantity" DOUBLE PRECISION,
    "aggregated_stock_value" DOUBLE PRECISION,

    CONSTRAINT "InventoryStockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OutletToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OutletToRecipe_AB_unique" ON "_OutletToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_OutletToRecipe_B_index" ON "_OutletToRecipe"("B");

-- AddForeignKey
ALTER TABLE "UsedInRecipe" ADD CONSTRAINT "UsedInRecipe_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainStockItem" ADD CONSTRAINT "MainStockItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierPackage" ADD CONSTRAINT "SupplierPackage_stock_item_id_fkey" FOREIGN KEY ("stock_item_id") REFERENCES "MainStockItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierPackage" ADD CONSTRAINT "SupplierPackage_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutletIngredient" ADD CONSTRAINT "OutletIngredient_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutletIngredient" ADD CONSTRAINT "OutletIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OutletToRecipe" ADD CONSTRAINT "_OutletToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OutletToRecipe" ADD CONSTRAINT "_OutletToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
