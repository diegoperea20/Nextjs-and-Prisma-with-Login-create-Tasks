import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'

export async function POST(request) {
  const { user, title, description } = await request.json();

  try {
    const newTask = await prisma.task.create({
      data: {
        user,
        title,
        description,
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al crear la tarea' },
      { status: 500 }
    );
  }
}

  export async function GET() {
    try {
      const tasks = await prisma.task.findMany();
      return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error al obtener las tareas" }, { status: 500 });
    }
  }