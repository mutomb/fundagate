import React, {FC, useState} from 'react'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import auth from '../auth/auth-helper'
import {remove} from './api-course'

interface DeleteCourseProps{
  course:any,
  onRemove:Function
}

const DeleteCourse: FC<DeleteCourseProps> = ({course, onRemove}) => {
  const [open, setOpen] = useState<boolean>(false)
  
  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteCourse = () => {
    remove({
      courseId: course._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        onRemove(course)
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }
    return (<span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} TransitionProps={{onExit:handleRequestClose}}>
        <DialogTitle>{"Delete "+course.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your course {course.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCourse} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
}
export default DeleteCourse;
/*DeleteCourse.propTypes = {
  course: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}*/