const pg = require("pg")
    // host:'35.201.13.235',
    //port:5432,


const pgCfg = {
    host:'/cloudsql/my-iot-273820:australia-southeast1:iot',
    user:'postgres',
    password:'postgres',
    database:'iot',
    ssl:false,
}

var pgPool;
if(!pgPool){
    pgPool = new pg.Pool(pgCfg)
}

//db function to query temperatures table
exports.updateTurbineStatus = async (req, res) => {
    console.log(req.body)
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')

    const turbineId = req.query.id
    const turbineStatus = req.query.st
    
    try {
        const resTemp = await pgPool.query(`UPDATE TURBINES SET TURBINE_STATUS='${turbineStatus}'WHERE ID=${turbineId}`, (err, result) => {
            if(err) {
               res.status(500).json({error: 'Failed to update record' }) 
            } else {
                res.status(200).json({status:'Record Updated'})
            }
            
        });
      
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error : ' + err.message})
    }
}
