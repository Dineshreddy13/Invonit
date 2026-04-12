CREATE TYPE "public"."business_type" AS ENUM('retail', 'wholesale', 'manufacturing', 'service', 'other');--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"legal_name" varchar(150),
	"business_type" "business_type" DEFAULT 'retail',
	"gstin" varchar(15),
	"pan" varchar(10),
	"phone" varchar(15),
	"email" varchar(150),
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"pincode" varchar(10),
	"country" varchar(50) DEFAULT 'India',
	"currency" varchar(10) DEFAULT 'INR',
	"financial_year_start" varchar(5) DEFAULT '04-01',
	"invoice_prefix" varchar(10) DEFAULT 'INV',
	"logo_url" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "businesses_gstin_unique" UNIQUE("gstin")
);
--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;