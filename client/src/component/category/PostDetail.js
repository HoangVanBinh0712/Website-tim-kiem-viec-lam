import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext'

const PostDetail = () => {
    const { id } = useParams()
    const { postState: { post, posts, postsLoading }, findPost,findPostById} = useContext(PostContext)

    useEffect(() => {findPost(id)}, [])

    console.log(post)
    return <Card className='white-space: nowrap' border='success'  >
        <Card.Body>
            <Card.Title >
                <Row>
                    <Col>
                        <p className='post-title'>{}</p>
                    </Col>
                    <Col className='text-right'>

                    </Col>
                </Row>
            </Card.Title>
            <Card.Text className='card-text'>{ }</Card.Text>
            <Card.Text className='card-text'>{}</Card.Text>

        </Card.Body>
    </Card>

}

export default PostDetail