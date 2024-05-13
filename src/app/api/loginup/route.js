import { NextResponse } from "next/server"; 
import prisma from '@/libs/db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function POST(request) {
  const { email, user, password } = await request.json();

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { user } });
    if (existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        user,
        password: hashedPassword,
      },
    });

    // Generar un token JWT
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
  }
}


export async function GET() {
    try {
      // Obtener todos los usuarios
      const users = await prisma.user.findMany();
  
      return NextResponse.json(users);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
    }
  }