import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
});
