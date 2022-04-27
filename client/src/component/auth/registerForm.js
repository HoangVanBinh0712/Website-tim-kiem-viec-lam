import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import AlertMessage from '../../layouts/Alert'

const RegisterForm = () => {
    //Context
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        mode: ''
    })
    const { registerUser, authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    const [alert, setAlert] = useState(null)

    if (authLoading) {
        return <>
            <div className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <h1>Login</h1>
                        <h4>Help you to find your best comfortable job</h4>
                        <div className='d-flex justify-content-center mt-2'>
                            <Spinner animation='border' variant='info' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    } else if (isAuthenticated) return <Navigate to={'/dashboard'} />


    var { email, password, confirmPassword, mode, phonenumber, address, name, birthday } = registerForm

    const onChangeRegisterForm = event => setRegisterForm({
        ...registerForm, [event.target.name]: event.target.value
    })
    const register = async event => {
        event.preventDefault()
        if (!registerForm.mode) registerForm.mode = '0'
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' })
            setTimeout(() => setAlert(null), 5000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log('error')
        }

    }

    return (
        <>
            <div className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <h1>Register</h1>
                        <h4>Help you to find your best comfortable job</h4>
                        <Form className='my-4' onSubmit={register}>
                            <AlertMessage info={alert} />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type='email' placeholder='Email' name='email' value={email} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type='text' placeholder='Phone' name='phonenumber' value={phonenumber} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type='text' placeholder='Address' name='address' value={address} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type='text' placeholder='Name' name='name' value={name} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type='Date' placeholder='BirthDay' name='birthday' value={birthday} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type='password' placeholder='Password' name='password' value={password} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type='password' placeholder='Cofirm Password' name='confirmPassword' value={confirmPassword} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Button variant='success' type='submit'>Register</Button>
                        </Form>
                        <p>Already have an account ?
                            <Link to={'/login'}>Login</Link>
                        </p>
                        <p>
                            Are you Employer ?
                            <Link to={'/registerEmp'}>Register as Employer</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>)
}
export default (RegisterForm)