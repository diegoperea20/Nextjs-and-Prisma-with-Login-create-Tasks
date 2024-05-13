import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'

export async function GET(request, { params }) {
  const { id, user } = params;

  try {
    const task = await prisma.task.findMany({
      where: {
        id: parseInt(id),
        user,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al obtener la tarea' },
      { status: 500 }
    );
  }
}