import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Das.css'

const Dashboard = () => {
  return (

    <>
      <div className='top'>ssss</div>
    
      <Container>
        <Row>
          <Col sm={12}><br /><br />
        
            <div className='main-card'>
              <h3 className='heading slide-right'>WELCOME TO THE ADMINPANNEL</h3>
            </div>
            <div className="name">
              <p>Dashboard</p>
              <div className="hover">
                <Link href="#" class="link">The Muse Inc</Link>
              </div>
            </div>
            </Col>
          
        </Row>
      </Container>



    </>
  )
}

export default Dashboard