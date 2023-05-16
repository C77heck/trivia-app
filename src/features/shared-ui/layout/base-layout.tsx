import { Children } from './base-view';

export const BaseLayout = (props: { children: Children }) => {
    return <div className={'screen-view p-5 display-flex justify-content-center'}>
        {props.children}
    </div>;
};
