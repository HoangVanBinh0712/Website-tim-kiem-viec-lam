import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'
import { useContext, useState } from 'react'
import Alert from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import

const ActionButtons = ({ url, _id , ptitle }) => {
	const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)
	const choosePost = postId => {
		findPost(postId)
		setShowUpdatePostModal(true)
	}


	return (
		<>
			<Button className='post-button' onClick={choosePost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			{/* Message box */}
			<Button className='post-button' onClick={() => {
				const confirmBox = window.confirm(
					"Do you really want to delete '" + ptitle + "' ?"
				)
				if (confirmBox === true) {
					{deletePost(_id)}
				}
			}}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons