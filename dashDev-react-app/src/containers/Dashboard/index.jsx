import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Dashboard = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Happy Hacking!</h3>
      </Col>
    </Row>
  </Container>
);

export default Dashboard;
