import { gql, useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Form, Label } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const Register = () => {

    const context = useContext(AuthContext);

    const history = useHistory();

    const [errors, setErrors] = useState({});

    const [nowError, setNowError] = useState("");

    const { onChange, onSubmit, values } = useForm(registerUser, {
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
    });

    useEffect(() => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(values.email)) setNowError("형식이 올바르지 않습니다");
        else setNowError("");
        console.log(nowError);
    }, [values.email]);

    const [addUser, { loading, error, data }] = useMutation(REGISTER_USER, {
        update(proxy, {data : {register: userData}}) {
            context.login(userData);
            history.push({
                pathname: "/",
            });
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    // hoisting을 위해 따로 선언
    function registerUser() {
        addUser();
    }

    return (
        <div className="registerContainer">
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
            >
                <h1>회원가입</h1>
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
                <Form.Input
                    label="confirmPassword"
                    placeholder="confirmPassword..."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Button primary>확인</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $email: String!
        $password: String!
        $confirmPassword: String!
        $username: String!
    ) {
        register(
            registerInput: {
            email: $email
            password: $password
            confirmPassword: $confirmPassword
            username: $username
        }
        ){
            id email token username createdAt
        }
    }
`

export default Register
