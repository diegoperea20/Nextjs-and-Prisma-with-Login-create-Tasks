import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'

export async function GET(request, { params }) {
  const { user } = params;

  try {
    const query = await prisma.$queryRaw`
      SELECT COUNT(*) as "Number of titles", title
      FROM Task AS t1
      WHERE (
        SELECT COUNT(*)
        FROM Task AS t2
        WHERE t2.title = t1.title AND t2.user != t1.user
      ) > 0
      AND t1.user = ${user}
      GROUP BY t1.title;
    `;

    if (query.length === 0) {
      return NextResponse.json({ message: 'Ningún título coincide con otros usuarios.' });
    }

    const result = await Promise.all(
      query.map(async ({ title }) => {
        const userCount = await prisma.task.count({ where: { title, user } });
        const otherCount = await prisma.task.count({ where: { title, user: { not: user } } });
        return { 'Number of titles': userCount + otherCount, 'title': title };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Hubo un error al procesar la solicitud.' }, { status: 500 });
  }
}