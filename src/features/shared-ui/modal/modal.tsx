import * as React from 'react';
import { Close } from '../icons/icons';
import { Portal } from '../portal';
import './modal.scss';

interface SizeProps {
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

interface ModalProps {
    content: JSX.Element | null;
    trigger?: JSX.Element;
    className?: string;
    contentClasses?: string;
    headerClasses?: string;
    size: SizeProps; // use grid and up to 100
    header?: JSX.Element | string;
    show?: boolean;
    overlayClick?: (show: boolean) => void;
    level?: number;
    portal?: string;
    zIndex?: string;
    wrapperClass?: string;
}

export class Modal extends React.Component<ModalProps, any> {
    public state = {
        show: false,
        screenSize: window.innerWidth,
    };

    public componentDidMount() {
        window.addEventListener('resize', (size) => this.checkSize(size));
        if (!this.props.trigger) {
            this.setState({ show: this.props.show });
        }
    }

    public componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.show !== this.props.show) {
            if (!this.props.show) {
                this.setState({ show: false });
            }
        }
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', (size) => this.checkSize(size));
    }

    public checkSize({ target: { innerWidth } }: any) {
        this.setState({ screenSize: innerWidth });
    }

    public getSize(sizes: SizeProps) {
        const size = this.getSizeByScreen(sizes);
        const width = `${size}vw`;
        const left = `${Math.round((100 - size) / 2)}vw`;

        return { width, left };
    }

    public getSizeByScreen({ sm, md, lg }: SizeProps): number {
        if (this.state.screenSize < 700) {
            return sm;
        }
        if (this.state.screenSize < 1000) {
            return md;
        }

        return lg;
    }

    public handleClick(event: any, val: boolean) {
        event?.preventDefault();
        event?.stopPropagation();

        if (!this.props.trigger) {
            this.props.overlayClick && this.props.overlayClick(val);
        } else {
            this.setState({ show: val });
        }
    }

    public renderOverlay() {
        const { show } = this.state;

        return <div
            className={`overlay overlay--${show ? 'show' : 'hide'} ${this.props.zIndex}`}
            onClick={(e) => this.handleClick(e, false)}
        />;
    }

    public getStackingOrder(level: number) {
        switch (level) {
            case 1:
                return 'z-200';
            case 2:
                return 'z-150';
            case 3:
                return 'z-110';
            default:
                return 'z-300';
        }
    }

    public renderModal() {
        const { className, content, size, contentClasses, headerClasses, header, level } = this.props;
        const { width, left } = this.getSize(size);
        const { show } = this.state;
        return <div
            className={`modal modal--${show ? 'show' : 'hide'} ${this.getStackingOrder(level || 0)} ${className}`}
            style={{ width, left }}
        >
            <div className={headerClasses}>
                <Close onClick={() => this.setState({ show: false })} className={'position-absolute float-right hover-opacity'} width={27}/>

                {header && header}
            </div>
            <div className={`${contentClasses} px-20 pt-20 pb-5`}>
                {show && content}
            </div>
        </div>;
    }

    public render() {
        return <div className={this.props.wrapperClass}>
            <div className={'h-100'} onClick={(e: any) => this.handleClick(e, true)}>
                {!!this.props.trigger && this.props.trigger}
            </div>
            <Portal elementId={this.props.portal || 'modals'}>
                <div>
                    {this.renderOverlay()}
                    {this.renderModal()}
                </div>
            </Portal>
        </div>;
    }
}
