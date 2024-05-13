import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/libs/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "User", type: "text", placeholder: "write user" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        //AQUI comienza login con credenciales , no es necesario y no se debe poner en la api porque no funciona usando PRISMA como backend o pues lo realicé y no funcionó
        const { user, password } = credentials;
        try {
          const userData = await prisma.user.findUnique({ where: { user } });
          if (!userData) {
            return null; // Credenciales inválidas
          }
          const isValidPassword = await bcrypt.compare(password, userData.password);
          if (!isValidPassword) {
            return null; // Credenciales inválidas
          }
          const token = jwt.sign({ user_id: userData.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return { token, user_id: userData.id, username: userData.user };
        } catch (error) {
          console.error(error);
          return null; // Error al iniciar sesión
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: "/",
    
  }
});

export { handler as GET, handler as POST };
