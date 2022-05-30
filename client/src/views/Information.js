import { useContext, useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { AuthContext } from "../contexts/AuthContext"
import Button from "react-bootstrap/esm/Button"
import { Navigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Toast from 'react-bootstrap/Toast'

const InforMation = () => {
    const { authLoading, authState: { user }, adjustUser,
        setShowToast, showToast: { show, message, type } } = useContext(AuthContext)
    var username = user.name ? user.name : user.companyname

    const [newUser, setNewUser] = useState({
        name: username,
        email: user.email,
        role: user.role,
        phonenumber: user.phonenumber,
        address: user.address,
        birthday: user.birthday
    })
    const [newEmployer, setNewEmployer] = useState({
        companyname: username,
        email: user.email,
        role: user.role,
        phonenumber: user.phonenumber,
        address: user.address,
        description: user.description
    })
    let body = null
    if (authLoading) {
        body = (
            <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
        )
    } else if (!user) {
        return <Navigate to={'/login'} />
    } else {

        if (user.role === 0) {

            //Jobseeker

            const { name, email, phonenumber, address, birthday } = newUser
            const onChangeNewUserForm = event =>
                setNewUser({ ...newUser, [event.target.name]: event.target.value })

            const onSubmit = async event => {
                event.preventDefault()
                const { success, message } = await adjustUser(newUser)
                setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
            }

            body = (<>
                <Form onSubmit={onSubmit} className="container">
                    <Form.Group className="mb-3"  >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} onChange={onChangeNewUserForm} name='email' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="Text" value={name} onChange={onChangeNewUserForm} name='name' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="Text" value={phonenumber} onChange={onChangeNewUserForm} name='phonenumber' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="Text" value={address} onChange={onChangeNewUserForm} name='address' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="Text" value={birthday} onChange={onChangeNewUserForm} name='birthday' />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Xác nhận thay đổi
                    </Button>
                </Form>

            </>)

        }
        else if (user.role === 1) {
            //Employer

            const { companyname, email, phonenumber, address, description } = newEmployer
            const onChangeNewUserForm = event =>
                setNewEmployer({ ...newEmployer, [event.target.name]: event.target.value })

            const onSubmit = async event => {
                event.preventDefault()
                const { success, message } = await adjustUser(newEmployer)
                setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
            }

            body = (<>
                <Form onSubmit={onSubmit} className="container">
                    <Form.Group className="mb-3"  >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} onChange={onChangeNewUserForm} name='email' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="Text" value={companyname} onChange={onChangeNewUserForm} name='companyname' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="Text" value={phonenumber} onChange={onChangeNewUserForm} name='phonenumber' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="Text" value={address} onChange={onChangeNewUserForm} name='address' />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="Text" value={description} onChange={onChangeNewUserForm} name='description' />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Xác nhận thay đổi
                    </Button>
                </Form>
            </>)
        } else if (user.role === 2) {
            //Admin
            body = (<>
                <Form className="container">
                    <Form.Group className="mb-3"  >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" defaultValue={user.email} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="Text" defaultValue={username} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="Text" defaultValue={user.phonenumber} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="Text" defaultValue={user.address} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="Text" defaultValue={user.contact} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3"  >
                        <Form.Label>Time Approved</Form.Label>
                        <Form.Control type="Text" defaultValue={user.timeApproved} readOnly />
                    </Form.Group>
                </Form>
            </>)
        } else {
            //Not found
        }
    }

    return <>
        <div className="container" style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#78c2ad", color: "white", borderRadius:"20px 20px 0px 0px"}}>Thông tin cá nhân </div>
        <div className="grid-container container">
            {body}
            <div>
                <img src="https://goodluckfurni.com/wp-content/uploads/2019/06/IMG_0473.jpg" width="100%" height="80%" />
            </div>
        </div>
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
export default InforMation