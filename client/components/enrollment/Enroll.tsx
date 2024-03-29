import React, {FC, useState} from 'react'
import Button from '@mui/material/Button'
import {makeStyles} from '@mui/styles'
import {create} from './api-enrollment'
import auth from '../auth/auth-helper'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500
    }
}))

interface EnrollProps{
  courseId:String
}
interface ValuesState{
  redirect:Boolean,
  error:String,
  enrollmentId:String
}
const Enroll: FC<EnrollProps> = ({courseId}) =>{
  const classes = useStyles()
  const [values, setValues] = useState<ValuesState>({
    enrollmentId: '',
    error: '',
    redirect: false
  })
  const jwt = auth.isAuthenticated()
  const clickEnroll = () => {
    create({
      courseId: courseId
    }, {
      t: jwt.token
    }).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, enrollmentId: data._id, redirect: true})
      }
    })
  }

    if(values.redirect){
        return (<Redirect to={'/learn/'+values.enrollmentId}/>)
    }

  return (
      <Button variant="contained" color="secondary" onClick={clickEnroll}> Enroll </Button>
  )
}
export default Enroll;
/*Enroll.propTypes = {
  courseId: PropTypes.string.isRequired
}*/
