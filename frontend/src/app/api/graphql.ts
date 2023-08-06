const fetcher = (query: string) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default fetcher
