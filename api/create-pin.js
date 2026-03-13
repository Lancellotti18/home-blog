// Vercel Serverless Function — POST /api/create-pin
// Creates a Pinterest pin using the Pinterest API v5
// The access token lives only in the Vercel environment, never in the browser

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.PINTEREST_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Pinterest token not configured' });
  }

  const { title, description, link, imageUrl, boardId } = req.body;

  if (!title || !description || !link || !imageUrl || !boardId) {
    return res.status(400).json({
      error: 'Missing required fields: title, description, link, imageUrl, boardId'
    });
  }

  try {
    const response = await fetch('https://api.pinterest.com/v5/pins', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board_id: boardId,
        title,
        description,
        link,
        media_source: {
          source_type: 'image_url',
          url: imageUrl,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, pin: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
