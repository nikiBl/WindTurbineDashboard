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
exports.getTemperatures = async (req, res) => {
    console.log(req.body)
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    try {
        const resTemp = await pgPool.query("SELECT * FROM temperatures ORDER BY DATE_TIME DESC LIMIT 5")
        if(!!resTemp) {
            res.status(200).json(resTemp.rows)
        } else {
            res.status(500).json({error: 'No data available' })
        }
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error : ' + err.message})
    }
}
