import { useContext } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { AuthContext } from "../../../contexts/AuthContext"
import SingleProfile from "./SingleProfile"

const ProfileSearch = () => {
    const { authState: { user, profileLoading, profiles } } = useContext(AuthContext)
    let body = null
    var username = ""
    if (user)
        username = user.name ? user.name : user.companyname

    if (profileLoading) {
        body = (
            <div className="spinner-container" style={{marginTop: "10rem"}}><Spinner animation="border" variant="info" /></div>
        )
    } else if (profiles.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            No profile found !
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (<>
            <Row className='g-4 mx-auto mt-3 container' >
                {profiles.map(profile => (
                    <Row key={profile._id} className='my-2'>
                        <SingleProfile profile={profile} />
                    </Row>
                ))}
            </Row>
        </>)
    }


    return <>
        <div className="container" style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#2ecc71", color: "white" }}>Search profile </div>
        {body}
    </>
}
export default ProfileSearch