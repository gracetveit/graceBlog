import { Blog } from ".prisma/client";
import axios from "axios";
import Cookies from "js-cookie";

// Constants
const SET_BLOGS = "SET_BLOGS";
const REMOVE_BLOGS = "REMOVE_BLOGS";

// Actions
const setBlogs = (blogs) => ({
  type: SET_BLOGS,
  blogs,
});

const removeBlogs = (slug) => ({
  type: REMOVE_BLOGS,
  slug,
});
interface clientBlog extends Blog {
  date: string;
}

// Thunks
export const fetchBlogs = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/blogs");
    const blogs = data.map((blog: Blog) => ({
      ...blog,
      date: (blog.createdAt as unknown as string).split("T")[0],
    }));
    dispatch(setBlogs(blogs));
  } catch (error) {
    console.error(error);
  }
};

export const deleteBlog = (blog: Blog) => async (dispatch) => {
  const date = (blog.createdAt as unknown as string).split("T")[0];
  try {
    await axios({
      method: "DELETE",
      url: `/api/blogs/${date}/${blog.slug}`,
      headers: {
        authorization: Cookies.get("TOKEN"),
      },
    });
    dispatch(removeBlogs(blog.slug));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state: clientBlog[] = [], action): clientBlog[] => {
  switch (action.type) {
    case SET_BLOGS:
      return action.blogs;
    case REMOVE_BLOGS:
      return state.reduce((acc, cur) => {
        if (cur.slug === action.slug) {
          return acc;
        }
        return [...acc, cur];
      }, []);
    default:
      return state;
  }
};
