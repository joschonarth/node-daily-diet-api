import z from 'zod'

export const mealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date',
    })
    .optional()
    .refine(
      (val) => {
        if (val) {
          const parsedDate = new Date(val)
          const currentDate = new Date()

          return parsedDate <= currentDate
        }
        return true
      },
      {
        message: 'Date cannot be in the future',
      },
    ),
  inDiet: z.boolean(),
})
