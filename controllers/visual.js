const{ response,request} = require("express")
const pool = require("../db/connection");
const modelAudi = require("../models/visual")
const {queryvisualExist} = require("../models/visual")

const convi = async (req =request, res = response) => {
    let conn
    try{
        conn =await pool.getConnection()

        const pres = await conn.query(modelAudi.querygetaudi,(error) =>{ if (error) throw error})

        if(!pres){
            res.status(404).json({msg: "No se encuentra el prestamo realizado"})
            return
        }
        res.json({pres})
    }catch(error){

        console.long(error)
        res.status(500).json({msg: error})
    }finally{
        if (conn) conn.end()
    }
}

const getviID = async(req = request, res = response) =>{
    const{id} = req.params
    let conn
    try{
        conn = await pool.getConnection()

        const [pres] = await conn.query(modelAudi.querygetaudiID,[id],(error)=>{if (error) throw error})
        

        if(!pres){
            res.status(404).json({msg: "No existe usuario registardo"})
            return
        }
        res.json({pres})    
    }catch(error){
         console.log(error)
         res.status(500).json({msg: error})
    }finally{
        if(conn) conn.end()
    }
}

const acvisBypres = async (req = request, res = response) =>{
    const{id} = req.params
    const{
        Name_facilitator,
        Name_applicant,
        Position,
        Borrower_resource,
        Ocupation_time,
    }= req.body

    if(!Name_facilitator ||
       !Name_applicant ||
       !Position ||
       !Borrower_resource||
       !Ocupation_time){
        res.status(400).json({msg: "Faltan datos"})
        return
    }
    let conn;
    try{
        conn = await pool.getConnection()


               const result = await conn.query(`UPDATE prestamo SET 
               Name_facilitator = '${Name_facilitator}',
               Name_applicant = '${Name_applicant}',
               Position = '${Position}',
               Borrowed_resource = '${Borrower_resource}',
               Ocupation_time = '${Ocupation_time}' WHERE ID = '${id}'`, (error)=> {if (error) throw error})

               if(result.affectedRows === 0){
                    res.status(400).json({msg: `No se pudo actuaalizar el usuario`})
                    return
               }
               res.json({msg: `Se actualizo satisfactoriamente el prestamo '${Name_applicant}'`})

    }   catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}

const agpres = async (req = request, res = response) => {
    const{
        Name_facilitator,
        Name_applicant,
        Position,
        Borrower_resource,
        Ocupation_time,
    }= req.body

    if(!Name_facilitator ||
       !Name_applicant ||
       !Position ||
       !Borrower_resource||
    !Ocupation_time){
        res.status(400).json({msg: "Faltan datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [vi] = await conn.query(`SELECT Name_applicant FROM prestamo WHERE Name_applicant ='${Name_applicant}'`)
        
        if(vi){
            res.status(400).json({msg: `El usuario '${Name_applicant}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                 const result = await conn.query(modelAudi.queryInsert,[Name_facilitator,
                    Name_applicant,
                    Position,
                    Borrower_resource,
                    Ocupation_time], (error)=> {if (error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${Name_applicant}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre ${Name_applicant}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}


module.exports = {convi, getviID,acvisBypres,agpres}