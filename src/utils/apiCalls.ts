import { getRequestBody } from "./constants";

async function fetchdata<T>(currentPage?: number) {
  let response = undefined;
  const requestBody = getRequestBody(currentPage ?? 1);
  try {
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.vrbo.com/serp/g`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-agent": "Vrbo%20Owner/15854 CFNetwork/1220.1 Darwin/20.3.0",
        },
        // @ts-ignore
        body: JSON.stringify(requestBody),
      }
    );
    response = await data.json();
  } catch (err) {}

  return response ? (response as T) : undefined;
}

export default fetchdata;
