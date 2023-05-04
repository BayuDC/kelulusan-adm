import { PrismaClient } from '@prisma/client';
import { parse } from 'papaparse';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  const file = await fs.readFile('./data/students.csv', 'utf-8');
  const { data: students } = parse(file, {});
  const transactions: any[] = [
    this.prismaService.student.deleteMany({ where: {} }),
  ];
  for (const student of students) {
    if ((student as any[]).length != 4) continue;
    transactions.push(
      this.prismaService.student.create({
        data: {
          nis: student[0],
          name: student[1],
          passwd: await bcrypt.hash(student[2], await bcrypt.genSalt()),
          graduate: student[3] == '1',
        },
      }),
    );
  }

  await this.prismaService.$transaction(transactions);
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
