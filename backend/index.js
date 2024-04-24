const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = require('./routes/studentRouter');
const staffRouter = require('./Routes/staffRouter');
const academicRouter = require('./Routes/academicRouter');
const gradingRouter = require('./Routes/gradeRouter');
const feeRouter = require('./Routes/feeRouter');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/students', studentRouter);
app.use('/staff', staffRouter);
app.use('/academic', academicRouter);
app.use('/grading', gradingRouter);
app.use('/fee', feeRouter);

// app.listen(3007, () => {
//     console.log(`Server running on port`);
//   });
  