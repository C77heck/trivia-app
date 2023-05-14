import { NavLink } from 'react-router-dom';
import { Constants } from '../libs/constants';
import { BaseView } from './libs/base-view';
import { ScreenProps, ScreenRoute } from './libs/screen.route';

export const HomeScreen = ({ route }: ScreenProps) => {
    const { questionnaire } = Constants.routes;

    return <ScreenRoute route={route}>
        <BaseView>
            <div className={'col-4 display-flex justify-content-center align-items-start'}>
                <h2 className={'fs-24 text-align-center fw--600 max-width-14'}>Welcome to the Trivia Challenge!</h2>
            </div>
            <div className={'col-9 center'}>
                <h3 className={'fs-24 text-align-center fw--400 max-width-16'}>You will be presented with 10 True or False questions.</h3>
            </div>
            <div className={'col-8 center'}>
                <h4 className={'fs-24 text-align-center fw--400'}>Can you score 100%</h4>
            </div>
            <div className={'col-3 center'}>
                <NavLink className={'text-decoration-none hover-opacity'} to={questionnaire.link}>
                    <span className={'fs-24 text-align-center uppercase'}>Begin</span>
                </NavLink>
            </div>
        </BaseView>
    </ScreenRoute>;
};
