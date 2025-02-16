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

  async findAll(userId: string) {
    const meals = await prisma.meal.findMany({
      where: { userId },
    })
    return meals
  }

  async getSummary(userId: string) {
    const meals = await prisma.meal.findMany({
      where: { userId },
      orderBy: { dateTime: 'asc' },
    })

    const totalMeals = meals.length
    const totalOnDiet = meals.filter((meal) => meal.inDiet).length
    const totalOffDiet = totalMeals - totalOnDiet

    let bestStreak = 0
    let currentStreak = 0

    for (const meal of meals) {
      if (meal.inDiet) {
        currentStreak++
        bestStreak = Math.max(bestStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }

    return {
      totalMeals,
      totalOnDiet,
      totalOffDiet,
      bestStreak,
    }
  }
}
