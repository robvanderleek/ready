import React, {useContext, useEffect, useState} from "react";

const DeviceContext = React.createContext({});

export function DeviceProvider(props) {
    const [initializing, setInitializing] = useState(true);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [forceNonTouchDevice, setForceNonTouchDevice] = useState(false);
    const [orientation, setOrientation] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.screen.width);

    const addOrientationChangeListener = () => {
        const supportsOrientationChange = "onorientationchange" in window;
        const orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        window.addEventListener(orientationEvent, () => this.checkOrientation(), false);
    }

    const checkDevice = () => {
        const touchDeviceCheckResult = ('ontouchstart' in document.documentElement);
        setIsTouchDevice(touchDeviceCheckResult);
    }

    const checkOrientation = () => {
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
        setOrientation(orientation);
        setScreenWidth(newScreenWidth);
    }

    useEffect(() => {
        addOrientationChangeListener();
        setInterval(checkOrientation, 2000);
        checkDevice();
        checkOrientation();
        setInitializing(false);
    }, []);

    return (
        <DeviceContext.Provider value={{
            initializing, isTouchDevice, forceNonTouchDevice, setForceNonTouchDevice, orientation
        }}>
            {props.children}
        </DeviceContext.Provider>
    );

}

export const useDevice = () => useContext(DeviceContext);