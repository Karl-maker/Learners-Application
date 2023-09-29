// @ts-nocheck

import React from "react";
import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
`;

const OuterWidget = styled.div<{ 
    outerBorderRadius: string, 
    outerBorderWidth: string, 
    outerBorderColor: string,
    outerPadding: string,
    outerBackgroundColor: string
}>`
    padding: ${props => props.outerPadding};
    margin: 0px;
    height: 100%;
    box-sizing: border-box; /* Ensure padding is included within the height */
    background-color: ${props => props.outerBackgroundColor};
`;

const Skeleton = styled.div<{ 
    innerBorderRadius: string, 
    innerBorderWidth: string, 
    innerBorderColor: string,
    innerPadding: string,
    innerBackgroundColor: string
}>`
    border-radius: ${props => props.innerBorderRadius};
    padding: ${props => props.innerPadding};
    height: 100%;
    box-sizing: border-box; /* Ensure padding is included within the height */
    background-color: ${props => props.innerBackgroundColor};
    animation: ${fade} 3s infinite; /* Add the fade-in and fade-out animation */
`;


const Widget = styled.div<{ 
    innerBorderRadius: string, 
    innerBorderWidth: string, 
    innerBorderColor: string,
    innerPadding: string,
    innerBackgroundColor: string
}>`
    border-radius: ${props => props.innerBorderRadius};
    border: ${props => props.innerBorderWidth} solid ${props => props.innerBorderColor};
    padding: ${props => props.innerPadding};
    height: 100%;
    box-sizing: border-box; /* Ensure padding is included within the height */
    background-color: ${props => props.innerBackgroundColor};
`;

interface WidgetWrapperProps {
    children: React.ReactNode;
    outerBorderWidth?: string;
    outerBorderRadius?: string;
    outerBorderColor?: string;
    innerPadding?: string;
    innerBackgroundColor?: string;
    outerBackgroundColor?: string;
    outerPadding?: string;
    widgetClassName?: string;
    containerClassName?: string;
    loading?: boolean;
}

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ 
    children,
    outerBorderRadius = '15px',
    outerBorderWidth = '0',
    outerBorderColor = 'transparent',
    innerPadding = '10px',
    outerPadding = '5px',
    innerBackgroundColor = 'transparent',
    outerBackgroundColor = 'transparent',
    widgetClassName = "",
    containerClassName = "",
    loading = false
 }: WidgetWrapperProps) => {
    return <>
        {!loading ?
            <OuterWidget 
            outerPadding={outerPadding}
            outerBackgroundColor={outerBackgroundColor}
            className={containerClassName}
            >
                <Widget 
                    innerBorderRadius={outerBorderRadius}
                    innerBorderWidth={outerBorderWidth}
                    innerBorderColor={outerBorderColor}
                    innerPadding={innerPadding}
                    className={widgetClassName}
                >
                    {children}
                </Widget>
        </OuterWidget> 
        :
        <SkeletonWidget
            outerBorderRadius = {outerBorderRadius}
            outerBorderWidth = {outerBorderWidth}
            outerBorderColor = {outerBorderColor}
            innerPadding = {innerPadding}
            outerPadding = {outerPadding}
            outerBackgroundColor = {outerBackgroundColor}
        />
    }
    </>
}

const SkeletonWidget: React.FC<WidgetWrapperProps> = ({ 
    outerBorderRadius = '15px',
    outerBorderWidth = '0',
    outerBorderColor = 'transparent',
    innerPadding = '10px',
    outerPadding = '5px',
    innerBackgroundColor = '#b2bec3',
    outerBackgroundColor = 'transparent',
 }: WidgetWrapperProps) => {
    return <OuterWidget 
        outerPadding={outerPadding}
        outerBackgroundColor={outerBackgroundColor}
    >
        <Skeleton 
            className='skeleton'
            innerBorderRadius={outerBorderRadius}
            innerBorderWidth={outerBorderWidth}
            innerBorderColor={outerBorderColor}
            innerPadding={innerPadding}
            innerBackgroundColor={innerBackgroundColor}
        >
        </Skeleton>
    </OuterWidget>
}


export default {
    /**
     * WidgetWrapper Component
     *
     * This component provides a wrapper with customizable styling options for a child widget.
     *
     * @component
     *
     * @param {React.ReactNode} children - The content to be wrapped.
     * @param {string} outerBorderRadius - The border radius of the outer container.
     * @param {string} outerBorderWidth - The border width of the outer container.
     * @param {string} outerBorderColor - The border color of the outer container.
     * @param {string} innerPadding - The padding of the inner widget.
     * @param {string} innerBackgroundColor - The background color of the inner widget.
     * @param {string} outerBackgroundColor - The background color of the outer container.
     * @param {string} outerPadding - The padding of the outer container.
     * @param {boolean} loading - Displays skeleton
     *
     * @returns {React.ReactNode} The wrapped content with customizable styling.
     *
     * @example
     * // Usage example:
     * <WidgetWrapper
     *   outerBorderRadius="15px"
     *   outerBorderWidth="2px"
     *   outerBorderColor="blue"
     *   innerPadding="10px"
     *   outerPadding="5px"
     *   innerBackgroundColor="white"
     *   outerBackgroundColor="lightgray"
     * >
     *   <p>Hello, Widget!</p>
     * </WidgetWrapper>
     */
    Widget: WidgetWrapper,
    
    /**
     * SkeletonWidget Component
     *
     * This component represents a skeleton loading state for the WidgetWrapper component.
     * It applies a fade-in and fade-out animation using styled-components.
     *
     * @component
     *
     * @param {string} outerBorderRadius - The border radius of the outer container.
     * @param {string} outerBorderWidth - The border width of the outer container.
     * @param {string} outerBorderColor - The border color of the outer container.
     * @param {string} innerPadding - The padding of the inner widget.
     * @param {string} innerBackgroundColor - The background color of the inner widget.
     * @param {string} outerPadding - The padding of the outer container.
     * @param {string} outerBackgroundColor - The background color of the outer container.
     *
     * @returns {React.ReactNode} The skeleton loading state.
     */
    Skeleton: SkeletonWidget
}
