export default async function graphql(query) {
    return fetch("https://polling.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ query}),
    })
      .then((r) => r.json())
      .then((r) => r.data);
  }