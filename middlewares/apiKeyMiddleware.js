
import dotenv from 'dotenv';
dotenv.config();

const validApiKey = process.env.API_KEY; // Ambil API key dari environment variable

export function requireApiKey(req, res, next) {
    // console.log("Valid API Key:", validApiKey); // Debug line
    const apiKey = req.headers['api-key']; // Ambil API key dari header X-API-KEY
    console.log("Received API Key:", apiKey); // Debug line



    // Periksa apakah API key ada dan valid
    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ message: 'Unauthorized. Invalid API key.', validApiKey, apiKey });
        
    }
    // Lanjutkan ke rute berikutnya jika API key valid
    next();
}
