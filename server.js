const cors = require('cors')
const express = require('express')
const visualRouter = require('./routes/visual')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            visual: "/api/v1/visual"
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        //this.app.get('/', (req, res) => {
        //res.send('Mensaje recibido')
       // }) //End point

       this.app.use(this.paths.visual, visualRouter)
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server