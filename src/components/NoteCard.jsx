"use client";
import { deleteAPI, putAPI } from "@/services/fetchApi";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuDelete } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";

function NoteCard({ note, setNotes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
  });
  const { toast } = useToast()

  const updateNote = async (id) => {
    try {
      const data = await putAPI(`/notes/updateNote/?id=${note.id}`, {
        title: editedNote.title,
        content: editedNote.content,
      });

      if (data.success) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, ...editedNote } : note
          )
        );
        toast({
          description: "Not başarıyla güncellendi.",
        })
        setIsEditing(false);
      } else {
        console.error("Updating failed:", data.error);
        toast({
          variant: "destructive",
          description: `Not güncellenemedi ! ${data.error}`,
        })
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteAPI(`/notes/deleteNote?id=${note.id}`);
      toast({
        description: "Not başarıyla silindi.",
      })
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (isEditing) {
    return (
      <div className="my-2 mx-5 flex flex-col rounded-xl w-[15rem] md:w-[22rem] h-56 bg-orange-100">
        <div className="bg-rose-200 rounded-tl-xl rounded-tr-xl mt-0">
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
            className="w-full px-2 bg-transparent outline-none h-10"
          />
        </div>

        <div className="p-2">
          <textarea
            value={editedNote.content}
            onChange={(e) =>
              setEditedNote({ ...editedNote, content: e.target.value })
            }
            className="w-full h-28 bg-transparent outline-none resize-none"
          />
        </div>

        <div className="flex justify-between mt-auto px-2 pb-2">
          <button
            onClick={() => updateNote(note.id)}
            className="bg-orange-400 rounded-full p-2 text-white w-10 h-10 items-center justify-center flex focus:bg-green-400"
          >
            <IoMdCheckmark />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-orange-400 rounded-full p-2 text-white w-10 h-10 items-center justify-center flex"
          >
            <LuDelete />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      key={note.id}
      className="my-2 mx-5 flex flex-col rounded-xl w-[15rem] md:w-[22rem] h-56 bg-orange-100 "
    >
      <div className="bg-rose-200 overflow-hidden break-words rounded-tl-xl rounded-tr-xl mt-0 h-10 pt-1 justify-items-center">
        <h2 className="text-xl font-semibold text-slate-700">{note.title}</h2>
      </div>

      <div className="p-3 text-lg text-slate-700 overflow-hidden break-words">
        <p>{note.content}</p>
      </div>

      <div className="flex justify-between mt-auto px-2 pb-2">
        <div className="bg-green-400 rounded-full p-2 w-10 h-10 items-center justify-center flex">
          <button
            onClick={() => setIsEditing(true)}
            className="text-white font-bold"
          >
            <FaPen />
          </button>
        </div>
        <div className="bg-red-400 rounded-full w-10 h-10 items-center justify-center flex">
          <button
            onClick={() => deleteNote(note.id)}
            className="text-white font-bold"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
