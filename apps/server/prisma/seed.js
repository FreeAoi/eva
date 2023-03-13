const { PrismaClient } = require('@prisma/client');
const { genSaltSync, hashSync } = require('bcrypt');
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
            firstName: 'Perez',
            lastName: 'Perez',
            id: '2022-0381A',
            faculty: 'Ciencias'
        }
    });

    const group = await prisma.group.create({
        data: {
            name: 'A',
            id: '1M3-CO',
            career: {
                connect: {
                    id: career.id
                }
            },
            students: {
                connect: {
                    id: student.id
                }
            }
        }
    });

    const course = await prisma.course.create({
        data: {
            name: 'Programacion 1',
            group: {
                connect: {
                    id: group.id
                }
            },
            teacher: {
                connect: {
                    id: teacher.id
                }
            },
            id: 'BEAU'
        }
    });

    console.log({ career, student, teacher, group, course });
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
