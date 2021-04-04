let urlBase = "http://localhost:8081";

export async function get(path) {
  try {
    const response = await fetch(`${urlBase}${path}`, {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function post(path, payload) {
  try {
    const response = await fetch(`${urlBase}${path}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function put(path, payload) {
  try {
    const response = await fetch(`${urlBase}${path}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
