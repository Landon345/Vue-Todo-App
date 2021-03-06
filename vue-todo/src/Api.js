const BASE_URL = "http://localhost:5000/api";

export const login = async (user) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const register = async (newUser) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("api_token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("api_token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const getTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("api_token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const postTodo = async (newTodo) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("api_token")}`,
    },
    body: JSON.stringify(newTodo),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const putTodo = async (updateTodo) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("api_token")}`,
    },
    body: JSON.stringify(updateTodo),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("api_token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
