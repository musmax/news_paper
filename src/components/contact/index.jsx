import React from 'react'
import * as Yup from 'yup';
import {useFormik} from 'formik'
import {Alert} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { sendUserMessage } from '../../stores/utils/thunk';
import { showToast } from '../utils/toast';


const Contact = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstname: '',
            email: '',
            message: '',
            lastname: '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('This field is required'),
            email: Yup.string().email('Invalid email').required('This field is required'),
            message: Yup.string().required('This field is required').max(500, 'This messsage is too long'),
            lastname: Yup.string().required('This field is required'),
        }),
        onSubmit: (values, {
            resetForm,
        }) => {
            dispatch(sendUserMessage(values))
            .unwrap()
            .then((response) => {
                resetForm()
                showToast('SUCCESS', 'Thank you for contacting us. We will get back to you soon.')
                console.log(response)
            })
            .catch((error) => {
                showToast('SUCCESS', 'Something went wrong!!!')
                console.log(error)
            })
        },
    })

  return (
    <>
    <h1>Contact us</h1>
    <form className="mt-3" 
    onSubmit={formik.handleSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
                type='email'
                className="form-control"
                name="email"
                placeholder="email@example.com"
                {...formik.getFieldProps('email')}
            />
        </div>
        {
            formik.errors.email && <Alert variant="danger">{formik.errors.email}</Alert>
        }
        <div className="form-group mt-2">
            <label htmlFor="firstname">First name</label>
            <input
                type='text'
                className="form-control"
                name="firstname"
                placeholder="Enter your name"
                {...formik.getFieldProps('firstname')}
            />
        </div>
        {
            formik.errors.firstname && <Alert variant="danger">{formik.errors.firstname}</Alert>
        }
        <div className="form-group mt-2">
            <label htmlFor="lastname">Last name</label>
            <input
                type='text'
                className="form-control"
                name="lastname"
                placeholder="Enter your last name"
                {...formik.getFieldProps('lastname')}
            />
        </div>
        {
            formik.errors.lastname && <Alert variant="danger">{formik.errors.lastname}</Alert>
        }
        <div className="form-group mt-2">
            <label htmlFor="message">Message</label>
            <textarea
                className="form-control"
                name="message"
                rows={3}
                {...formik.getFieldProps('message')}
            />
        </div>
        {
            formik.errors.message && <Alert variant="danger">{formik.errors.message}</Alert>
        }
        <button type="submit" className="btn btn-primary mt-2">
            Send message
        </button>
    </form>
</>
  )

}

export default Contact