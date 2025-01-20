// app/api/saml/route.js

export async function GET(req) {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  export async function POST(req) {
    try {
      // Your SAML handling logic here
      return new Response(
        JSON.stringify({ message: "POST to SAML endpoint" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Internal Server Error", error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }