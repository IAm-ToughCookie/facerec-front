import React from 'react';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signUpName: '',
            signUpEmail: '',
            signUpPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ signUpName: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ signUpEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signUpPassword: event.target.value })
    }

    onSubmitSignUp = (/*password, password_confirm*/) => {
        // FOR PW CONFIRM:
        // if (password === password_confirm)
        fetch('http://localhost:3000/signup', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.signUpName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input 
                                    onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text" name="name"  id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email" name="email-address"  id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password" name="password"  id="password" />
                                </div>
                                {/* FOR PW CONFIRM:
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password_confirm"  id="password_confirm" />
                                </div> */}
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignUp}
                                // FOR PW CONFIRM:
                                // onClick={this.onSubmitSignUp(this.password, this.password_confirm)}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Finish" />
                        </div>
                        <div className="lh-copy mt3">
                            <p 
                                onClick={() => onRouteChange('signin')}
                                className="f6 link dim black db pointer">already signed up?</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default Signup;