import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        title: data.title,
        content: data.content,
        featuredImage: file ? file.$id : post.featuredImage,
        status: data.status,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: fileId,
          status: data.status,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 border ">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {post ? "Edit Post " : "Create New Post"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-8">
          {/* Left Side */}
          <div className="w-full md:w-2/3 space-y-6">
            <Input
              label="Post Title"
              placeholder="Enter your post title..."
              className="mb-4"
              {...register("title", { required: true })}
            />

            <Input
              label="Slug"
              placeholder="auto-generated-slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />

            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/3 space-y-6">
            <Input
              label="Featured Image"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />

            {post?.featuredImage && (
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFileView(post.featuredImage)}
                  alt={post.title}
                  className="rounded-xl border shadow-md"
                />
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />

            <Button
              type="submit"
              bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
              className="w-full text-white font-semibold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              {post ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
