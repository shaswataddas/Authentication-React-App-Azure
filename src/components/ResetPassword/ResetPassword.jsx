import React,{useState} from 'react'
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleContinue = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Constructing the request body
        const requestBody = {
            email,
            password
        };
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
        console.log(token);

    try {
        // Making the REST call
        let forgotPasswordUrl = 'http://localhost:8080/api/user/secure/resetPassword/';
        let result = forgotPasswordUrl.concat(token);
        console.log(result);
        const response = await fetch(result, {
                method: 'PUT', // Change the method according to your API
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Handling the response
            console.log(response.status);
            if (response.ok) {
            // Handle success scenario
                var container = document.querySelector(".incorrect-mail");
                container.style.display = "block"; 
                container.textContent = "Your Password is Updated. Please try to Login Now";

                const message = await response.text();
                console.log(message);
            } else if (response.status === 404) {
            // Handle error scenario
                var incorrectBlock = document.querySelector(".incorrect-mail");
                incorrectBlock.style.display = "block"; 
                incorrectBlock.textContent = "This Email is not present in the system";
                var inputElements = document.querySelectorAll("input");
                inputElements.forEach(function(inputElement) {
                    inputElement.style.border = "2px solid rgba(255, 0, 0, .9)"; // Update border property for each input
                });
            } else{
                var expiryTokenBlock = document.querySelector(".incorrect-mail");
                expiryTokenBlock.style.display = "block"; 
                expiryTokenBlock.textContent = "Invalid or Expired Link";
                var inputTagElements = document.querySelectorAll("input");
                inputTagElements.forEach(function(inputElement) {
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
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='Useremail' 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaLock className='icon'/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='New Password' 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className='icon'/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='Confirm Password' 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FaUnlock className='icon'/>
                    </div>
                    <div className="register-link">
                        <p>Enter the email address associated with the Account and we will send you a link to reset your password</p>
                    </div>
                    <p className="incorrect-mail">Password Updated. Please try to Login now</p>
                    <button type="submit">Submit</button>
                    <a className='back-login' href='http://localhost:3000/login'>Back to login Page</a>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
