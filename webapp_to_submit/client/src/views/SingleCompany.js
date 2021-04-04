import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";

import { statusMap, fundingTypeMap } from "variables/maps.js";
import { countries, states } from "variables/countries.js";
import { get } from "server-requests/request.js"
let qs = require('qs');

class SingleCompany extends React.Component {
  constructor(props) {
    super(props);
    this.companyPermalink = props.company;
    this.state = {
      company: {},
      rounds: []
    }
  }

 async componentDidMount() {
    let companyPermalink = this.companyPermalink;
    if (companyPermalink === undefined || companyPermalink === 'null') { return null; }
    let companyRows = await get("/get_company?company="+companyPermalink);
    let roundRows = await get("/get_company_rounds?company="+companyPermalink);
    console.log(roundRows);
    this.setState({
      company: companyRows[0],
      rounds: roundRows
    });
  }

  getOperatingStatus() {
    let status = this.state.company['STATUS'];
    let className = statusMap[status];
    return (<span className={className}>{status}</span>);
  }

  createFoundedStr() {
    const year = "" + this.state.company['FOUNDED_YEAR'];
    console.log("TIME LOOK: " + this.state.company['FOUNDED_AT']);
    const d = new Date(this.state.company['FOUNDED_AT'].split('T')[0]);
    return `${new Intl.DateTimeFormat('en', { month: 'long' }).format(d)}, ${year}`;
  }

  createLocationStr() {
    let city = this.state.company['CITY'];
    let stateCode = states[this.state.company['STATE_CODE']];
    let country = countries[this.state.company['COUNTRY_CODE']];
    if (stateCode != undefined) {
      return `${city}, ${stateCode}, ${country}`;
    } else {
      return `${city}, ${country}`;
    }
  }

  createCategoriesStr() {
    let result = this.state.company['CATEGORY_LIST'];
    if (result.startsWith('|')) {
      result = result.substr(1);
    }
    if (result.endsWith('|')) {
      result = result.slice(0, -1);
    }
    return result.split("|").join(", ");
  }

  getCurrencyStr(input) {
    return "$" + input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async addToPortfolio(company) {
    try {
      // console.log("LOOK: " + company);
      await get("/addCompany/"+company);
    } catch (err) {
      console.log(err);
    }
    window.location.href = '/admin/portfolio'
  }

  createTableRows() {
    return this.state.rounds.map(round => (
      <tr>
        <td>{`${round['FUNDED_DATE']}, ${round['FUNDED_YEAR']}`}</td>
        <td className="text-center">{fundingTypeMap[round['FUNDING_ROUND_TYPE']]}</td>
        <td className="text-center">{this.getCurrencyStr(round['RAISED_AMOUNT_USD'])}</td>
      </tr>
    ));
  }

  render() {
    let company = this.state.company;
    if (Object.keys(company).length === 0) { return null; }
    return (
      <>
        <div className="content">

          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <h1> <a className="dan-link" href={`${company['HOME_PAGEURL']}`}>{company['NAME']}</a> &ensp;
                    <small style={{fontSize: "50%", fontWeight: "200", textTransform: "none"}}>
                      ({this.getOperatingStatus()})
                    </small> 
                  </h1>
                  <div style={{textAlign: "right", position: "absolute", right: "15px", transform: "translate(0, -65px)"}}>
                    <button className="submit-btn" class="btn btn-success" id="SubmitBtn" onClick= {() => this.addToPortfolio(company['NAME'])} >Add To Portfolio</button>
                  </div>
                  <div className="dan-display-line">
                    <p>
                      <span><b>Founded</b></span>
                      {this.createFoundedStr()}
                    </p>
                  </div>
                  <div className="dan-display-line">
                    <p>
                      <span><b>Location</b></span>
                      {this.createLocationStr()}
                    </p>
                  </div>
                  <div className="dan-display-line">
                    <p>
                      <span><b>Market</b></span>
                      {company['MARKET']}
                    </p>
                  </div>
                  <div className="dan-display-line">
                    <p>
                      <span><b>Industries</b></span>
                      {this.createCategoriesStr()}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="6" md="12">
              <Card>
                <CardBody>
                  <div className="dan-title-line" style={{fontSize: "18px", color: "#c0c1c2"}}>
                    Number of Funding Rounds: <span>{company['FUNDING_ROUNDS']}</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardBody>
                  <div className="dan-title-line" style={{fontSize: "18px", color: "#c0c1c2"}}>
                    Funding Total: <span>{this.getCurrencyStr(this.state.company['FUNDING_TOTAL_USD'])}</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Funding History</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Date of Close</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Amount Raised ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.createTableRows()}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>    
      </>
    );
  }
}

export default SingleCompany;