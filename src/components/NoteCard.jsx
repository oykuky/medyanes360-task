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
  const { toast } = useToast();

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
        });
        setIsEditing(false);
      } else {
        console.error("Updating failed:", data.error);
        toast({
          variant: "destructive",
          description: `Not güncellenemedi ! ${data.error}`,
        });
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
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  if (isEditing) {
    return (
      <div className="bg-gray-100 shadow-md shadow-gray-400 my-2 mx-5 flex flex-col rounded-xl w-[15rem] md:w-[22rem] h-56 ">
        <div className="rounded-full m-3 h-10 px-2 w-fit flex justify-items-center bg-purple-300">
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
            className="px-1 text-xl font-semibold outline-none bg-transparent text-purple-700"
          />
        </div>

        <div className="p-2">
          <textarea
            value={editedNote.content}
            onChange={(e) =>
              setEditedNote({ ...editedNote, content: e.target.value })
            }
            className="w-full h-20 bg-transparent outline-none resize-none text-lg font-medium text-slate-800 "
          />
        </div>
        <div className="flex flex-end mt-auto">
        <div className="flex justify-start mt-auto px-2 pb-2">
          <button
            onClick={() => updateNote(note.id)}
            className="bg-blue-400 rounded-full p-2 text-white w-10 h-10 items-center justify-center flex focus:bg-green-400"
          >
            <IoMdCheckmark />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-blue-400 rounded-full ml-2 p-2 text-white w-10 h-10 items-center justify-center flex"
          >
            <LuDelete />
          </button>
        </div>

        <div className="flex ml-auto items-center p-2 text-sm font-medium text-gray-400">
          <p>{note.updatedAt.slice(0, 10)}</p>
        </div>

        </div>
      </div>
    );
  }

  return (
    <div
      key={note.id}
      className="bg-gray-100 shadow-md shadow-gray-400 my-2 mx-5 flex flex-col rounded-xl w-[15rem] md:w-[22rem] h-56"
    >
      <div className="overflow-hidden break-words rounded-full m-3 h-10 pt-1 px-3 w-fit justify-items-center bg-purple-300 ">
        <h2 className="text-xl font-semibold text-purple-700">{note.title}</h2>
      </div>

      <div className="p-3 text-lg font-medium text-slate-800 overflow-hidden break-words">
        <p>{note.content}</p>
      </div>

      <div className="flex flex-end mt-auto">
        <div className="flex justify-start mt-auto px-2 pb-2">
          <div className="bg-green-400 rounded-full p-2 w-10 h-10 items-center justify-center flex">
            <button
              onClick={() => setIsEditing(true)}
              className="text-white font-bold"
            >
              <FaPen />
            </button>
          </div>
          <div className="bg-red-400 rounded-full w-10 ml-2 h-10 items-center justify-center flex">
            <button
              onClick={() => deleteNote(note.id)}
              className="text-white font-bold"
            >
              <MdDelete />
            </button>
          </div>
        </div>

        <div className="flex ml-auto items-center p-2 text-sm font-medium text-gray-400">
          <p>{note.createdAt.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
