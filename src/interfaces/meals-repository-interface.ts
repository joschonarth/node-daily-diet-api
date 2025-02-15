import { Meal, Prisma } from '@prisma/client'

export interface MealsRepositoryInterface {
  create(data: Prisma.MealCreateInput): Promise<Meal>
}
