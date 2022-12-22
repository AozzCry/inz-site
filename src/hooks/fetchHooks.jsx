import axios from "axios";

export async function getFetch({ queryKey }) {
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
}

export async function postFetch(url, data = null) {
  try {
    const res = await axios.post(url, data, { withCredentials: true });
    console.log(res.statusText, res.data.message);
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

export async function putFetch(url, data = null) {
  try {
    const res = await axios.put(url, data, { withCredentials: true });
    console.log(res.statusText, res.data.message);
    return { message: res.data.mes, data: res.data.content };
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.status, error.response.data.message);
      return { error: error.response.data.message };
    } else {
      console.error(error.message);
    }
  }
}

export async function patchFetch(url, data = null) {
  try {
    const res = await axios.patch(url, data, { withCredentials: true });
    console.log(res.statusText, res.data.message);
    return { message: res.data.message, data: res.data.content };
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.status, error.response.data.message);
      return { error: error.response.data.message };
    } else {
      console.error(error.message);
    }
  }
}
