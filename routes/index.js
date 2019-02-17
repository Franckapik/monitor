const express = require('express');
const router = express.Router();
const Influx = require('influx');
const config = require('../config');
const ping = require('ping');
const hosts = ['192.168.1.78', '192.168.1.22', '192.168.1.56'];

const solaireDB = new Influx.InfluxDB(config.solaireSchema)
const meteoDB = new Influx.InfluxDB(config.meteoSchema)
const linkyDB = new Influx.InfluxDB(config.linkySchema)
const jardinDB = new Influx.InfluxDB(config.jardinSchema)

/* GET home page. */
router.get('/', function(req, res, next) {

  hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    });
});

  solaireDB.query(`

      select * from solaire
      order by desc
      limit 30

    `)

    .then(solaireData => {
      meteoDB.query(`

          select * from meteo
          order by desc
          limit 30

        `).then(meteoData => {

        linkyDB.query(`

            select * from linky
            order by desc
            limit 30

          `).then(linkyData => {
          res.render('index', {
            title: 'Monitor Maison Fanch & Sandra',
            solaire: solaireData,
            meteo: meteoData,
            linky: linkyData
          })
        })

      })
    })

    .catch(error => console.log(error));

});

module.exports = router;
