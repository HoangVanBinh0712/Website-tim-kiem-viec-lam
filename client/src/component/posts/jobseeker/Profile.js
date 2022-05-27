import { useContext, useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { AuthContext } from '../../../contexts/AuthContext'
import Button from "react-bootstrap/esm/Button"
import { Navigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Toast from 'react-bootstrap/Toast'

const Profile = () => {
    const { authLoading, authState: { user, profile, profileLoading }, getProfile, createProfile, updateProfile,
        setShowToast, showToast: { show, message, type } } = useContext(AuthContext)

    const [update, setUpdate] = useState(false)

    const [newProfile, setNewProfile] = useState({
        name: profile ? profile.name : "",
        owner_email: profile ? profile.owner_email : "",
        phonenumber: profile ? profile.phonenumber : "",
        birthday: profile ? profile.birthday : "",
        introduce: profile ? profile.introduce : "",
        experience: profile ? profile.experience : "",
        degree: profile ? profile.degree : ""
    })
    useEffect(() => getProfile, [])

    const { name, owner_email, phonenumber, birthday, introduce, experience, degree } = newProfile

    const onChangeNewProfileForm = event =>
        setNewProfile({ ...newProfile, [event.target.name]: event.target.value })
    let body = null
    if (!user) {
        return <Navigate to={'/login'} />
    }
    else
        if (authLoading || profileLoading) {
            body = (
                <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
            )
        } else if (profile === null) {
            //Jobseeker
            const onSubmit = async event => {
                event.preventDefault()
                const { success, message } = await createProfile(newProfile)
                setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
            }

            body = (<>
                <div className="container" style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#2ecc71", color: "white" }}>Create profile </div>
                <Form onSubmit={onSubmit} className="container">
                    <Form.Group className="mb-3"  >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={owner_email} onChange={onChangeNewProfileForm} name='owner_email' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="Text" value={name} onChange={onChangeNewProfileForm} name='name' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="Text" value={phonenumber} onChange={onChangeNewProfileForm} name='phonenumber' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="Date" value={birthday} onChange={onChangeNewProfileForm} name='birthday' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Introduce</Form.Label>
                        <Form.Control type="Text" value={introduce} onChange={onChangeNewProfileForm} name='introduce' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Experience</Form.Label>
                        <Form.Control type="Text" value={experience} onChange={onChangeNewProfileForm} name='experience' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Degree</Form.Label>
                        <Form.Control type="Text" value={degree} onChange={onChangeNewProfileForm} name='degree' />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </>)
        } else {
            if (!newProfile || !newProfile.name) setNewProfile(profile)
            const onSubmit = async event => {
                event.preventDefault()
                const { success, message } = await updateProfile(newProfile)
                getProfile()
                setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
            }
            body = (<>
                <div className="container" style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#2ecc71", color: "white" }}>Your profile </div>

                <Form className="container" onSubmit={onSubmit}>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control readOnly={!update} type="email" value={owner_email} onChange={onChangeNewProfileForm} name='owner_email' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Name</Form.Label>
                        <Form.Control readOnly={!update} type="Text" value={name} onChange={onChangeNewProfileForm} name='name' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control readOnly={!update} type="Text" value={phonenumber} onChange={onChangeNewProfileForm} name='phonenumber' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control readOnly={!update} type="Text" value={birthday} onChange={onChangeNewProfileForm} name='birthday' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Introduce</Form.Label>
                        <Form.Control readOnly={!update} type="Text" value={introduce} onChange={onChangeNewProfileForm} name='introduce' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Experience</Form.Label>
                        <Form.Control readOnly={!update} type="Text" value={experience} onChange={onChangeNewProfileForm} name='experience' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Degree</Form.Label>
                        <Form.Control readOnly={!update} type="Text" value={degree} onChange={onChangeNewProfileForm} name='degree' />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={!update}>
                        Xác nhận cập nhật
                    </Button>
                </Form>
                <Button onClick={() => {
                    setUpdate(true)
                }}>
                    Cập nhật hồ sơ
                </Button>

            </>)
        }

    return <>
        {body}
        <Toast
            show={show}
            style={{ position: 'fixed', top: '20%', right: '10px' }}
            className={`bg-${type} text-white`}
            onClose={setShowToast.bind(this, {
                show: false,
                message: '',
                type: null
            })}
            delay={3000}
            autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
    </>
}
export default Profile