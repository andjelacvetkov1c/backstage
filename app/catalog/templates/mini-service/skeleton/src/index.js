const express = require('express');

const app = express();
const PORT = process.env.PORT || ${{ values.port }};

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: '${{ values.name }}' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from ${{ values.name }}!' });
});

app.listen(PORT, () => {
  console.log(`${{ values.name }} listening on port ${PORT}`);
});
