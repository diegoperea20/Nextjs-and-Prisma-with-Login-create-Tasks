import SessionAuthProvider from "@/context/SessionAuthProvider";
import "./globals.css";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body ><div> <SessionAuthProvider>{children}</SessionAuthProvider></div></body>
    </html>
  );
}
