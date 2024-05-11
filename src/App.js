import {useContext} from "react";
import {LargeMessage, Main, Message} from "./Styles";
import LoadRom from "./views/LoadRom";
import {RomContext} from "./context/RomContext";
import Game from "./views/Game";
import {useDevice} from "./context/DeviceContext";

export default function App() {
    const romContext = useContext(RomContext);
    const {initializing, isTouchDevice, orientation} = useDevice();

    const renderNonTouchDevice = () => {
        return (
            <Main>
                <LargeMessage>Please view this on a mobile device</LargeMessage>
                <Message style={{color: 'grey'}}>(or click here to continue)</Message>
            </Main>
        );
    }

    const renderNoRomSelected = () => <Main><LargeMessage>Rotate to select a ROM to play</LargeMessage></Main>;

    if (initializing) {
        return null;
    } else if (isTouchDevice) {
        if (orientation === 'portrait') {
            return (<LoadRom/>);
        } else {
            if (romContext.selected !== undefined) {
                return (<Game/>);
            } else {
                return renderNoRomSelected();
            }
        }
    } else {
        return renderNonTouchDevice();
    }
}