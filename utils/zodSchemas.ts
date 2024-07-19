import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ message: "Product name cannot be empty" }),
  description: z.string({ message: "Product description cannot be empty" }),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"], {
    message: "Invalid status",
  }),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
  images: z.array(z.string()).min(1, "Image URL cannot be empty"),
  categoryId: z.string(),
  isFeatured: z.boolean().optional(),
});

export const bannerSchema = z.object({
  title: z.string({ message: "Banner name cannot be empty" }),
  imageString: z.string({ message: "Banner image cannot be empty" }),
});

export const circlePaymentSchema = z.object({});
