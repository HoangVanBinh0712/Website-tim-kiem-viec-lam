import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Spinner from 'react-bootstrap/esm/Spinner'

const PostDetail = () => {
    let { id } = useParams();

    const { postState: {posts} } = useContext(PostContext)
    
    console.log(posts)
    const post = posts.find(post => post._id === id)
    let body = <Card className='white-space: nowrap' border='success'  >
            <Card.Body>
                <Card.Title >
                    <Row>
                        <Col>
                            <p className='post-title'>{post.title}</p>
                        </Col>
                        <Col className='text-right'>

                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text className='card-text'>Content: {post.content}</Card.Text>
                <Card.Text className='card-text'>Date End: {post.dateEnd}</Card.Text>

            </Card.Body>
        </Card>
    return <>{body}</>

}

export default PostDetail