import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const career = await prisma.career.create({
        data: {
            name: 'Ingeniería en computacion'
        }
    });

    const student = await prisma.student.create({
        data: {
            career: {
                connect: {
                    id: career.id
                }
            },
            email: 'beautiful@gmail.com',
            password: 'superpassword',
            firstName: 'Rodolfo',
            lastName: 'Gonzalez',
            id: '2022-0381U',
            role: 'ADMIN'
        }
    });

    console.log({ career, student });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
