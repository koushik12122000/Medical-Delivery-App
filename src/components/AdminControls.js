import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import Filters from './Filters'
import AddUser from './AddUser'
import DateControl from './DateControl'
import ZipControl from './ZipControl'
import OrderList from './OrderList'

const AdminControls = ({setFilters}) => {
    return (
        <div>
            <Accordion defaultActiveKey="4">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4" style={{ cursor: 'pointer', fontWeight: 'bold', backgroundColor: '#e8f5e9' }}>Medicine Delivery Orders</Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <OrderList/>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={{ cursor: 'pointer' }}>Appointment Filters</Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Filters setFilters={setFilters}/>  
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" style={{ cursor: 'pointer' }}>Add Admin User</Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <AddUser/>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2" style={{ cursor: 'pointer' }}>Manage Dates</Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <DateControl/>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3" style={{ cursor: 'pointer' }}>Manage Delivery PIN Codes</Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <ZipControl/>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            
        </div>
    )
}

export default AdminControls

