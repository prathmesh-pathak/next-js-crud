"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and Description are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        router.push("/");
        alert(`Topic ${title} added successfully.`);
        router.refresh();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console("Error occured while adding ", error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Add Topic"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Add Topic Description"
      />

      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
