// src/schemas/bookSchema.ts

import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Enter a book title."),
  author: z.string().min(1, "Enter the book author."),
  genre: z.string().min(1, "Enter the book genre."),
});

export type BookFormValues = z.infer<
  typeof bookSchema
>;