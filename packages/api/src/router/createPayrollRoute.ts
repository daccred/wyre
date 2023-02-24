import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const createPayrollRoute = router({
    create: protectedProcedure.
        input(
            z.object({
                title: z.string().nonempty(),
                cycle: z.string().nonempty(),
                dueDate: z.date().min(new Date()),
                auto: z.boolean()
            })
        )
        .mutation(async (req) => {
            const { input } = req
            const { title, cycle, dueDate, auto } = input

            const createPayroll = await prisma.payroll.create({
                
            })
        })
})