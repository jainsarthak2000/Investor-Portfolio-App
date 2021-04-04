let executeQuery = require("./queryExecuter.js").executeQuery;

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

async function testQuery(req, res) {
  let query = `
  SELECT name AS "name", permalink AS "permalink" FROM company
  WHERE name LIKE 'Goo%' AND ROWNUM <= 25
  ORDER BY name
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in testQuery");
  }
}

async function getCompany(req, res) {
  let permalink = req.query.company;
  let query = `
  SELECT * FROM company
  WHERE permalink='${permalink}'
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in testQuery");
  }
}

async function searchCompany(req, res) {
  let name = req.params.name;
  name =name.toLowerCase();
  let query = `
  SELECT permalink FROM company
  WHERE LOWER(name) LIKE '${name}'
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in testQuery");
  }
}

async function addCompany(req, res) {
  let name = req.params.name;
  name =name.toLowerCase();
  let query = `
  INSERT INTO portfolio (name,permalink)
  SELECT name,permalink
  FROM company
  WHERE LOWER(name) LIKE '${name}'
  `;
  console.log(query);
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in testQuery");
  }
}

async function deleteCompany(req, res) {
  let name = req.params.name;
  name =name.toLowerCase();
  let query = `
  DELETE FROM portfolio
  WHERE LOWER(name) = '${name}'
  `;
  console.log(query);
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in testQuery");
  }
}

async function showPortfolio(req, res) {
  let name = req.params.name;
  let query = `
  SELECT name,permalink
  FROM portfolio
  `;
  console.log(query);
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in testQuery");
  }
}

async function getCompanyRounds(req, res) {
  let permalink = req.query.company;
  let query = `
  SELECT funding_round_type,  TO_CHAR(TO_DATE(funded_at, 'DD-MON-YY'), 'Mon DD') AS "FUNDED_DATE", funded_year, raised_amount_usd
  FROM round
  WHERE company_permalink = '${permalink}'
  ORDER BY funded_year, TO_DATE(funded_at, 'DD-MON-YY')
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in testQuery");
  }
}

async function getCountryCode(req, res) {
  let query = `
  SELECT DISTINCT country_code
  FROM location
  ORDER BY country_code
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting Country");
  }
}

async function getFoundedYear(req, res) {
  let query = `
  SELECT founded_year
  FROM decade_list
  ORDER BY founded_year
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting FOUNDED YEAR");
  }
}

async function getFundingRounds(req, res) {
  let query = `
  SELECT funding_rounds
  FROM funding_rounds_list
  ORDER BY funding_rounds
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting FOUNDED YEAR");
  }
}

async function getMarket(req, res) {
  let query = `
  SELECT market
  FROM market_names
  ORDER BY market
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting MARKET");
  }
}

async function getCompanyList(req, res) {
  var country = req.params.country;
  var year = req.params.year;
  var rounds = req.params.rounds;
  var market = req.params.market;
  var valuation = req.params.valuation;
  if ( (country === "select country code" || country === 'null') &&
   (year === "select decade" || year === 'null')
    && (rounds === "select required rounds" || rounds === 'null')
    && (market === "select market" || market === 'null')
    && (valuation === "select valuation" || valuation === 'null')){
    return ["Hello"]
  }
  else {
    let query = `
    SELECT DISTINCT name, permalink
    FROM company
    WHERE (ROWNUM <= 100) `;
    if (country !== "select country code" && country !== 'null'){
      query = query + `AND (country_code = '${country}') `
    }
    if (year !== "select decade" && year !== 'null'){
      query = query + `AND ((FLOOR(founded_year/10)*10) >= '${year}') `
    }
    if (rounds !== "select required rounds" && rounds !== 'null'){
      query = query + `AND (funding_rounds >= '${rounds}') `
    }
    if (market !== "select market" && market !== 'null'){
      query = query + `AND (market = '${market}') `
    }
    if (valuation !== "select valuation" && valuation !== 'null'){
      query = query + `AND ((funding_total_usd/funding_rounds) <= '${valuation}') `
    }
    console.log(query);
    console.log("print here");
    console.log(market === 'null');
    console.log(country === 'null');
    console.log(year === 'null');
    console.log(rounds === 'null');
    try {
      let result = await executeQuery(query);
      res.json(result.rows);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Error in getting company list");
    }
  }
  // else{
  //   console.log("in The query")
  //   let query = `
  //   SELECT DISTINCT name, status, market, funding_total_usd, funding_rounds, country_code
  //   FROM company
  //   WHERE country_code = '${country}' AND (FLOOR(founded_year/10)*10) >= '${year}' AND funding_rounds >= '${rounds}' AND market LIKE '${market}' AND ROWNUM <= 20
  //   `;
  //   try {
  //     let result = await executeQuery(query);
  //     res.json(result.rows);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(501).send("Internal Error in getting company list");
  //   }
  // }
}

async function getFact1(req, res) {
  let query = `
  WITH A AS(
  SELECT c.NAME, c.PERMALINK
  FROM Company c JOIN Round r ON c.PERMALINK = r.COMPANY_PERMALINK
  WHERE c.COUNTRY_CODE != 'USA'
  GROUP BY c.PERMALINK, c.NAME
  HAVING COUNT(r.FUNDING_ROUND_PERMALINK) > 5 AND SUM(r.RAISED_AMOUNT_USD) > 1000000)
  SELECT c.NAME, c.PERMALINK
  FROM A JOIN Company c ON c.PERMALINK = A.PERMALINK
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting FACT 1");
  }
}

async function getFact2(req, res) {
  let query = `
  WITH A AS(
  SELECT c.country_code, c.name, c.market, c.permalink, c.funding_total_USD
  FROM Company c
  WHERE c.founded_year >= 2014 AND c.country_code != 'USA'
  AND funding_total_USD >= 500000 AND 
  (funding_total_USD/funding_rounds) >= 500000),
  C AS(
  SELECT MAX(A.funding_total_USD) AS max_val
  FROM A
  GROUP BY A.permalink
  ),
  D AS(
  SELECT A.permalink, A.name, A.market, A.country_code
  FROM A, C
  WHERE A.funding_total_USD = C.max_val AND ROWNUM <= 1
  ),
  E AS(
  SELECT MAX(A.funding_total_USD) as max_val_2
  FROM A, D
  WHERE A.country_code NOT IN D.country_code
  AND A.market NOT IN D.market
  GROUP BY A.permalink
  ),
  F AS(
  SELECT A.permalink, A.name, A.market, A.country_code
  FROM A, E
  WHERE E.max_val_2 = A.funding_total_USD AND ROWNUM <= 1)
  SELECT name,permalink, market, country_code
  FROM D
  UNION
  SELECT name,permalink, market, country_code
  FROM F
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting FACT 2");
  }
}

async function getFact3(req, res) {
  let query = `
  WITH combo AS (
   SELECT country_code, market FROM company
   GROUP BY country_code, market
  ),
  filled_table AS (
   SELECT combo.country_code, combo.market, c.name, c.permalink, c.funding_total_usd
   FROM combo JOIN company c ON combo.country_code = c.country_code AND combo.market = c.market
   WHERE ROWNUM <= 20 AND c.funding_total_usd >= ALL (
     SELECT company.funding_total_usd
     FROM company
     WHERE company.country_code = c.country_code AND company.market = c.market
   )
   ORDER BY combo.country_code, combo.market
  )
  SELECT f.country_code, f.market, f.name, f.permalink FROM filled_table f
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting FACT 3");
  }
}

async function getFact4(req, res) {
  let query = `
WITH risky 
     AS (SELECT NAME, permalink,
                funding_total_usd, 'risky' AS type
         FROM   company 
         WHERE  status = 'operating' 
                AND funding_total_usd < 0.75 * (SELECT Avg(funding_total_usd) 
                                                FROM   company) 
                AND founded_year >= 2012 
                AND ( market = 'Biotechnology' 
                       OR market = 'Clean Technology' 
                       OR market = 'Health and Wellness' 
                       OR market = 'Solar' 
                       OR market = 'Biotechnology' 
                       OR market = 'Startups' )), 
     safe 
     AS (SELECT NAME, permalink,
                funding_total_usd, 'safe' AS type
         FROM   company 
         WHERE  status = 'operating' 
                AND funding_total_usd >= 0.75 * (SELECT Avg(funding_total_usd) 
                                                 FROM   company) 
                AND funding_rounds >= 6 
                AND country_code = 'USA' 
                AND ( market = 'Software' 
                       OR market = 'Consulting' 
                       OR market = 'Universities' 
                       OR market = 'Utilities' 
                       OR market = 'Education' 
                       OR market = 'Colleges' 
                       OR market LIKE 'Big Data%' )), 
     medium 
     AS (SELECT NAME, permalink,
                funding_total_usd, 'medium' AS type
         FROM   company 
         WHERE  status = 'operating' 
                AND funding_total_usd > (SELECT Avg(funding_total_usd) 
                                         FROM   company) 
                AND funding_rounds >= 3 
                AND country_code = 'USA' 
                AND market NOT LIKE '%Travel%'), 
     portfolio 
     AS ((SELECT * 
          FROM   (SELECT * 
                  FROM   risky 
                  ORDER  BY dbms_random.value) 
          WHERE  rownum <= 2)  
         UNION 
         (SELECT * 
          FROM   (SELECT * 
                  FROM   medium 
                  ORDER  BY dbms_random.value) 
          WHERE  rownum <= 2)
          UNION 
         (SELECT * 
          FROM   (SELECT * 
                  FROM   safe 
                  ORDER  BY dbms_random.value) 
          WHERE  rownum <= 2)) 
SELECT name, permalink, type
FROM   portfolio 
  `;
  try {
    let result = await executeQuery(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error in getting FACT 4");
  }
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  testQuery,
  getCompany,
  getCompanyRounds,
  getCountryCode,
  getFoundedYear,
  getFundingRounds,
  getCompanyList,
  getMarket,
  searchCompany,
  addCompany,
  showPortfolio,
  deleteCompany,
  getFact1,
  getFact2,
  getFact3,
  getFact4
}