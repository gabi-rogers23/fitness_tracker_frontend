//This file will be for all functions making calls to the API i.e fetch, post etc.
export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("auth_token");
  console.log("CURRENT TOKEN IN GET HEADERS:, ", currentToken);

  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
  console.log("Current Headers: " + JSON.stringify(headers));
  return headers;
}

export async function registerNewUser(newUserName, newPassword) {
  const sendData = { username: newUserName, password: newPassword };

  // console.log("REGISTER NEW USER: ", sendData);
  // console.log("REGISTER NEW USER STRINGIFY", JSON.stringify(sendData));

  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("auth_token", data.token);
    }

    // console.log("REGISTER NEW USER RETURNING:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logIn(userUsername, userPassword) {
  const sendData = {
    username: userUsername,
    password: userPassword,
  };

  console.log("LogIn SEND Data " + sendData.username);

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("auth_token", data.token);
    }

    // console.log("Login Data", data);
    // console.log("GET HEADERS FROM LOGIN", getHeaders());
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllActivities() {
  try {
    const res = await fetch(`${BASE_URL}/activities`);

    const data = await res.json();

    console.log("GET ALL ACTIVITIES RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createActivity(name, description) {
  const sendData = {
    name: name,
    description: description,
  };
  try {
    const res = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });

    const data = await res.json();
    // console.log("CREATE ACTIVITY RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function editActivity(name, description, id) {
  console.log(id);
  const sendData = {
    name: name,
    description: description,
  };
  try {
    const res = await fetch(`${BASE_URL}/activities/${id}`, {
      method: "PATCH",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });

    const data = await res.json();
    // console.log("EDIT ACTIVITY RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

//profile
export async function getUserProfile(BASE_URL, token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new Error(error.message || response.statusText);
    }
  } catch (error) {
    throw new Error(`Failed to get user profile: ${error.message}`);
  }
}

//UpdateRoutine

export async function editRoutine(name, goal, isPublic, id) {
  console.log(id);
  const sendData = {
    name: name,
    goal: goal,
    isPublic: isPublic,
  };
  try {
    const res = await fetch(`${BASE_URL}/routines/${id}`, {
      method: "PATCH",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });

    const data = await res.json();
    console.log("EDIT ROUTINE RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function deleteRoutine(id) {
  try {
    await fetch(`${BASE_URL}/routines/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  } catch {
    console.error("error");
  }
}

export async function getUserRoutines(userName) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userName}/routines`, 
    {headers: getHeaders()});
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRoutines() {
  try {
    const response = await fetch(`${BASE_URL}/routines`, { headers: getHeaders() });
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateRoutineActivity(id, newActivity) {
  try {
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRoutineActivity(routineActivityId) {
  try {
    await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserRoutine(routineToRefresh) {
  try {
    const routines = await getUserRoutines(routineToRefresh.creatorName); 
    const [expectedRoutine] = routines.filter(
      (routine) => routine.id === routineToRefresh.id
    );
    return expectedRoutine;
  } catch (error) {
    console.log(error);
    return {};
  }
}
