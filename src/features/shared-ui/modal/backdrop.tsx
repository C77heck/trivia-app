import './backdrop.scss';

export const Backdrop = (props: any) => {
    return <div className={`${props.className} backdrop`}>{props.children && props.children}</div>;
};
