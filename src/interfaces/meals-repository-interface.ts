import { Meal, Prisma } from '@prisma/client'

export interface MealsRepositoryInterface {
  create(data: Prisma.MealCreateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  update(id: string, data: Prisma.MealUpdateInput): Promise<Meal>
  delete(id: string): Promise<void>
  findAll(userId: string): Promise<Meal[]>
}
