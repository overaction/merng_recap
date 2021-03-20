import { gql, useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Form, Label } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const Login = () => {

    const context = useContext(AuthContext);

    const history = useHistory();

    const [errors, setErrors] = useState({});

    const [nowError, setNowError] = useState('');

    const {onChange,onSubmit,values} = useForm(loginUserHoist,{
        email:'',
        password:'',
    })

    useEffect(() => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(values.email))
            setNowError('형식이 올바르지 않습니다')
        else setNowError('');
        console.log(nowError)
    },[values.email])

    const [loginUser,{loading,error,data}] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            context.login(result.data.login)
            history.push({
                pathname: "/"
            });
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    })

    // hoisting을 위해 따로 선언
    function loginUserHoist() {
        loginUser();
    }

    return (
        <div className="registerContainer">
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
            >
                <h1>로그인</h1>
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                    error={errors.email || nowError ? true : false}
                    onChange={onChange}
                />
                {nowError && (
                    <Label pointing color="orange" style={{ margin: "0" }}>
                        {nowError}
                    </Label>
                )}
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button primary>확인</Button>
            </Form>
            {errors.hasOwnProperty("general") ? (
                <div className="ui error message">
                    <ul className="list">
                        <li key={errors.general}>{errors.general}</li>
                    </ul>
                </div>
            ) : (
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ){
            id email token username createdAt
        }
    }
`

export default Login
