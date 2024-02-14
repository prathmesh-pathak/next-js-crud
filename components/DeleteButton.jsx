"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id, title }) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure about deleting ${title}`);

    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/topics/?id=${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert(`Topic ${title} deleted successfully.`);
          router.refresh();
        } else {
          throw new Error("An error occured while deleting.");
        }
      } catch (error) {
        console.log("An error occured while deleting: ", error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-400">
      Delete
    </button>
  );
}
