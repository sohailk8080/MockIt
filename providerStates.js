const express = require('express');
const app = express();
app.use(express.json());

app.post('/provider-states', (req, res) => {
  const { state } = req.body;
  if (state === 'user exists') {
    // Setup mock data if needed or just log
    console.log('Provider state: user exists');
  }
  res.sendStatus(200);
});

app.listen(4001, () => {
  console.log('Provider state setup server running on port 4001');
});
