"use server";
import axios from "axios";

export async function getSemesterTitle(id) {
  try {
    const response = await axios.get(
      `http://192.168.50.219:3000/semesters/${id}`
    );

    return response.data.semester.title;
  } catch (error) {
    console.log("Error fetching Semester Title:", error);
    return "Unknown Semester"; // Fallback title
  }
}
