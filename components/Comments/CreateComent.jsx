import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import CommentForm from "./CommentForm";
import { createComment, queryClient } from "../../util/http";
import toast from "react-hot-toast";

function CreateComent({ placeholder, postId, parentCommentId }) {
  const { token } = useAuth();

  const { mutate } = useMutation({
    mutationFn: ({ formData }) => {
      return toast.promise(createComment({ token, postId, data: formData }), {
        loading: "Posting comment...",
        success: "Comment created successfully!",
        error: (err) => err.info?.message || "Failed to create comment!",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(event.target);
    const text = formData.get("text");

    const data = {
      text,
      ...(parentCommentId && { parentComment: parentCommentId }),
    };

    mutate(
      { formData: data },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }

  return (
    <div className="border bg-[#000000] border-[#383838] p-4 rounded-none w-full">
      <CommentForm placeholder={placeholder} onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateComent;
