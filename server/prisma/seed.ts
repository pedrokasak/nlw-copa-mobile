import { PrismaClient } from "@prisma/client"

const prisma  = new PrismaClient


async function main() {
    const user  = await prisma.user.create({
        data: {
            name: 'Pedro Henrique',
            email: 'pedrohesm@gmail.com',
            avatarUrl: 'https://github.com/pedrokasak.png',
        }
    })

    const pool  = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date:'2022-11-05T04:00:00.256Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-12-05T04:00:00.256Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 1,
                    secondTeamPoints: 0,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                }
                }
            }
        }
    })
}

main()