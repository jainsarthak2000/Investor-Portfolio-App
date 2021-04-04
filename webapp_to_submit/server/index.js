const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
let oracledb = require('oracledb');
let config = require('./db-config.js');
const cors = require('cors');
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

async function init() {
	config.poolMax = 50;
	await oracledb.createPool(config)

	/* ---------------------------------------------------------------- */
	/* ------------------- Route handler registration ----------------- */
	/* ---------------------------------------------------------------- */
	
	app.get('/test', routes.testQuery);

	app.get('/get_company', routes.getCompany);

	app.get('/get_company_rounds', routes.getCompanyRounds);

	app.get('/get_country_code', routes.getCountryCode);

	app.get('/get_founded_year', routes.getFoundedYear);

	app.get('/get_funding_rounds', routes.getFundingRounds);

	app.get('/get_market', routes.getMarket);

	app.get('/getCompany/:country/:year/:rounds/:market/:valuation', routes.getCompanyList)

	app.get('/searchCompany/:name', routes.searchCompany)

	app.get('/addCompany/:name', routes.addCompany)

	app.get('/showPortfolio', routes.showPortfolio)

	app.get('/deleteCompany/:name', routes.deleteCompany)

	app.get('/getFact1', routes.getFact1)
		
	app.get('/getFact2', routes.getFact2)
		
	app.get('/getFact3', routes.getFact3)
		
	app.get('/getFact4', routes.getFact4)
		
	/* ---- (Dashboard) ---- */
	// The route localhost:8081/genres is registered to the function
	// routes.getAllGenres, specified in routes.js.
	// app.get('/genres', routes.getAllGenres);
	
	// /* ---- Q2 (Recommendations) ---- */
	// app.get('/recommendation/:title', routes.getRecs);
	// //HOW TO UPDATE THE URL WITH THE TITLE NAME
}

init().then(_ => {
	app.listen(8081, () => {
		console.log(`Server listening on PORT 8081`);
	});
})
