const express = require("express");
const app = express();
const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const errorHandler = require('./util/errorHandler')

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const readingListsRouter = require("./controllers/readingLists")
require('express-async-errors')


app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/readinglists", readingListsRouter)

app.use(errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
