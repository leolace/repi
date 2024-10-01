"use client"
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
    console.log("refreshed");
  }

  return <h1 onClick={handleClick}>{JSON.stringify({obj: "teste" })}</h1>;
}

export default Dashboard;
