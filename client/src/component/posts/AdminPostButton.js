import Button from 'react-bootstrap/Button'
import { PostContext } from '../../contexts/PostContext'
import { useContext, useState } from 'react'

const AdminPostButton = ({ _id, ptitle }) => {
    const { adminPutPost,setShowToast } = useContext(PostContext)
    const approvePost = async postId => {
        const {message,success} = await adminPutPost("approve", postId)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
    }
    const rejectPost = async postId => {
        const {message,success} = await adminPutPost("reject", postId)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
    }

    return (
        <>
            <Button className='post-button' onClick={() => {
                const confirmBox = window.confirm(
                    "Xác nhận duyệt bài viết '" + ptitle + "' ?"
                )
                if (confirmBox === true) {
                    { approvePost(_id) }
                }
            }}>
                Duyệt
            </Button>
            {/* Message box */}
            <Button className='post-button' onClick={() => {
                const confirmBox = window.confirm(
                    "Xác nhận từ chối duyệt bài viết '" + ptitle + "' ?"
                )
                if (confirmBox === true) {
                    { rejectPost(_id) }
                }
            }}>
                Từ chối
            </Button>
        </>
    )
}

export default AdminPostButton