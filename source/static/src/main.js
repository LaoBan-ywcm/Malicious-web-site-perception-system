import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import {render} from 'react-dom';


import Entrance from './entrance';

render(
    <div>
        <BrowserRouter>
            <Entrance/>
        </BrowserRouter>
    </div>
    ,
 document.getElementById('root'));

