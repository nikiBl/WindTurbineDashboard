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
exports.updateFailures = async (req, res) => {
    console.log(req.body)
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    
    try {
        const turbineId = req.query.id
        const timeOfFailure = req.query.itime    //new Date(req.query.itime)
        const desc = req.query.desc

        const resTemp = await pgPool.query(`UPDATE FAILURES SET INITIAL_TIME_OF_FAILURE = to_timestamp('${timeOfFailure}', 'DD/MM/YYYYHH24:MI:SS'), FAILURE_DESC='${desc}' WHERE ID = (SELECT MAX(ID) FROM FAILURES WHERE ID_TURBINE=${turbineId})`, (err, result) => {
            if(err) {
               res.status(500).json({error: 'Failed to update record. Reason: ' + err.message }) 
            } else {
                res.status(200).json({status:'Record Updated'})
            }
            
        });
      
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error : ' + err.message})
    }
}
