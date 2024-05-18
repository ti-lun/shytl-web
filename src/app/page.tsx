"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/techlifegame.png";

function Home() {
  return (
    <div>
      <Image src={logo} alt="Tommy Wiseau" height={300} />
      <Link href="/desktop">Desktoppu</Link>
      <Link href="/gameroom">Gameroom</Link>
    </div>
  );
}

export default Home;
