    const express = require('express')
    const app = express()
    const dotenv = require('dotenv')
    const fs = require("node:fs/promises");
    const path = require("node:path");

    dotenv.config()

    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    const port = process.env.PORT || 3000


    let users = []
    const usersFilePath = path.join(process.cwd(), "users.json");

    async function readFile(){
        const data = await fs.readFile(usersFilePath , "utf-8")
        users = JSON.parse(data)
    }
    async function writeFile(){
        await fs.writeFile(usersFilePath, JSON.stringify(users))
        console.log('база данных оновлена');
    }
    app.get('/users', async (req, res) => {
        await readFile();
        res.json(users).status(200)
    })
    app.post(`/users`, async  (req,res)=>{
        await readFile();
        const user = {
           id: users[users.length - 1].id + 1,
           name: req.body.name,
           password: req.body.password,
           email: req.body.email
       }
       users.push(user)
        await writeFile()
        res.status(201).json(user)
    })
    app.get('/users/:userId', async (req,res)=>{
        await readFile();
        const user = users.find(user => user.id === +req.params.userId)
        res.json(user)
    })
    app.delete('/users/:userId',async (req,res)=>{
        await readFile();
        const userIndex = users.findIndex(user=> user.id === +req.params.userId)
        if(userIndex === -1 ){
            res.sendStatus(404)
        }
        else {
            users.splice(userIndex, 1)
            await writeFile()
            res.sendStatus(204)
        }
    })
    app.put(`/users/:userId`, async (req,res)=>{
        await readFile();
        const userIndex = users.findIndex(user=> user.id === +req.params.userId)
        if(userIndex === -1 ){
            res.sendStatus(404)
        }
        else {
            users[userIndex].email = req.body.email
            users[userIndex].name = req.body.name
            users[userIndex].password = req.body.password
            const user = users[userIndex]
            await writeFile()
            res.status(201).json(user)
        }
    })
    app.listen(port, ()=>{
        console.log(`Server work on http://localhost:${port}`)
    })
