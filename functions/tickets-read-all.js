import { query, Client } from "faunadb";

export async function handler(event, context) {
  console.log("Function `ticket-read-all` invoked");

  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const response = await client.query(
      query.Paginate(
        query.Match(query.Ref("indexes/all_tickets_sort_by_value")),
        {
          size: 100,
        }
      )
    );

    const tickets = response.data;
    console.log(`${tickets.length} tickets found`);

    return {
      statusCode: 200,
      body: JSON.stringify(tickets),
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
}
