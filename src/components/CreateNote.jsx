"use client";
import React, { useState } from "react";
import ShinyButton from "@/components/ui/shiny-button";
import { postAPI } from "@/services/fetchApi";
import NotesContainer from "./NotesContainer";
import { ImSpinner2 } from "react-icons/im";

function CreateNote() {
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createNote = async () => {
    try {
      setIsLoading(true);
      const data = await postAPI("/notes/createNote", newNote);
      setNotes((prevNotes) =>
        Array.isArray(prevNotes) ? [...prevNotes, data] : [data]
      );
      setNewNote({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-7">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="outline-none h-12 rounded-md px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="outline-none h-12 rounded-md px-2 py-1 mr-5"
        />
        <ShinyButton
          onClick={createNote}
          className="bg-pink-600 h-8 text-white font-bold px-5 rounded-full"
        >
          Create
        </ShinyButton>
      </div>
      {isLoading ? (
        <div className="text-gray-500 rounded-full animate-spin justify-center flex ">
          <ImSpinner2 />
        </div>
      ) : (
        <NotesContainer notes={notes} setNotes={setNotes} />
      )}
    </div>
  );
}

export default CreateNote;
