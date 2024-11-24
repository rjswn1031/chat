"use client"
import "./page.module.css";
import { useRouter } from "next/navigation";

interface obj1 {
  a: Number,
  b:Number,
  c?:Number|String
}

export default function Home() {
  const router = useRouter();
  router.push("/chat")
  return (
    <div>
      <div>home</div>
    </div>
  );
}