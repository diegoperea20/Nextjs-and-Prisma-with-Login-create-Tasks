import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'

export async function DELETE(request, { params }) {
  const { user } = params;

  try {
    const deletedTasks = await prisma.task.deleteMany({
      where: { user }
    });

    return NextResponse.json(deletedTasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al eliminar las tareas' },
      { status: 500 }
    );
  }
}