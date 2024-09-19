export async function GET() {
  const url = process.env.BE_URL + "/get-all";
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data", details: error.message }),
      {
        status: 500, // Internal Server Error
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
