import styled from "styled-components";

export const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Area = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: none;
    -webkit-user-select: none;    
`;

export const GamepadArea = styled(Area)`
    width: 25%;
`;

export const EmulatorArea = styled(Area)`
    width: 50%;
`;

export const NoUserSelectButton = styled.button`
    user-select: none;
`;

export const NoUserSelectLabel = styled.label`
    user-select: none;
`;

export const LargeMessage = styled.h2`
    text-align: center;
    visibility: ${props => props.hide ? 'hidden' : 'visible'};
`;

export const Message = styled.span`
    text-align: center;
`;