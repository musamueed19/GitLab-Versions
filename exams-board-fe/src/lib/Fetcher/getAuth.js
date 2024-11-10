// api.js
export async function loginUser(formData) {
  const url = "http://192.168.50.219:3000/auth/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Handle response based on status code
    const data = await response.json();
    if (response.status === 201) {
      return { success: true, data }; // return data on success
    } else if (response.status === 401) {
      return { success: false, error: data.message, data };
    } else if (response.status === 404) {
      return { success: false, error: data.message, data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Itnernal Issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error }; // handle network or other errors
  }
}
