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
exports.insertFailures = async (req, res) => {
    console.log(req.body)
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    
    try {
        const turbineId = req.query.id
        const initialTimeOfFailure = req.query.itime    //new Date(req.query.itime)
        const endTimeOfFailure = req.query.etime        //new Date(req.query.etime)
        const desc = req.query.desc

        const resTemp = await pgPool.query(`INSERT INTO FAILURES(ID_TURBINE, INITIAL_TIME_OF_FAILURE, END_TIME_OF_FAILURE, FAILURE_DESC) VALUES(${turbineId}, to_timestamp('${initialTimeOfFailure}', 'DD/MM/YYYYHH24:MI:SS'), to_timestamp('${endTimeOfFailure}', 'DD/MM/YYYYHH24:MI:SS'), '${desc}')`, (err, result) => {
            if(err) {
               res.status(500).json({error: 'Failed to insert record. Reason: ' + err.message }) 
            } else {
                res.status(200).json({status:'Record Updated'})
            }
            
        });
      
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error : ' + err.message})
    }
}
