const graphFetch = (body) => {
  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default graphFetch;
