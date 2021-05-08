import { query, Client } from "faunadb";
import { sendMail } from "./mailer";

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

export const handler = async (event) => {
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
      query.Update(query.Ref(`classes/tickets/${ticketId}`), {
        data: { taken: true },
      })
    );

    console.log("Ticket updated successfully", ticketUpdateResponse);

    await sendMail(
      `${name} está participando da rifa`,
      `${name} selecionou o número ${ticketUpdateResponse.data.value} da rifa.
       Telefone informado: ${phone || "<não informado>"}
       Email informado: ${email || "<não informado>"}`,
      `<p><b>${name}</b> selecionou o número <b>${
        ticketUpdateResponse.data.value
      }</b> da rifa</p>
       <p>Telefone informado: <b>${phone || "não informado"} </b></p>
       <p>Email informado: <b>${email || "não informado"} </b></p>`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(customerResponse),
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
