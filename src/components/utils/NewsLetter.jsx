import React, { useRef } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addUserToMailList } from '../../stores/utils/thunk';
import { showToast } from './toast';
import { clearNewsLetter } from '../../stores/reducers/users';

const NewsLetter = () => {
    const textField = useRef();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValue = textField.current.value;
        dispatch(addUserToMailList({email:inputValue}))
        .unwrap()
        .then((response) => {
            console.log(response);
            if (response.newsLetter === 'added') {
            showToast('SUCCESS', 'Email added successfully to news list');
            }
            if (response.newsLetter === 'failed') {
            showToast('ERROR', 'Something went wrong!!!');
            }
            // textField.current.value = '';
            // dispatch(clearNewsLetter());
        })
    }
  return (
    <div
    className='newsletter_container' >
    <h1>Join Our NewsLetters</h1>
    <div className="form">
        <Form className='mt-4' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control 
                type='text'
                placeholder='Enter your email'
                ref={textField}
                name='email'
                />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-1'>Add me to the mail list</Button>
        </Form>
    </div>

    </div>
  )
}

export default NewsLetter