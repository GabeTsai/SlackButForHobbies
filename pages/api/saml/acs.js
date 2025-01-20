// pages/api/saml/acs.js

export default function handler(req, res) {
  console.log("Handler invoked"); // Logging to ensure route is hit
  res.status(200).json({ message: "SAML endpoint is working" });
}