import ax from "axios";
const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

export { axios };
