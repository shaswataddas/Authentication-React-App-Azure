import React,{useState} from 'react'
import { FaUser } from "react-icons/fa";
import './ForgotPassword.css';

function ForgotPassword() {
    const [forgotEmail, setForgotEmail] = useState('');

    const handleContinue = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

    try {
        // Making the REST call
        let forgotPasswordUrl = 'http://localhost:8080/api/user/forgotPassword/';
        let result = forgotPasswordUrl.concat(forgotEmail);
        console.log(result);
        const response = await fetch(result, {
                method: 'GET', // Change the method according to your API
            });

            // Handling the response
            console.log(response.status);
            if (response.ok) {
            // Handle success scenario
                var container = document.querySelector(".incorrect-mail");
                container.style.display = "block"; 
                container.textContent = "Reset Password link is sent to your Email";

                const message = await response.text();
                console.log(message);
            } else {
            // Handle error scenario
                var incorrectBlock = document.querySelector(".incorrect-mail");
                incorrectBlock.style.display = "block"; 
                incorrectBlock.textContent = "This Email is not present in our system";
                var inputElements = document.querySelectorAll("input");
                inputElements.forEach(function(inputElement) {
                    inputElement.style.border = "2px solid rgba(255, 0, 0, .9)"; // Update border property for each input
                });
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    return (
        <div>
            <div className='wrapper-register'>
                <form onSubmit={handleContinue}>
                    <h1>Forgot Password</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='Useremail' 
                            required 
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                        />
                        <FaUser className='icon'/>
                    </div>
                    <div className="register-link">
                        <p>Enter the email address associated with the Account and we will send you a link to reset your password</p>
                    </div>
                    <p className="incorrect-mail">This Email is not present in our system</p>
                    <button type="submit">Continue</button>
                    <a className='back-login' href='http://localhost:3000/login'>Back to login Page</a>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
