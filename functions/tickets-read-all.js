import { query, Client } from "faunadb";
const q = query;

export function handler(event, context) {
  console.log("Function `ticket-read-all` invoked");

  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  return client
    .query(
      q.Paginate(q.Match(q.Ref("indexes/all_tickets_sort_by_value")), {
        size: 100,
      })
    )
    .then((response) => {
      const tickets = response.data;
      console.log(`${tickets.length} tickets found`);
      console.log(tickets);

      return {
        statusCode: 200,
        body: JSON.stringify(tickets),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
}
