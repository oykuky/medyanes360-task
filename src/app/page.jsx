"use client";
import CreateNote from "@/components/CreateNote";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="items-center justify-items-center">
      <Header />
      <CreateNote />
    </div>
  );
}
