import DeleteButton from "./DeleteButton";
import Link from "next/link";

const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response.json();
  } catch (error) {
    console.log("Error ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((topic, index) => (
        <div
          key={index}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{topic?.title}</h2>
            <div>{topic?.description}</div>
          </div>
          <div className="flex gap-2">
            <DeleteButton id={topic?._id} title={topic?.title} />
            <Link href={`/edit-topic/${topic._id}`}>Edit</Link>
          </div>
        </div>
      ))}
    </>
  );
}
