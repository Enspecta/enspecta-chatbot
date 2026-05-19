require('dotenv').config({ path: __dirname + '/backend/.env' });
const app = require('./backend/index');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Enspecta chatbot running on port ${PORT}`));
