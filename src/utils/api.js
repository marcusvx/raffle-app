const readAll = async () => {
  const response = await fetch("/.netlify/functions/tickets-read-all");
  return await response.json();
};

const createBet = async (data) => {
  const response = await fetch("/.netlify/functions/bet-create", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return await response.json();
};

const api = {
  readAll,
  createBet,
};

export default api;
