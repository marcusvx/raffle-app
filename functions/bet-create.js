import { query, Client } from "faunadb";

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

export const handler = async (event, _, callback) => {
  const data = JSON.parse(event.body);
  const { name, phone, email, ticketId } = data;

  console.log(`Function bet-create invoked`, data);

  try {
    const customerResponse = await client.query(
      query.Create(query.Ref("classes/customers"), {
        data: { name, phone, email },
      })
    );

    console.log("customer created successfully", customerResponse);

    const betResponse = await client.query(
      query.Create(query.Ref("classes/bets"), {
        data: {
          customer: customerResponse.ref.id.toString(),
          ticket: ticketId,
        },
      })
    );

    console.log("Bet created successfully", betResponse);

    const ticketUpdateResponse = await client.query(
      query.Update(query.Ref(`classes/tickets/${ticketId}`), { taken: true })
    );

    console.log("Ticket updated successfully", ticketUpdateResponse);

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(customerResponse),
    });
  } catch (error) {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error),
    });
  }
};
