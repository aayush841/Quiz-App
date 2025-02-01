import axios from "axios";

let quizQuestions = null; // Store only questions array

export async function fetchQuizData() {
    if (quizQuestions) return quizQuestions; // Return cached questions if already fetched

    try {
        const response = await axios.get("https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX");
        const data = JSON.parse(response.data.contents); // Parse JSON
        quizQuestions = data.questions; // Store only questions
        return quizQuestions;
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        return null;
    }
}

// Export quizQuestions (Initially null, updates after fetch)
export { quizQuestions };