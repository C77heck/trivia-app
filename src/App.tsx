import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { Spinner } from './features/shared-ui/spinner/spinner';
import { Constants } from './libs/constants';
import { HomeScreen } from './screens/home.screen';
import { QuestionnaireScreen } from './screens/questionnaire.screen';
import { ScoreboardScreen } from './screens/scoreboard.screen';

function App() {
    const { home, questionnaire, scoreboard } = Constants.routes;

    return <React.Suspense fallback={<div><Spinner/></div>}>
        <Router>
            <HomeScreen route={home.link}/>
            <QuestionnaireScreen route={questionnaire.link}/>
            <ScoreboardScreen route={scoreboard.link}/>
        </Router>
    </React.Suspense>;
}

export default App;
