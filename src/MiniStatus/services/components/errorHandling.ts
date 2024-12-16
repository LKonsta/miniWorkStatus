import axios from "axios";

const errorHandling = (error: any): void => {
    console.error("An error occurred:", error);

    // Check if it's an Axios error
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // If the server responded with a non-2xx status
            throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            // If no response was received
            throw new Error("No response from server");
        } else {
            // For other Axios errors (e.g., request setup issues)
            throw new Error(`Axios error: ${error.message}`);
        }
    } else {
        // If it's not an Axios error, throw a general error
        throw new Error("Unexpected error occurred");
    }
};

export default errorHandling;