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

  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })
    return meal
  }

  async update(id: string, data: Prisma.MealUpdateInput) {
    const meal = await prisma.meal.update({
      where: { id },
      data,
    })
    return meal
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: { id },
    })
  }
}
