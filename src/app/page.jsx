"use client";
import Header from "@/components/Header";
import ShinyButton from "@/components/ui/shiny-button";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  return (
    <div className="bg-gray-200 items-center justify-items-center min-h-screen p-8 pb-20 gap-20">
      <Header />
      <div className="mb-5">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="border-none h-12 rounded-md px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="border-none h-12 rounded-md px-2 py-1 mr-5"
        />
        <ShinyButton
          //   onClick={createNote}
          className="bg-pink-600 h-8 text-white font-bold px-5 rounded"
        >
          Create
        </ShinyButton>
      </div>

    
    </div>
  );
}
