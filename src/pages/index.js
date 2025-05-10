import Counter from "@/components/Counter";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Demo counter for redux
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register");
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gray-100 space-y-6" >
      {/* <Counter /> */}
    </div >
  );
}
