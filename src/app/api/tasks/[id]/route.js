import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'

// Controlador para actualizar una tarea específica por su ID
export async function PUT(request, { params }) {
    const { id } = params;
    const { user, title, description } = await request.json();
  
    try {
      const updatedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: {
          user,
          title,
          description,
        },
      });
  
      return NextResponse.json(updatedTask);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Error al actualizar la tarea' },
        { status: 500 }
      );
    }
  }

export async function DELETE(request, { params }) {
    const { id } = params;
  
    try {
      const deletedTask = await prisma.task.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json(deletedTask);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Error al eliminar la tarea' },
        { status: 500 }
      );
    }
  }



