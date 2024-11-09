const API_BASE_URL = "https://medyanes360-task-eight.vercel.app/api"|| "http://localhost:3000/api";

const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!API_BASE_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const data = await fetch(`${API_BASE_URL}${URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return data;
  } catch (err) {
    throw new Error(`API isteği hatalı: ${err}`);
  }
};

const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  const data = await fetch(`${API_BASE_URL}${URL}`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data;
};

const deleteAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  const data = await fetch(`${API_BASE_URL}${URL}`, {
    method: "DELETE",
    headers: headers,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data;
};

const putAPI = async (
  URL,
  body,
  method = "PUT",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!API_BASE_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const data = await fetch(`${API_BASE_URL}${URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return data;
  } catch (err) {
    throw new Error(`API isteği hatalı: ${err}`);
  }
};

export { postAPI, getAPI, deleteAPI, putAPI };
