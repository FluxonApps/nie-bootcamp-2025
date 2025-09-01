# 🚀 Fluxon x NIE Bootcamp

Welcome to the **Fluxon x NIE Bootcamp** repository!  
This bootcamp will guide you through building and deploying a **MERN stack** application from scratch.

---

## 🛠 Tech Stack

| Tech             | Logo                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **MongoDB**      | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="60"/> |
| **Express.js**   | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="express" width="60"/>          |
| **React (Vite)** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="60"/>       |
| **Node.js**      | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60"/>    |

---

## ⚙️ Installation & Setup

### MongoDB Community Edition (Windows)

1. Download **MongoDB Community Edition**: [MongoDB Download](https://www.mongodb.com/try/download/community).
2. Install with default settings and **enable MongoDB as a Windows service**.
3. Add `C:\Program Files\MongoDB\Server\<version>\bin` to your **System PATH**.
4. Start the MongoDB server:

```bash
mongod
```

5. Verify installation:

```bash
mongo --version
```

## Node.js Installation Guide (Windows)

Follow these steps to install **Node.js** and **npm** (Node Package Manager) on **Windows**.

---

#### Download Node.js

1. Go to the official Node.js website: [https://nodejs.org](https://nodejs.org)
2. You’ll see two versions:

   - **LTS (Long Term Support)** → Recommended for most users.
   - **Current** → Latest features but may be unstable.

   Choose **LTS** for stability.

---

#### Install Node.js

1. Run the installer you downloaded.
2. During installation:
   - Keep default settings.
   - Ensure **"Add to PATH"** option is checked.
3. Complete installation by clicking **Next → Install → Finish**.

---

#### Verify Installation

Open **Command Prompt (cmd)** or **PowerShell** and run:

```bash
node -v
```

## Backend Setup (Express + Mongoose)

This guide will walk you through creating a **Express backend** using **npm**.

---

#### Official Express Documentation

Refer to the official guide here: [https://expressjs.com](https://expressjs.com)

---

#### Create a New Nodejs Project

Run the following command in your terminal (from the official docs):

```bash
npm init
```

Enter the project name: < project_name > and other details

An empty node project should have been initialized

```bash
cd < project_name >

npm install --save express
```

We can then go ahead and start creating a main index.js file with the sample code provided from the official documentation

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```

The server can be started using the command

```bash
node index.js
```

You should be able to access the backend by opening your browser and pointing to: http://localhost:3000

### Using Mongoose with Express

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.  
It helps you define schemas and models, making it easier to interact with your MongoDB database inside an Express app.

---

#### Official Mongoose Documentation

Refer to the official guide here: [https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)

---

#### Install Mongoose

```bash
npm install --save mongoose
```

#### Define a model schema [example]

```
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number
});

module.exports = mongoose.model("User", userSchema);
```

#### Connect to a MongoDB instance

```
mongoose.connect("mongodb://127.0.0.1:27017/bootcamp")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("DB Connection Error:", err));
```

#### Write to database [example]

```
const User = require("./models/user");

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
```

#### Fetch data [example]

```
const User = require("./models/user");

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

## Frontend Setup (React + Vite)

This guide will walk you through creating a **React frontend** using **Vite** for fast development.

---

#### Official Vite Documentation

Refer to the official guide here: [https://vitejs.dev/guide](https://vitejs.dev/guide)

---

#### Creating a new Vite React Project

Run the following command in your terminal (from the official docs):

```bash
npm create vite@latest
```

Enter the project name: < project_name >
Select **React** as the framework
Choose **Typescript** as the variant
Now go to the project name folder and run the command to get your local frontend started

```bash
cd < project_name >

npm install
npm run dev
```

You should be able to access the frontend by opening your browser and pointing to: http://localhost:5173


