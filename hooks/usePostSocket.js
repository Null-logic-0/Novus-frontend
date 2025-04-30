import { useEffect } from "react";
import { getSocket } from "../lib/socket";
import { queryClient } from "../util/http";

export function usePostSocketEvents() {
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const ensureLikesProperty = (post) => ({
      ...post,
      likes: post.likes || [],
    });

    const handleNewPost = (newPost) => {
      const rawPost = newPost?.data?.post;
      if (!rawPost) return;

      const postWithDefaults = {
        ...rawPost,
        caption: rawPost.caption ?? "",
        media: rawPost.media ?? [],
        createdAt: rawPost.createdAt ?? new Date().toISOString(),
        likes: rawPost.likes ?? [],
        user: newPost.user ?? null,
      };

      queryClient.setQueryData(["posts"], (oldData) => {
        if (!oldData?.data?.posts) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            posts: [postWithDefaults, ...oldData.data.posts],
          },
        };
      });
    };

    const handleEditPost = async (updatedPost) => {
      const rawPost = updatedPost?.data?.post;
      if (!rawPost) return;

      const postWithLikes = ensureLikesProperty({
        ...rawPost,
        user: updatedPost.user,
      });

      queryClient.setQueryData(["posts"], (oldData) => {
        if (!oldData?.data?.posts) return oldData;

        const updatedPosts = oldData.data.posts.map((post) =>
          String(post._id) === String(postWithLikes._id) ? postWithLikes : post
        );

        return {
          ...oldData,
          data: {
            ...oldData.data,
            posts: updatedPosts,
          },
        };
      });

      queryClient.refetchQueries({ queryKey: ["posts"] });
    };

    const handleDeletePost = (deletedPostId) => {
      queryClient.setQueryData(["posts"], (oldData) => {
        if (!oldData?.data?.posts) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            posts: oldData.data.posts.filter(
              (post) => post._id !== deletedPostId
            ),
          },
        };
      });
    };

    socket.on("new-post", handleNewPost);
    socket.on("edit-post", handleEditPost);
    socket.on("delete-post", handleDeletePost);

    return () => {
      socket.off("new-post", handleNewPost);
      socket.off("edit-post", handleEditPost);
      socket.off("delete-post", handleDeletePost);
    };
  }, []);
}
