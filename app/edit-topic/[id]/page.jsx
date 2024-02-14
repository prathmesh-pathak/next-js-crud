import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("An error occured while getting the topic by ID.");
    }

    return response.json();
  } catch (error) {
    console.log("An error occured while updating", error);
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id)
  const { title, description } = topic;
  return <EditTopicForm id={id} title={title} description={description} />;
}
