import ReactDOM from 'react-dom';

export function Portal(props: any) {
    return ReactDOM.createPortal(props.children, document.getElementById(props.elementId) as any);
}
