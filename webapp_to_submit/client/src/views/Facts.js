import React from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import TableView from "views/TableView.js";
import SingleCompany from "views/SingleCompany.js";
import { get } from "server-requests/request.js";
let qs = require('qs');

class Facts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null
    };


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
}


  render() {
    return (
      <>
        <div className="content">

        <h1>Click on a link for an interesting fact! </h1>

            <Row>
            <Col lg="12" md="12">
              <Card>
                <CardBody>
                  <div style={{fontSize: "18px", color: "#c0c1c2"}}>
                     
                    <a style={{color: "white", fontSize: "18px"}} href={`/admin/home?tableName=${encodeURIComponent("Fact 1")}&tablePath=${encodeURIComponent("/getFact1")}`}> Companies that have undergone more than 5 funding rounds and have raised more than a million dollars and not in USA </a> 
                  </div>
                  <div style={{fontSize: "16px", color: "#c0c1c2"}}>
                  </div>
                </CardBody>
              </Card>
            </Col>
            </Row>

            <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <div style={{fontSize: "18px", color: "#c0c1c2"}}>
                    <a style={{color: "white", fontSize: "18px"}} href={`/admin/home?tableName=${encodeURIComponent("Fact 2")}&tablePath=${encodeURIComponent("/getFact2")}`}> Two companies founded after 2014 with highest total funding and average funding greater than 500000, belonging to 2 different markets and 2 different countries </a> 
                  </div>
                </CardBody>
              </Card>
            </Col>
            </Row>

            <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <div style={{fontSize: "18px", color: "#c0c1c2"}}>
                    <a style={{color: "white", fontSize: "18px"}} href={`/admin/home?tableName=${encodeURIComponent("Fact 3")}&tablePath=${encodeURIComponent("/getFact3")}`}> Grouped by country and industry, names of the top performing country in each group - i.e. which has recieved the most funding </a> 
                  </div>
                </CardBody>
              </Card>
            </Col>
            </Row>

            <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <div style={{fontSize: "18px", color: "#c0c1c2"}}>
                    <a style={{color: "white", fontSize: "18px"}} href={`/admin/home?tableName=${encodeURIComponent("Fact 4")}&tablePath=${encodeURIComponent("/getFact4")}`}> Portfolio builder that randomly draws 2 names each from a balanced selection of risky, medium and safe companies </a> 
                  </div>
                </CardBody>
              </Card>
            </Col>
            </Row>
          
    </div>   

  


      </>


    );
  }
}

export default Facts;