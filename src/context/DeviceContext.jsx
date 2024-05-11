import React, {Component, useContext} from "react";

const DeviceContext = React.createContext({});

export class DeviceProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initializing: true,
            isTouchDevice: false,
            forceNonTouchDevice: false,
            orientation: null,
            screenWidth: window.screen.width
        }
    }

    componentDidMount() {
        this.addOrientationChangeListener();
        setInterval(this.checkOrientation, 2000);
        this.checkDevice();
        this.checkOrientation();
        this.setState({initializing: false});
    }

    addOrientationChangeListener = () => {
        const supportsOrientationChange = "onorientationchange" in window;
        const orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        window.addEventListener(orientationEvent, () => this.checkOrientation(), false);
    }

    checkDevice = () => {
        const touchDeviceCheckResult = ('ontouchstart' in document.documentElement);
        this.setState({isTouchDevice: touchDeviceCheckResult});
    }

    checkOrientation = () => {
        const {screenWidth} = this.state;
        const newScreenWidth = window.screen.width;
        const newScreenHeight = window.screen.height;
        let orientation;
        const screenOrientation = window.screen.orientation;
        if (screenOrientation) {
            orientation = screenOrientation.angle === 0 ? 'portrait' : 'landscape';
        } else if (screenWidth !== newScreenWidth) {
            orientation = newScreenWidth < newScreenHeight ? 'portrait' : 'landscape';
        } else {
            const mql = window.matchMedia("(orientation: portrait)");
            orientation = mql.matches ? 'portrait' : 'landscape';
        }
        this.setState({orientation: orientation, screenWidth: newScreenWidth});
    }

    render() {
        const {children} = this.props;
        return (
            <DeviceContext.Provider value={{
                ...this.state
            }}>
                {children}
            </DeviceContext.Provider>
        );
    }

}

export const useDevice = () => useContext(DeviceContext);