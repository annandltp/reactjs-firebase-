import React, {Component} from 'react';
import './Register.scss';
import firebase from '../../../config/firebase';
import Button from '../../../components/atoms/button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerApi: (data) => dispatch(registerUserAPI(data))
})

class Register extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleRegisterSubmit = async () => {
        const {email, password} = this.state;
        const res = await this.props.registerApi({email, password}).catch(err => err);
        if(res) {
            console.log('data before send: ', email, password)
            this.setState({
                email: '',
                password: ''
            })
        }
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input placeholder="Email" id="email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input placeholder="Password" id="password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
                </div>
                {/* <button>Dashboard</button> */}
            </div>
        )
    }
}



export default connect(reduxState, reduxDispatch) (Register);