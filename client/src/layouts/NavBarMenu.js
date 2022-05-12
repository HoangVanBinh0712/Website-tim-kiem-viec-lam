import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../assets/logo.svg'
import logoutIcon from '../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import ChangePasswordModal from '../component/account/ChangePasswordModal'
import { PostContext } from '../contexts/PostContext'
import { UserContext } from '../contexts/UserContext'

const NavbarMenu = () => {
	const {
		authState: {
			user
		},
		logoutUser		
	} = useContext(AuthContext)
	const {setShowModal} = useContext(UserContext)
	let body
	if(user)
	{
		var username = user.name ? user.name : user.companyname
		const logout = () => logoutUser()
		body = <>
		<>
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				CNPM HĐT
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/about'
						as={Link}
					>
						About
					</Nav.Link>
				</Nav>

				<Nav>
					<Nav.Link className='font-weight-bolder text-white' >
						{username}
					</Nav.Link>
				</Nav>
				<Nav>
					{user.role === 0 && <>
						<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
						Jobseeker
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item to="/information" as={Link}>Account</Dropdown.Item>
							<Dropdown.Item onClick={setShowModal.bind(this, true)}>Change Password</Dropdown.Item>
							<Dropdown.Item href="#">Marked Posts</Dropdown.Item>
							<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>

						</Dropdown.Menu>
					</Dropdown>
					</>}
					{user.role === 1 && 						
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
						Employer
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item to="/information" as={Link}>Account</Dropdown.Item>
							<Dropdown.Item onClick={setShowModal.bind(this, true)}>Change Password</Dropdown.Item>
							<Dropdown.Item href="#">Your Posts</Dropdown.Item>
							<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>

						</Dropdown.Menu>
					</Dropdown>}

					{user.role === 2 && <Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
						Admin
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item to="/information" as={Link}>Account</Dropdown.Item>
							<Dropdown.Item href="#">Uncensored Posts</Dropdown.Item>
							<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		<ChangePasswordModal/>
		</>
		</>
	}else{
		body = <>
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				CNPM HĐT
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/about'
						as={Link}
					>
						About
					</Nav.Link>
				</Nav>

				<Nav>
					<Nav.Link className='font-weight-bolder text-white' >
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		</>
	}


	return (body)
}

export default NavbarMenu