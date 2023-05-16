import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { WithQuestionnaireContext } from './contexts/questionnaire.context';
import { Constants } from './libs/constants';
import { FallbackScreen } from './screens/fallback.screen';
import { HomeScreen } from './screens/home.screen';
import { QuestionnaireScreen } from './screens/questionnaire.screen';
import { ScoreboardScreen } from './screens/scoreboard.screen';

const { home, questionnaire, scoreboard } = Constants.routes;

const router = createBrowserRouter([
    {
        path: home.link,
        element: <HomeScreen/>
    },
    {
        path: questionnaire.link,
        element: <QuestionnaireScreen/>
    },
    {
        path: scoreboard.link,
        element: <ScoreboardScreen/>
    },
]);

function App() {
    return <React.Suspense fallback={<FallbackScreen/>}>
        <WithQuestionnaireContext>
            <RouterProvider router={router}/>
        </WithQuestionnaireContext>
    </React.Suspense>;
}

export default App;
