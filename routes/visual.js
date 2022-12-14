const {Router} = require("express")
const {convi,getviID,acvisBypres,agpres } = require("../controllers/visual")

const router = Router()
//http://localhost:4000/api/v1/visual

//get///

router.get("/", convi)
router.get("/id/:id", getviID)

//update//

router.put("/id/:id", acvisBypres)

//use//

router.post("/",agpres)
module.exports = router

///P