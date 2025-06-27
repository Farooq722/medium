import { create } from "zustand";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    name: string;
  };
}

interface BlogStore {
  blogs: Blog[];
  setBlogs: (rawBlogs: any[]) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  setBlogs: (rawBlogs) => {
    const formattedBlogs = rawBlogs.map((blog) => ({
      ...blog,
      createdAt: formatDate(blog.createdAt),
    }));

    set({ blogs: formattedBlogs });
  },
}));
