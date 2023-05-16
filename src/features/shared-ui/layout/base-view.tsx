export type Children = JSX.Element | JSX.Element[] | null;

export const BaseView = ({ children, className }: { children: Children; className?: string; }) => {
    return <div className={`base-layout box-shadow display-flex flex-column ${className || ''}`}>
        {children}
    </div>;
};
