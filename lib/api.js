// export default async function fetcher(url, options = {}) {
//   try {
//     const response = await fetch(url, options);

//     // Check if the response status is OK (2xx)
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Fetch Error:", errorData); // Log detailed error information
//       throw new Error(errorData.message || "Fetch error"); // Throw error with message if available
//     }

//     // If the response is OK, parse it as JSON
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Fetcher encountered an error:", error);
//     // Return an error object if needed for error handling in the calling function
//     return { error: { message: error.message || "Unknown error" } };
//   }
// }

export default async function fetcher(url, option = {}) {
  let response;
  if (!option) {
    response = await fetch(url);
  } else {
    response = await fetch(url, option);
  }
  const data = await response.json();
  return data;
}
