const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { PORT } = require('./config/vars');
const counterRoutes = require('./routes/counterRoutes');


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('FinTrack Backend is running...');
});


app.use('/api/counter', counterRoutes);
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/dashboard', require('./routes/dashboard'));


app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
