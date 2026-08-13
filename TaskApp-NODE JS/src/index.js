const express = require('express');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

const PORT = 3000;

if (require.main === module) {
    require('./db/mongoose');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;