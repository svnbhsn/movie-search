import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Movies from './components/Movies'
import MoviesDetails from './components/MoviesDetails'
import Series from './components/Series'
import SeriesDetails from './components/SeriesDetails'
import Actors from './components/Actors'
import ActorsDetails from './components/ActorsDetails'
import OutNow from './components/OutNow'
import Upcoming from './components/Upcoming'


export default function RouterOutlet() {
    return (
        <Switch>

            <Route path='/movies/:id'>
                <MoviesDetails />
            </Route>

            <Route path='/movies'>
                <Movies />
            </Route>

            <Route path='/series/:id'>
                <SeriesDetails />
            </Route>

            <Route path='/series'>
                <Series />
            </Route>

            <Route path='/actors/:id'>
                <ActorsDetails />
            </Route>

            <Route path='/actors'>
                <Actors />
            </Route>

            <Route path='/outnow'>
                <OutNow />
            </Route>

            <Route path='/upcoming'>
                <Upcoming />
            </Route>

            <Route path='/'>
                <Movies />
            </Route>
        </Switch >
    )
}