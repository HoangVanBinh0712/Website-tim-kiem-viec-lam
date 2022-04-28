import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'
const SinglePost = ({ post: { _id, name, description } }) => (
    <Card className='white-space: nowrap' border='success'  >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <p className='post-title'>{name}</p>
                    </Col>
					<Col className='text-right'>
						<ActionButtons _id={_id}/>
					</Col>
                </Row>
            </Card.Title>
            <Card.Text >{description}</Card.Text>
        </Card.Body>
    </Card>
)
export default SinglePost