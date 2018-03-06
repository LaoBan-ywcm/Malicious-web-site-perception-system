import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import {render} from 'react-dom';


import Entrance from './entrance';
import InputSearch from './search'
import Report from './report'

render(
    <div>
        <BrowserRouter>
            <Entrance/>
        </BrowserRouter>
    </div>
    ,
 document.getElementById('root'));

