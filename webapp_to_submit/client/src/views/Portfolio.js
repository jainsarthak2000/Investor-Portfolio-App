import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";

import { statusMap, fundingTypeMap } from "variables/maps.js";
import { countries, states } from "variables/countries.js";
import { get } from "server-requests/request.js"
import TableView from "views/TableView.js";

class Portfolio extends React.Component {

  constructor(props) {
    super(props);
    this.company = props.permalink;
    console.log(props.permalink)
    this.state = {
      companyList: []
    }
  }

  render() {
    return (<TableView tablePath={'/showPortfolio'} tableName={"Portfolio"}/>);
  }

}

export default Portfolio;