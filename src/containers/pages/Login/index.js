import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/button';
import { loginUserAPI } from '../../../config/redux/action';


const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginApi: (data) => dispatch(loginUserAPI(data))
})

class Login extends Component {
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

    handleLoginSubmit = async () => {
        const {email, password} = this.state;
        const {history} = this.props;
        const res = await this.props.loginApi({email, password}).catch(err => err);
        if(res){
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: ''
            })
            history.push('/')
        }else{
            console.log('login failed')
        }
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input placeholder="Email" id="email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input placeholder="Password" id="password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                </div>
                {/* <button>Dashboard</button> */}
            </div>
        )
    }
}

export default connect(reduxState, reduxDispatch)(Login) ;