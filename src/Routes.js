// Lazy serve para nð£o carregar todos os componentes de uma vez, sð³ o que a gente chamar
import React, {  lazy } from 'react';
import { Suspense } from 'react';
//Jogando o MenuItem para a variavel Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { CircularProgress } from '@material-ui/core'

const Auth = lazy(() => import('./view/auth'))
const Register = lazy(() => import('./view/register'))

const Routes = () => (
    <Router>        
         <Suspense 
         fallback={
            <div className="d-flex justify-content-center mt-5 pt-5">
                {/* <CircularProgress /> */}
            </div>
        }
        > 
            <Switch>
                <Route exact path="/" component={Auth} />
                <Route exact path="/login" component={Auth} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </Suspense>
    </Router>
)

export default Routes;