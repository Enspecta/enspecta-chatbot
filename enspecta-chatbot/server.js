require('dotenv').config({ path: __dirname + '/backend/.env' });

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('FATAL: ANTHROPIC_API_KEY is not set. Exiting.');
  process.exit(1);
}

const app = require('./backend/index');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Enspecta chatbot running on port ${PORT}`));
