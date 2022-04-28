import React, {useState} from 'react'
import emailjs from '@emailjs/browser';
import { useRef } from 'react'
import OutLineButton from '../button/Button'

import './support.scss'

const Support = () => {
    const form = useRef();
    const successRef = useRef()
    const [sent, setSent] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_q3yr8kk', 'template_tmabr7f', e.target, 'VjhC94ZUYxGcetVhW')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            form.current.reset()

        setSent(true)
    };
    const handleChangeSent = () => {
        if(sent) {
            setSent(false)
        }
    }
    return (
        <div className=" form-set-send">
            <div className="header--form-contact">
                <h2>Do you have any question for us ?</h2>
            </div>
            <div className="form-group-send" >
                <form ref={form} onSubmit={sendEmail}>
                    <div className="form-one">
                        <div>
                            <label>Name</label>
                        </div>
                        <input onClick={handleChangeSent} type="text" name="name" required />

                        <div>
                            <label>Email</label>
                        </div>
                        <input type="email" name="email" required />

                        <div>
                            <label>Phone</label>
                        </div>
                        <input type="text" name="phone" required />

                    </div>
                    <div className="form-two">
                        <div>
                            <label>Message</label>
                        </div>
                        <textarea name="message" required />
                        <OutLineButton className='small'>Submit</OutLineButton>
                        <div ref={successRef} style={{display: sent ? 'block' : 'none'}} className="message-success">
                            <h4>Your comment has been forwarded to us!</h4>
                        </div>
                    </div>
                </form>
                <div className="form-group-support" style={{backgroundImage: "url(https://www.counterpath.com/wp-content/uploads/2019/11/11-Call-Center.jpg)"}}>
 
                </div>
            </div>
        </div>
    )
}

export default Support