import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { getAPI } from "@/services/fetchApi";

function NotesContainer({ notes, setNotes }) {
  const getAllNotes = async () => {
    try {
      const data = await getAPI("/notes/getNotes");
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      {Array.isArray(notes) > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
          {notes.map((note, index) =>
            note && note.title && note.content ? (
              <div key={index}>
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </>
  );
}

export default NotesContainer;
