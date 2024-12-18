-- Check if columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'Order';

-- AlterTable
BEGIN;

-- Only add columns that don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'Order' AND column_name = 'totalPrice') THEN
        ALTER TABLE "Order" ADD COLUMN "totalPrice" FLOAT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'Order' AND column_name = 'details') THEN
        ALTER TABLE "Order" ADD COLUMN "details" TEXT;
    END IF;
END $$;

-- Update existing records
UPDATE "Order" 
SET "totalPrice" = 0.0
WHERE "totalPrice" IS NULL;

-- Make columns required
ALTER TABLE "Order" ALTER COLUMN "totalPrice" SET NOT NULL;

COMMIT;