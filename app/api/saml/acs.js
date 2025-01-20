import { ServiceProvider, IdentityProvider } from "saml2-js";
// import fs from "fs";
import fetch from "node-fetch";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Fetch the Stanford IdP's certificate dynamically
async function fetchStanfordCertificate() {
  const response = await fetch("https://login.stanford.edu/idp.crt");
  return response.text();
}

// SAML Configuration
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // Fetch the Stanford IdP certificate
    const idpCert = await fetchStanfordCertificate();

    // Create the Service Provider (SP)
    const sp_options = {
      entity_id: `${BASE_URL}/metadata.xml`, // Your SP's metadata URL
      assert_endpoint: `${BASE_URL}/api/saml/acs`, // Your assertion endpoint
    };
    const sp = new ServiceProvider(sp_options);

    // Create the Identity Provider (IdP) using Stanford's configuration
    const idp_options = {
      entity_id: "https://idp.stanford.edu/",
      sso_login_url: "https://login.stanford.edu/idp/profile/SAML2/Redirect/SSO",
      sso_post_url: "https://login.stanford.edu/idp/profile/SAML2/POST/SSO",
      logout_url: "https://login.stanford.edu/idp/profile/Logout",
      certificates: [idpCert],
    };
    const idp = new IdentityProvider(idp_options);

    // Parse the SAML response
    const options = { request_body: req.body };

    sp.post_assert(idp, options, (err, saml_response) => {
      if (err) {
        console.error("Error processing SAML response:", err);
        return res.status(500).send("Failed to process SAML response");
      }

      // Extract user attributes from the SAML response
      const attributes = saml_response.user.attributes;
      console.log("SAML User Attributes:", attributes);

      // Proceed with your application logic (e.g., authentication)
      res.status(200).json({
        message: "SAML response processed successfully",
        attributes,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Internal Server Error");
  }
}