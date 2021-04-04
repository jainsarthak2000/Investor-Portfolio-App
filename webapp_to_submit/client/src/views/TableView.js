import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";

import { statusMap, fundingTypeMap } from "variables/maps.js";
import { countries, states } from "variables/countries.js";
import { get } from "server-requests/request.js"
/*
  async function addToPortfolio() {
    console.log(this.state.company);
}
*/
class TableView extends React.Component {
  constructor(props) {
    super(props);

    this.tableName = "Simple Table";
    if (props.tableName !== undefined && props.tableName !== null) {
      this.tableName = props.tableName;
    }

    this.tablePath = props.tablePath;
    // this.deleteNameInputRef = React.createRef();

    this.state = {
      rows: [],
      permalinkName: null,
      addCompanyName: null,
      deleteCompanyName: null,
      returnedPermalink: null
    };

    this.deleteToPortfolio = this.deleteToPortfolio.bind(this);
    this.addToPortfolio = this.addToPortfolio.bind(this);
    this.submitAdd = this.submitAdd.bind(this);
    this.handleChangecompanyName = this.handleChangecompanyName.bind(this);
    this.handleChangecompanyDeleteName = this.handleChangecompanyDeleteName.bind(this);
  }

  async componentDidMount() {
    // let companyPermalink = "/organization/google";
    // let rows = await get("/get_company?company="+companyPermalink);
    let companyPermalink = "/organization/google";
    let rows = await get("/get_company?company=" + companyPermalink);
    console.log("Here is the query result:");
    console.log(rows);
    let keys = Object.keys(rows[0]);

    rows = await get(this.tablePath);
    try { keys = Object.keys(rows[0]); }
    catch (e) { console.error(e); }

    let permalinkName = null;
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i].toLowerCase();
      if (key === "permalink" || key === "company_permalink") {
        permalinkName = keys[i];
      }
    }
    console.log(rows);
    this.setState({
      rows: rows,
      permalinkName: permalinkName
    });
  }

  createTableHead() {
    return Object.keys(this.state.rows[0]).map(key => {
      if (key === this.state.permalinkName) { return; }
      return (<th>{key}</th>);
    });
  }

  createTableRows() {
    let keys = Object.keys(this.state.rows[0]);
    return this.state.rows.map(row => {
      let link = null;
      let permalinkName = this.state.permalinkName;
      if (permalinkName !== null) {
        link = row[permalinkName];
      }
      return (
        <tr onClick={() => this.goTo(link)}>
          {this.createRowElement(keys, row, link)}
        </tr>
      );
    });
  }

  createRowElement(keys, row, link) {
    let permalinkName = this.state.permalinkName;
    return keys.map(key => {
      if (permalinkName !== null && key === permalinkName) { return; }
      return (<td>{row[key]}</td>);
    })
  }

  goTo(link) {
    if (link === null || link === "") { return; }
    window.location.href = `/admin/home?company=${encodeURIComponent(link)}`;
    // history.push(`/single_company?company=${link}`);
  }

  handleChangecompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }

  handleChangecompanyDeleteName(e) {
    this.setState({
      companyDeleteName: e.target.value
    });
  }

  addToPortfolio(){
    //Adding to the portfolio 
    console.log("CLICKED addToPortfolio BUTTON!!!! " + this.state.companyName);
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
        window.location.href = '/admin/portfolio'
    }, err => {
        // Print the error if there is one.
        window.location.href = '/admin/portfolio'
        console.log(err);
    });
}

deleteToPortfolio(){
  //Adding to the portfolio 
  console.log("CLICKED deleteToPortfolio BUTTON!!!!");
  fetch("http://localhost:8081/deleteCompany/" + this.state.companyDeleteName,
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
      window.location.href = '/admin/portfolio'
  }, err => {
      // Print the error if there is one.
      window.location.href = '/admin/portfolio'
      console.log(err);
  });
}

submitAdd() {
  // Send an HTTP request to the server.
  console.log("CLICKED submitAdd BUTTON!!!!"); return;
    //   fetch("http://localhost:8081/showPortfolio",
    //   {
    //     method: 'GET' // The type of HTTP request.
    //   }).then(res => {
    //       // Convert the response data to a JSON.
    //       return res.json();
    //   }, err => {
    //       // Print the error if there is one.
    //       console.log(err);
    //   }).then(companyList => {
    //     // if (!companyList || companyList.length == 0) return;
    //     // console.log(companyList)
    //     // // Map each attribute of a movie in this.state.movies to an HTML element
    //     // this.setState({
    //     //   returnedPermalink: companyList[0]['PERMALINK']
    //     // });

    // }, err => {
    //     // Print the error if there is one.
    //     console.log(err);
    // }); 
}

submitDeleteSearch() {
  // Send an HTTP request to the server.
    console.log("CLICKED submitDeleteSearch BUTTON!!!!");
    //   fetch("http://localhost:8081/searchCompany/" + this.state.companyName,
    //   {
    //     method: 'GET' // The type of HTTP request.
    //   }).then(res => {
    //       // Convert the response data to a JSON.
    //       return res.json();
    //   }, err => {
    //       // Print the error if there is one.
    //       console.log(err);
    //   }).then(companyList => {
    //     if (!companyList || companyList.length == 0) return;
    //     console.log(companyList)
    //     // Map each attribute of a movie in this.state.movies to an HTML element
    //     this.setState({
    //       returnedPermalink: companyList[0]['PERMALINK']
    //     });

    // }, err => {
    //     // Print the error if there is one.
    //     console.log(err);
    // }); 
  }

  render() {
    if (this.state.rows.length === 0) { return this.renderEmptyView(); }
    return (
      <>
        <div className="content">

          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">{this.tableName}</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        {this.createTableHead()}
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

        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                  <p style={{ fontSize: "15px" }}>
                    Type Company name to add to your portfolio:
                  </p>
                  {/* <Col>
                    
                  </Col> */}
                  {/* <Col> */}
                    
                  <input type='text' placeholder="Enter Name" value={this.state.companyName} onChange={this.handleChangecompanyName} id="companyName" className="company-input"/>
                    
                    {/* <a href={`/admin/showPortfolio`}> */}
                &ensp;&ensp;
                <button className="submit-btn" class="btn btn-success" id="AddBtn" onClick={this.addToPortfolio}>Add</button>
                {/* <button className="submit-btn" class="btn btn-success" id="SubmitBtn" onClick={this.submitAdd}>Search</button> */}
                {/* </a> */}
                  {/* </Col> */}
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                  <p style={{ fontSize: "15px" }}>
                    Type Company name to delete from your portfolio:
                   </p>
                  {/* <Col> */}
                    <input type="text" placeholder="Enter Name" value={this.state.companyDeleteName} onChange={this.handleChangecompanyDeleteName}
                      name="inputbox" id="companyDeleteName" >
                    </input>
                  {/* </Col> */}
                  {/* <Col> */}
                  &ensp;&ensp;
                    <button className="submit-btn" class="btn btn-success" id="DeleteBtn" onClick={this.deleteToPortfolio}>Delete</button>
                  {/* </Col> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
      </>
    );
  }

  renderEmptyView() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Empty {this.tableName}</CardTitle>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </>      
    )
  }
}


export default TableView;