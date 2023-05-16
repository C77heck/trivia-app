import { NavLink } from 'react-router-dom';
import { BaseLayout } from '../features/shared-ui/layout/base-layout';
import { BaseView } from '../features/shared-ui/layout/base-view';
import { Constants } from '../libs/constants';

export const HomeScreen = () => {
    const { questionnaire } = Constants.routes;

    return <BaseLayout>
        <BaseView>
            <div className={'col-4 display-flex justify-content-center align-items-start'}>
                <h2 className={'appear-smoothly fs-24 text-align-center fw--600 max-width-14'}>Welcome to the Trivia Challenge!</h2>
            </div>
            <div className={'col-9 center'}>
                <h3 className={'appear-smoothly fs-24 text-align-center fw--400 max-width-16'}>You will be presented with 10 True or False questions.</h3>
            </div>
            <div className={'col-8 center'}>
                <h4 className={'appear-smoothly fs-24 text-align-center fw--400'}>Can you score 100%</h4>
            </div>
            <div className={'col-3 center'}>
                <NavLink className={'appear-smoothly text-decoration-none hover-opacity'} to={questionnaire.link}>
                    <span className={'fs-24 text-align-center uppercase'}>Begin</span>
                </NavLink>
            </div>
        </BaseView>
    </BaseLayout>;
};
