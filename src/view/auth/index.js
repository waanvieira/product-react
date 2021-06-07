import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router'
import { Typography, TextField, Button } from '@material-ui/core';
import { changeAction, login } from '../../store/ducks/auth';
import { Link } from 'react-router-dom';

export default function Auth() { 
    const dispatch = useDispatch()
    const { credentials, success } = useSelector(state => state.authDuck)
       
    return (
        <div className="d-flex bg-white min-vh-100">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="form-group text-center">
                            {/* <img src="/img/icon-master.svg" alt="CRM" height="50px" /> */}
                            <Typography className="mt-3" variant="h6" component="h1">Plataforma de produtos</Typography>
                        </div>

                        <TextField
                            label="email"
                            type="email"
                            margin="normal"
                            autoComplete="email"
                            value={credentials.email}                            
                            onChange={text => dispatch(changeAction({ email: text.target.value }))}                            
                        />

                        <TextField
                            label="password"
                            type="password"
                            margin="normal"
                            value={credentials.password}
                            onChange={text => dispatch(changeAction({ password: text.target.value }))}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            className="my-4"
                            className="my-4"
                            onClick={() => dispatch(login(credentials))}
                        >
                            Entrar
                        </Button>

                        <div className="text-center">
                            <Link to="/register" className="mt-4 text-danger">
                                Cadastrar
                            </Link>
                        </div>
                        
                        {(success) &&
                            <Redirect to="/produtos"/>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

 
