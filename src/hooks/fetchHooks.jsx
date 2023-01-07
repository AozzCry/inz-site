import axios from "axios";

export async function doFetch(method, url, data = null) {
  try {
    const res = await axios({
      method,
      url,
      data,
      withCredentials: true,
    });
    return { message: res.data.message, data: res.data.content };
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.status, error.response.data.message);
      return { error: error.response.data.message };
    } else {
      console.error(error.message);
      return { error: error.message };
    }
  }
}

const fetch = {
  get: async function ({ queryKey }) {
    try {
      const res = await axios.get(queryKey[0], {
        params: queryKey[1]
          ? new URLSearchParams({
              name: queryKey[1].name,
              category: queryKey[1].category,
            })
          : null,
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else throw new Error(error.message);
    }
  },
  post: (url, data) => doFetch("POST", url, data),
  put: (url, data) => doFetch("PUT", url, data),
  patch: (url, data) => doFetch("PATCH", url, data),
  delete: (url) => doFetch("DELETE", url),
};

export default fetch;
