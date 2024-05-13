import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'

export async function GET(request, { params }) {
  const { user } = params;

  try {
    const query = await prisma.$queryRaw`
      SELECT title, GROUP_CONCAT(email) AS emails
      FROM Task
      JOIN User ON Task.user = User.user
      WHERE Task.user != ${user}
      AND Task.title IN (
        SELECT title
        FROM Task
        WHERE user = ${user}
      )
      GROUP BY title;
    `;

    if (query.length === 0) {
      return NextResponse.json({ message: 'Ningún título coincide con otros usuarios.' });
    }

    const results = query.map(row => ({
      title: row.title,
      emails: row.emails.split(',')
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Ocurrió un error al procesar la solicitud.' }, { status: 500 });
  }
}