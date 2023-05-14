import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

export interface ScreenProps {
    route: string;
}

export interface ScreenRouteProps extends ScreenProps {
    children: JSX.Element | JSX.Element[] | null;
}

export const ScreenRoute = (props: ScreenRouteProps) => {
    return <Routes>
        <Route
            path={props.route}
            element={<div className={'screen-view p-5 display-flex justify-content-center'}>
                {props.children}
            </div>}
        />
    </Routes>;
};
