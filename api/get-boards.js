// Vercel Serverless Function — GET /api/get-boards
// Fetches the Pinterest boards for this account

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.PINTEREST_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Pinterest token not configured' });
  }

  try {
    const response = await fetch('https://api.pinterest.com/v5/boards?page_size=25', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ boards: data.items || [] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
