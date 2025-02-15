import { MealsRepositoryInterface } from '@/interfaces/meals-repository-interface'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class MealsRepository implements MealsRepositoryInterface {
  async create(data: Prisma.MealCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }
}
