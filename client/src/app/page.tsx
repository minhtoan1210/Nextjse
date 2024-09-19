import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <div className="w-[1000px] h-[1000px] bg-red-300">
        <Image
          src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={600}
          height={600}
          quality={100}
          alt="demo"
        ></Image>
      </div>
    </main>
  );
}
