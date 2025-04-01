
export const fetchRegisterUser = async (username: string, password: string) => {
  const response = await fetch("https://localhost:3000/users", {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "username": username,
        "password": password,
    })
    });
  if (!response.ok) {
    throw new Error("Failed to register users");
  }
  return response;
};

export const fetchLoginUser = async (username: string, password: string) => {
    const response = await fetch("https://localhost:3000/users", {
      method: 'POST',
      credentials: 'include',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "username": username,
          "password": password,
      })
      });
    if (!response.ok) {
      throw new Error("Failed to login users");
    }
    return response;
  };