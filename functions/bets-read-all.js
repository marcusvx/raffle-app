import { query as q, Client } from "faunadb";

function transform(source) {
  return source.data.map((item) => {
    const [ticketValue, customerData] = item.data;
    const [customerName, customerPhone, customerEmail] = customerData;
    return {
      ticketValue,
      customerName,
      customerPhone,
      customerEmail,
    };
  });
}

export async function handler(event, context) {
  console.log("Function `bets-read-all` invoked");

  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_tickets_by_customer"))),
        q.Lambda(
          ["customer", "ticket"],
          q.Map(
            q.Paginate(
              q.Union(
                q.Match(
                  q.Index("customer_by_ref"),
                  q.Ref(q.Collection("customers"), q.Var("customer"))
                ),
                q.Match(
                  q.Index("ticket_by_ref"),
                  q.Ref(q.Collection("tickets"), q.Var("ticket"))
                )
              )
            ),
            q.Lambda("x", q.Var("x"))
          )
        )
      )
    );
    console.log(response.data);

    const bets = transform(response);
    console.log(`${bets.length} bets found`);

    return {
      statusCode: 200,
      body: JSON.stringify(bets),
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
