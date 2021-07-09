import React from 'react'
import { createUser } from 'sdk';
import classes from './style.module.scss'
const SignUp = () => {
    const [Step, setStep] = React.useState(localStorage.getItem("token") ? 2 : 0)
    const [UserInputs, setUserInputs] = React.useState({})
    const [Errors, setErrors] = React.useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Step === 0) {
            let verify = true;
            if (!UserInputs.name) {
                verify = false;
                setErrors(prev => {
                    return {
                        ...prev,
                        name: "Please enter your name"
                    }
                })
            }
            if (!UserInputs.age) {
                verify = false;
                setErrors(prev => {
                    return {
                        ...prev,
                        age: "Please enter your age"
                    }
                })
            }
            if (verify)
                setStep(1)
        } else if (Step === 1) {
            let verify = true;
            if (!UserInputs.email) {
                verify = false;
                setErrors(prev => {
                    return {
                        ...prev,
                        email: "Please enter your email"
                    }
                })
            }
            if (!UserInputs.newsletter) {
                verify = false;
                setErrors(prev => {
                    return {
                        ...prev,
                        newsletter: "Please select an option"
                    }
                })
            }
            if (verify) {
                createUser(UserInputs).then(payload => localStorage.setItem("token", payload.token))
                setStep(2)
            }
        } else {
            localStorage.removeItem("token")
            setUserInputs({})
            setErrors({})
            setStep(0)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        const acceptChange = () => {
            setUserInputs(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
            setErrors(prev => {
                return {
                    ...prev,
                    [name]: undefined
                }
            })
        }
        switch (name) {
            case 'age':
                if (/^\d{0,3}$/.test(value))
                    acceptChange()
                break;
            default:
                acceptChange()
        }
    }
    return (
        <form className={classes.signup} onSubmit={handleSubmit}>
            {Step === 0 &&
                <>
                    <h1>Sign up form</h1>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={UserInputs.name || ''} onChange={handleChange} />
                        <span className="error">{Errors.name}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="text" name="age" id="age" value={UserInputs.age || ''} onChange={handleChange} />
                        <span className="error">{Errors.age}</span>
                    </div>

                    <div className="form-actions">
                        <div>
                            <button className="btn btn-block" type="submit">Continue</button>
                        </div>
                    </div>
                </>
            }
            {Step === 1 &&
                <>
                    <h1>Sign up form</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" id="email" value={UserInputs.email} onChange={handleChange} />
                        <span className="error">{Errors.email}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">How often do you like to receive our newsletters?</label>
                        <select name="newsletter" id="newsletter" value={UserInputs.newsletter} onChange={handleChange}>
                            <option value="">- select -</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        <span className="error">{Errors.newsletter}</span>
                    </div>
                    <div className="form-actions">
                        <div>
                            <button className="btn btn-block" onClick={() => setStep(0)}>Back</button>
                        </div>
                        <div>
                            <button className="btn btn-block" type="submit">Submit</button>
                        </div>
                    </div>
                </>
            }
            {Step === 2 &&
                <>
                    <h1>User registered successfully</h1>
                    <span>Your token has been activated</span>

                    <div className="form-actions">
                        <div>
                            <button className="btn btn-block" type="submit">Reset</button>
                        </div>
                    </div>
                </>
            }
        </form>
    );
};

export default SignUp;