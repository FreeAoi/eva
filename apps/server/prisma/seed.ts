import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    const career = await prisma.career.create({
        data: {
            name: 'Ingeniería en computacion'
        }
    });

    const salt = genSaltSync(2);

    const student = await prisma.student.create({
        data: {
            career: {
                connect: {
                    id: career.id
                }
            },
            email: 'beautiful@gmail.com',
            password: hashSync('superpassword', salt),
            firstName: 'Rodolfo',
            lastName: 'Gonzalez',
            id: '2022-0381U'
        }
    });

    const teacher = await prisma.teacher.create({
        data: {
            email: 'email@gmail.com',
            password: hashSync('superpassword', salt),
            firstName: 'Rodolfo',
            lastName: 'Gonzalez',
            id: '2022-0381U',
            active: true
        }
    });

    console.log({ career, student, teacher });
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
