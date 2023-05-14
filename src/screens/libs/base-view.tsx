export type Children = JSX.Element | JSX.Element[] | null;

export const BaseView = ({ children }: { children: Children }) => {
    return <div className={'base-layout box-shadow display-flex flex-column'}>
        {children}
    </div>;
};
