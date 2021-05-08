const readAll = async () => {
  const response = await fetch('/.netlify/functions/tickets-read-all');
  return response.json();
};

const createBet = async (data) => {
  const response = await fetch('/.netlify/functions/bet-create', {
    body: JSON.stringify(data),
    method: 'POST',
  });
  return response.json();
};

const authenticate = async (pwd) => {
  const response = await fetch('/.netlify/functions/authenticate', {
    body: JSON.stringify({ pwd }),
    method: 'POST',
  });
  return response.json();
};

const getAllBets = async () => {
  const response = await fetch('/.netlify/functions/bets-read-all');
  return response.json();
};

const api = {
  readAll,
  createBet,
  authenticate,
  getAllBets,
};

export default api;
