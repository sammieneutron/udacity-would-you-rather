import React, { Component } from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'

import Navigation from '../components/Navigation';
import LeaderBoard from '../pages/LeaderBoard'
import Home from '../pages/Home'
import NewQuestion from '../pages/NewQuestion'
import NotFound from '../pages/NotFound'
import Result from '../pages/Result'

class PrivateRoutes extends Component {
    
    render() { 
        return ( 
            <Router>
                <div className='container'>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/add" element={<NewQuestion/>} />
                        <Route path="/leaderboard" element={<LeaderBoard/>} />
                        <Route path="/questions/:id" element={<Result/>} />
                        <Route path="/404page" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}
 
export default PrivateRoutes;