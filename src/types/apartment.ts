import { z } from 'zod'

export const ApartmentSchema = z.object({
  agencyId: z.string(),
  hash: z.string(),
  ref: z.string().default(''),
  title: z.string().default(''),
  price: z.string().default(''),
  desc: z.string().default(''),
  sqm: z.string().default(''),
  rooms: z.string().default(''),
  url: z.string().default(''),
  img: z.string().default(''),
})

export type ApartmentData = z.infer<typeof ApartmentSchema>

export const RawApartmentSchema = z.object({
  ref: z.coerce.string().default(''),
  title: z.coerce.string().default(''),
  price: z.coerce.string().default(''),
  desc: z.coerce.string().default(''),
  sqm: z.coerce.string().default(''),
  rooms: z.coerce.string().default(''),
  url: z.coerce.string().default(''),
  img: z.coerce.string().default(''),
})

export type RawApartment = z.infer<typeof RawApartmentSchema>
