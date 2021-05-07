var sha256 = require("js-sha256");

const sendResult = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export const handler = async (event) => {
  const data = JSON.parse(event.body);
  const hashPwd = sha256.hmac(process.env.HASH_SECRET, data.pwd);

  if (hashPwd === process.env.SITE_PWD_HASH) {
    console.log("Common user authenticated");
    return sendResult(200, { ok: true, admin: false });
  }

  if (hashPwd === process.env.ADMIN_PWD_HASH) {
    console.log("Admin user authenticated");
    return sendResult(200, { ok: true, admin: true });
  }

  return sendResult(401, { ok: false, error: "Unauthorized" });
};
