import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Obtener un usuario por ID
export async function GET(request, { params }) {
    const { id } = params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
      }
  
      return NextResponse.json(user);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 500 });
    }
  }
  
  // Actualizar un usuario
  export async function PUT(request, { params }) {
    const { id } = params;
    const { email, user, password } = await request.json();
  
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingUser) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          email,
          user,
          password: hashedPassword,
        },
      });
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error al actualizar el usuario' }, { status: 500 });
    }
  }
  
  // Eliminar un usuario
  export async function DELETE(request, { params }) {
    const { id } = params;
  
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) }
      });
  
      return NextResponse.json(deletedUser);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Error al eliminar el usuario' },
        { status: 500 }
      );
    }
  }