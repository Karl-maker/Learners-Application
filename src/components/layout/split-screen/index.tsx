// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ horizontal: boolean, height: string }>`
    display: flex;
    flex-direction: ${props => (props.horizontal ? 'column' : 'row')};
    height: ${props => props.height};
`;

const Pane = styled.div<{ weight: number }>`
    flex: ${props => props.weight};
`;

interface SplitScreenProps {
    children: React.ReactNode[];
    firstWeight?: number;
    secondWeight?: number;
    horizontal?: boolean;
    height?: string;
}

/**
 * SplitScreen Component
 *
 * This component provides a split screen layout with customizable styling options.
 *
 * @component
 *
 * @param {React.ReactNode[]} children - An array of React components or elements to be displayed in the split screen.
 * @param {number} firstWeight - The flex weight of the first child in the split screen (default: 1).
 * @param {number} secondWeight - The flex weight of the second child in the split screen (default: 1).
 * @param {boolean} horizontal - Determines whether the split screen layout is horizontal (side by side) or vertical (top-bottom) (default: false).
 * @param {string} height - The height of the split screen container (default: 'auto').
 *
 * @returns {React.ReactNode} The split screen layout with customizable styling.
 *
 * @example
 * // Usage example for a vertical split screen:
 * <SplitScreen
 *   firstWeight={2}
 *   secondWeight={1}
 *   horizontal={false}
 *   height="400px"
 * >
 *   <div>Left Content</div>
 *   <div>Right Content</div>
 * </SplitScreen>
 */

const SplitScreen: React.FC<SplitScreenProps> = ({
    children,
    firstWeight = 1,
    secondWeight = 1,
    horizontal = false,
    height = 'auto'
}: SplitScreenProps) => {
    const [Left, Right] = children;

    return (
        <Container horizontal={horizontal} height={height}>
            <Pane weight={firstWeight}>
                {Left}
            </Pane>
            <Pane weight={secondWeight}>
                {Right}
            </Pane>
        </Container>
    );
};

export default SplitScreen;