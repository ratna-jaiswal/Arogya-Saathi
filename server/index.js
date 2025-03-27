require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, PORT } = process.env;

app.get('/token', (req, res) => {
  const identity = req.query.identity || 'user'; // Unique identity for each user
  const roomName = req.query.room || 'consultation-room'; // Room name for the video call

  const token = new twilio.jwt.AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );

  token.identity = identity;
  const videoGrant = new twilio.jwt.AccessToken.VideoGrant({ room: roomName });
  token.addGrant(videoGrant);

  res.send({ token: token.toJwt() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});