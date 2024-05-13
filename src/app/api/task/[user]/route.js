import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'

//note no se puede sobre poner params es decir esta ruta en tasks/[user] o dentro de tasks/[id]
// Obtener tareas por usuario /tasks/:user
// Controlador para obtener todas las tareas de un usuario específico
export async function GET(request, { params }) {
    const { user } = params;
  
    try {
      const tasks = await prisma.task.findMany({
        where: { user },
      });
  
      // Si no se encuentran tareas, devolver un arreglo vacío
      return NextResponse.json(tasks);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Error al obtener las tareas' },
        { status: 500 }
      );
    }
  }