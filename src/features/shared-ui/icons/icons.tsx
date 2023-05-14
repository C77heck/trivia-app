export interface IconProps {
    className?: string;
    onClick?: () => void;
    width: number;
}

import '../../../styles/animations.scss';

export const Close = (props: IconProps) => {
    return <div
        className={props.className}
        onClick={props.onClick}
    >
        <svg
            className={`w-px-${props.width}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <g data-name="Layer 2">
                <g data-name="close">
                    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                    <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                </g>
            </g>
        </svg>
    </div>;
};

export const SpinnerIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
    >
        <svg fill="currentColor" className={`w-px-${props.width} spin`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/>
        </svg>
    </div>;
};

export const BarsIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 150 150">
            <path id="XMLID_241_" d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"/>
            <path id="XMLID_242_" d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"/>
            <path id="XMLID_243_" d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"/>
        </svg>
    </div>;
};

export const Eyeicon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 488.85 488.85">
            <path
                d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2   s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025   c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3   C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7   c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"
            />
        </svg>
    </div>;
};

export const LoginIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} x="0px" y="0px" viewBox="0 0 459 459">
            <path d="M229.5,0C102.53,0,0,102.845,0,229.5C0,356.301,102.719,459,229.5,459C356.851,459,459,355.815,459,229.5
			C459,102.547,356.079,0,229.5,0z M347.601,364.67C314.887,393.338,273.4,409,229.5,409c-43.892,0-85.372-15.657-118.083-44.314
			c-4.425-3.876-6.425-9.834-5.245-15.597c11.3-55.195,46.457-98.725,91.209-113.047C174.028,222.218,158,193.817,158,161
			c0-46.392,32.012-84,71.5-84c39.488,0,71.5,37.608,71.5,84c0,32.812-16.023,61.209-39.369,75.035
			c44.751,14.319,79.909,57.848,91.213,113.038C354.023,354.828,352.019,360.798,347.601,364.67z"/>
        </svg>
    </div>;
};

export const ViewDetailsIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 16 16">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M0 4.59613V4.60917V5.03217V6.0239C0 6.39632 0.392549 6.63803 0.725094 6.47037L1.61065 6.0239L1.98836 5.83347L2 5.82761L3.4037 5.11991L3.47443 5.08425L4.13583 4.75079L4.73945 4.44647C5.10599 4.26167 5.10599 3.73833 4.73945 3.55353L4.13583 3.24921L3.47443 2.91576L3.4037 2.8801L2 2.1724L1.98836 2.16653L1.61065 1.9761L0.725095 1.52963C0.392549 1.36197 0 1.60368 0 1.9761V2.96784V2.96784V3.39084V3.40387V4.59613ZM9 3C8.44772 3 8 3.44772 8 4C8 4.55229 8.44772 5 9 5H14V12H4V9C4 8.44772 3.55228 8 3 8C2.44772 8 2 8.44772 2 9V12C2 13.1046 2.89543 14 4 14H14C15.1046 14 16 13.1046 16 12V5C16 3.89543 15.1046 3 14 3H9ZM5 7C5 6.44772 5.44772 6 6 6H12C12.5523 6 13 6.44772 13 7C13 7.55229 12.5523 8 12 8H6C5.44772 8 5 7.55229 5 7ZM6 9C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9H6Z"
                  fill="#fffff"/>
        </svg>
    </div>;
};

export const AddIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Layer_1" viewBox="0 0 512 512">
            <g>
                <g>
                    <g>
                        <path
                            d="M438.251,0H320H192H73.749C33.088,0,0,33.088,0,73.749v364.501C0,478.912,33.088,512,73.749,512H192     c11.776,0,21.333-9.557,21.333-21.333s-9.557-21.333-21.333-21.333H73.749c-17.131,0-31.083-13.952-31.083-31.083V73.749     c0-17.131,13.952-31.083,31.083-31.083h96.917v106.667c0,7.872,4.331,15.104,11.264,18.816     c6.912,3.691,15.339,3.285,21.909-1.067L256,132.309l52.16,34.773c3.584,2.389,7.701,3.584,11.84,3.584     c3.456,0,6.912-0.832,10.069-2.517c6.933-3.712,11.264-10.944,11.264-18.816V42.667h96.917c17.131,0,31.083,13.952,31.083,31.083     v75.584c0,11.776,9.557,21.333,21.333,21.333c11.797,0,21.333-9.557,21.333-21.333V73.749C512,33.088,478.912,0,438.251,0z"/>
                        <path
                            d="M362.667,213.333c-82.347,0-149.333,66.987-149.333,149.333S280.32,512,362.667,512S512,445.013,512,362.667     S445.013,213.333,362.667,213.333z M426.667,384H384v42.667c0,11.776-9.557,21.333-21.333,21.333s-21.333-9.557-21.333-21.333     V384h-42.667c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333h42.667v-42.667     c0-11.776,9.557-21.333,21.333-21.333S384,286.891,384,298.667v42.667h42.667c11.776,0,21.333,9.557,21.333,21.333     S438.443,384,426.667,384z"/>
                    </g>
                </g>
            </g>
        </svg>
    </div>;
};

export const HomeIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg className={`w-px-${props.width}`} viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"/>
        </svg>
    </div>;

};

export const LogoutIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg className={`w-px-${props.width}`} viewBox="0 0 24 24" fill="transparent">
            <path d="M17.4399 14.62L19.9999 12.06L17.4399 9.5" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.76001 12.0601H19.93" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>;
};

export const PlusIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg className={`w-px-${props.width}`} viewBox="0 -0.5 21 21" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -520.000000)" fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path
                            d="M374.55,369 L377.7,369 L377.7,371 L374.55,371 L374.55,374 L372.45,374 L372.45,371 L369.3,371 L369.3,369 L372.45,369 L372.45,366 L374.55,366 L374.55,369 Z M373.5,378 C368.86845,378 365.1,374.411 365.1,370 C365.1,365.589 368.86845,362 373.5,362 C378.13155,362 381.9,365.589 381.9,370 C381.9,374.411 378.13155,378 373.5,378 L373.5,378 Z M373.5,360 C367.70085,360 363,364.477 363,370 C363,375.523 367.70085,380 373.5,380 C379.29915,380 384,375.523 384,370 C384,364.477 379.29915,360 373.5,360 L373.5,360 Z"
                            id="plus_circle-[#1441]">
                        </path>
                    </g>
                </g>
            </g>
        </svg>
    </div>;
};

export const MinusIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg className={`w-px-${props.width}`} viewBox="0 -0.5 21 21" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -600.000000)" fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path
                            d="M49.3,451 L57.7,451 L57.7,449 L49.3,449 L49.3,451 Z M53.5,458 C48.8674,458 45.1,454.411 45.1,450 C45.1,445.588 48.8674,442 53.5,442 C58.13155,442 61.9,445.588 61.9,450 C61.9,454.411 58.13155,458 53.5,458 L53.5,458 Z M53.5,440 C47.70085,440 43,444.477 43,450 C43,455.523 47.70085,460 53.5,460 C59.2981,460 64,455.523 64,450 C64,444.477 59.2981,440 53.5,440 L53.5,440 Z"
                            id="minus_circle-[#1429]">

                        </path>
                    </g>
                </g>
            </g>
        </svg>
    </div>;
};

export const RightArrow = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg className={`w-px-${props.width}`} viewBox="0 -6.5 38 38" version="1.1">
            <g id="icons" stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
                <g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-1511.000000, -158.000000)" fill="currentColor" fillRule="nonzero">
                    <g id="1" transform="translate(1350.000000, 120.000000)">
                        <path
                            d="M187.812138,38.5802109 L198.325224,49.0042713 L198.41312,49.0858421 C198.764883,49.4346574 198.96954,49.8946897 199,50.4382227 L198.998248,50.6209428 C198.97273,51.0514917 198.80819,51.4628128 198.48394,51.8313977 L198.36126,51.9580208 L187.812138,62.4197891 C187.031988,63.1934036 185.770571,63.1934036 184.990421,62.4197891 C184.205605,61.6415481 184.205605,60.3762573 184.990358,59.5980789 L192.274264,52.3739093 L162.99947,52.3746291 C161.897068,52.3746291 161,51.4850764 161,50.3835318 C161,49.2819872 161.897068,48.3924345 162.999445,48.3924345 L192.039203,48.3917152 L184.990421,41.4019837 C184.205605,40.6237427 184.205605,39.3584519 184.990421,38.5802109 C185.770571,37.8065964 187.031988,37.8065964 187.812138,38.5802109 Z"
                            id="right-arrow">
                        </path>
                    </g>
                </g>
            </g>
        </svg>
    </div>;
};
