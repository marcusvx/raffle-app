var sha256 = require("js-sha256");

export const handler = async (event) => {
  const data = JSON.parse(event.body);
  const hashPwd = sha256.hmac(process.env.HASH_SECRET, data.pwd);

  if (hashPwd !== process.env.SITE_PWD_HASH) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  console.log("Success auth");
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
