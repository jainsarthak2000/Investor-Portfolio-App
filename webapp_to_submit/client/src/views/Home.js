import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import TableView from "views/TableView.js";
import SingleCompany from "views/SingleCompany.js";
import { get } from "server-requests/request.js"
// import {this.state.companyList} from "views/Portfolio.js"
let qs = require('qs');


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null,
      values: {},
      countries: [],
      selected_market: null,
      founded_year: [],
      funding_rounds: [],
      selected_country: null,
      selected_rounds: null,
      selected_year: null,
      selected_valuation: null,
      final_name: [],
      final_market: [],
      final_funding: [],
      final_country: [],
      final_founded: [],
      final_lastfunding: [],
      average_valuation: [],
      companyName: null,
      returnedPermalink: null,
      market: null,
    };
    this.handleChangeMarket = this.handleChangeMarket.bind(this);
    this.handleChangeFundingRounds = this.handleChangeFundingRounds.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeValuation = this.handleChangeValuation.bind(this);
    this.handleChangecompanyName = this.handleChangecompanyName.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.submitNameSearch = this.submitNameSearch.bind(this);
    this.addToPortfolio = this.addToPortfolio.bind(this);
  } 

  async componentDidMount() {
    let obj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

     if (obj.tablePath !== undefined) { 
      this.setState({
        component: "table",
        values: {
          tablePath: obj.tablePath,
          tableName: obj.tableName,
        }
        
      });
      return;
    }
    if (obj.company !== undefined) { 
      this.setState({
        component: "company",
        values: {
          value: obj.company
        }
      });
      return;
    }
    
    fetch("http://localhost:8081/get_country_code",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(countryList => {
      if (!countryList) return;
      console.log(countryList)
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
	  let countryDivs = countryList.map((conObj, i) =>
	  
	  <option value={conObj.COUNTRY_CODE} key = {i} > 
		  {conObj.COUNTRY_CODE}
		  
		  </option>
	  );
      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        countries: [<option> select country code </option>,countryDivs]
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
	
    this.setState({
        founded_year: [<option> select decade </option>,<option>1900</option>,<option>1910</option>,<option>1920</option>,<option>1930</option>,<option>1940</option>,<option>1950</option>,<option>1960</option>,<option>1970</option>,
        <option>1980</option>,<option>1990</option>,<option>2000</option>,<option>2010</option>]
      });

    this.setState({
        funding_rounds: [<option> select required rounds </option>,<option>1</option>,<option>2</option>,<option>3</option>,<option>4</option>,<option>5</option>,<option>6</option>,<option>7</option>,<option>8</option>,
        <option>9</option>,<option>10</option>,<option>11</option>,<option>12</option>,<option>13</option>,<option>14</option>,<option>15</option>,<option>16</option>,<option>18</option>]
      });

    console.log("SENDING GET MARKET QUERY!!");
    fetch("http://localhost:8081/get_market",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(marketList => {
      if (!marketList) return;
      console.log("WE BACK!!!");
      console.log(marketList)
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
	  let marketDivs = marketList.map((conObj, i) =>
	  
	  <option value={conObj.MARKET} key = {i} > 
		  {conObj.MARKET}
		  
		  </option>
	  );
      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        market: [<option> select market </option>,marketDivs]
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

    this.setState({
        average_valuation: [<option> select valuation </option>,<option>0.25M USD</option>,<option>0.5M USD</option>,<option>0.75M USD</option>,<option>1M USD</option>,<option>2M USD</option>,<option>4M USD</option>,<option>6M USD</option>,<option>8M USD</option>,
        <option>10M USD</option>,<option>50M USD</option>,<option>100M USD</option>,<option>1B USD</option>,<option>7B USD</option>]
      });
  } 	

  handleChangeCountry(e) {
		this.setState({
			selected_country: e.target.value
    });
	}

  handleChangeYear(e) {
    this.setState({
      selected_year: e.target.value
    });
    
  }
  handleChangeFundingRounds(e) {
    this.setState({
      selected_rounds: e.target.value
    });
    
  }

  handleChangeMarket(e) {
    this.setState({
      selected_market: e.target.value
    });
  }

  handleChangecompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }

  handleChangeValuation(e) {
    var final = "";
    if (e.target.value === "0.25M USD"){
      final = 250000
    }
    if (e.target.value === "0.5M USD"){
      final = 500000
    }
    if (e.target.value === "0.75M USD"){
      final = 750000
    }
    if (e.target.value === "1M USD"){
      final = 1000000
    }
    if (e.target.value === "2M USD"){
      final = 2000000
    }
    if (e.target.value === "4M USD"){
      final = 4000000
    }
    if (e.target.value === "6M USD"){
      final = 6000000
    }
    if (e.target.value === "8M USD"){
      final = 8000000
    }
    if (e.target.value === "10M USD"){
      final = 10000000
    }
    if (e.target.value === "50M USD"){
      final = 50000000
    }
    if (e.target.value === "100M USD"){
      final = 100000000
    }
    if (e.target.value === "1B USD"){
      final = 1000000000
    }
    if (e.target.value === "7B USD"){
      final = 7000000000
    }
    this.setState({
      selected_valuation: final
    });
  }

  submitFilters() {
    // console.log(this.state.selected_country);
    // console.log(this.state.selected_year);
    // console.log(this.state.selected_rounds);
    // console.log(this.state.selected_market);
    // console.log("BIG FUCKIN BAM!!!!");

    // window.location.href = `/admin/home?tableName=${encodeURIComponent("Filtered Companies")}&tablePath=${encodeURIComponent("/getCompany/"+ this.state.selected_country + "/" + this.state.selected_year + "/" + this.state.selected_rounds + "/" + this.state.selected_market + "/" + this.state.selected_valuation)}`;
    // Send an HTTP request to the server.
        fetch("http://localhost:8081/getCompany/" + this.state.selected_country + "/" + this.state.selected_year + "/" + this.state.selected_rounds + "/" + this.state.selected_market,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(companyList => {
          if (!companyList) return;

          // Map each attribute of a movie in this.state.movies to an HTML element
          console.log(companyList);
          // let moviesDivs = moviesList.map((movie, i) =>
          // <RecommendationsRow id={"movieResults-" + movie.title} title = 
          // {movie.title} id = {movie.id} rating = {movie.rating} 
          // vote_count = {movie.vote_count}
          // />);

          // Set the state of the person list to the value returned by the HTTP response from the server.
          // this.setState({
          //   recMovies: moviesDivs
          // });
      }, err => {
          // Print the error if there is one.
          console.log(err);
      }); 


    //HERE
  }

  submitNameSearch() {
    // Send an HTTP request to the server.
      if (this.state.companyName == "") { return; }
      fetch("http://localhost:8081/searchCompany/" + this.state.companyName,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(companyList => {
          if (!companyList || companyList.length == 0) return;
          console.log(companyList)
          // Map each attribute of a movie in this.state.movies to an HTML element
          window.location.href = `/admin/home?company=${encodeURIComponent(companyList[0]['PERMALINK'])}`
      }, err => {
          // Print the error if there is one.
          console.log(err);
      }); 
  }

  addToPortfolio(){
      //Adding to the portfolio 
      if (this.state.companyName == "") { return; }
      fetch("http://localhost:8081/addCompany/" + this.state.companyName,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
            // Print the error if there is one.
            console.log(err);
        }).then(companyList => {
          if (!companyList || companyList.length == 0) return;
      }, err => {
          // Print the error if there is one.
          console.log(err);
          window.location.href = '/admin/portfolio'
      });
  }

  render() {
    if (this.state.component === null) {
      return (
        <>
          <div className="content">

          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <td className="countries-container" style={{fontSize: "14px", color: "#c0c1c2", padding: "1px 50px 1px"}}>
                    LOCATION
                    <td className="dropdown-container">
                      <select value={this.state.selected_country} onChange={this.handleChangeCountry} className="dropdown" id="countriesDropdown">
                      {this.state.countries}
                      </select>
                    </td>
                  </td>
                  <td className="market-container" style={{fontSize: "14px", color: "#c0c1c2", padding: "1px 50px 1px"}}>
                   MARKET
                    <td className="dropdown-container">
                      <select value={this.state.selected_market} onChange={this.handleChangeMarket} className="dropdown" id="marketDropdown">
                      {this.state.market}
                      </select>
                    </td>
                  </td>
                  <td className="valuation-container" style={{fontSize: "14px", color: "#c0c1c2", padding: "1px 50px 1px"}}>
                    AVERAGE FUNDING PER ROUND (LESS THAN)
                    <td className="dropdown-container">
                      <select value={this.state.selected_valuation} onChange={this.handleChangeValuation} className="dropdown" id="valuationDropdown">
                      {this.state.average_valuation}
                      </select>
                   </td>
                  </td>
			          </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <td className="founded-container" style={{fontSize: "14px", color: "#c0c1c2", padding: "1px 50px 1px"}}>
                  FOUNDING DECADE
                    <td className="dropdown-container">
                      <select value={this.state.selected_year} onChange={this.handleChangeYear} className="dropdown" id="yearsDropdown">
                      {this.state.founded_year}
                      </select>
                    
                    </td>
                  </td>
                  <td className="rounds-container" style={{fontSize: "14px", color: "#c0c1c2", padding: "1px 250px 1px 85px"}}>
                  NUMBER OF ROUNDS (GREATER THAN)
                    <td className="dropdown-container">
                      <select value={this.state.selected_rounds} onChange={this.handleChangeFundingRounds} className="dropdown" id="roundDropdown">
                      {this.state.funding_rounds}
                      </select>
                    </td>
                  </td>
                  <td style={{verticalAlign: "middle"}}>
                  <a href={`/admin/home?tableName=${encodeURIComponent("Filtered Companies")}&tablePath=${encodeURIComponent("/getCompany/"+ this.state.selected_country + "/" + this.state.selected_year + "/" + this.state.selected_rounds + "/" + this.state.selected_market + "/" + this.state.selected_valuation)}`}>
                  <button style={{marginRight:"300px"}} className="submit-btn" class="btn btn-success" id="SubmitBtn" onClick= {this.submitFilters}>
                    Submit
                  </button>
                  </a>
                  </td>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
              <Col md="12">
              <Card>
                <CardBody>
                <div className="input-container">
                <input type='text' placeholder="Enter Company" value={this.state.companyName} onChange={this.handleChangecompanyName} id="companyName" className="company-input"/>
              {/* <button className="submit-btn" class="btn btn-success" id="SubmitBtn" onClick= {this.submitNameSearch}>
              Confirm</button>
              <a href={`/admin/home?company=${encodeURIComponent(this.state.returnedPermalink)}`}> */}
              &ensp;&ensp;
              <button className="submit-btn" class="btn btn-success" id="SubmitBtn" onClick= {this.submitNameSearch}>
              Search</button>
              {/* </a> */}
              &ensp;&ensp;
              <button className="submit-btn" class="btn btn-success" id="SubmitBtn" onClick= {this.addToPortfolio}>
              Add To Portfolio</button>
              </div>
                </CardBody>
              </Card>
            </Col>
          </Row>    

			    </div>

        </>
      );
    } else if (this.state.component === "table") {
      return (<TableView tablePath={this.state.values.tablePath} tableName={this.state.values.tableName}/>);
    } else if (this.state.component === "company") {
      return (<SingleCompany company={this.state.values.value}/>);
    }
  }
}





export default Home;