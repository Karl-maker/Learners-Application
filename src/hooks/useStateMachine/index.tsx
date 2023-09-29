import { useState } from 'react';

export type StateConfig = {
    initial: string;
    states: Record<string, { on: Record<string, string> }>;
};

/**
 * useStateMachine Hook
 *
 * This custom hook is designed to manage a simple state machine in a React component.
 * It provides the current state and a function to transition to a new state.
 *
 * @param {StateConfig} stateConfig - An object that defines the states and transitions.
 * @returns {Object} An object containing the current state and a function to transition to a new state.
 *
 * @example
 * // Usage example:
 * const stateConfig: StateConfig = {
 *   initial: 'idle',
 *   states: {
 *     idle: { on: { START: 'running' } },
 *     running: { on: { STOP: 'stopped' } },
 *     stopped: { on: { RESET: 'idle' } },
 *   },
 * };
 *
 * const { state, transition } = useStateMachine(stateConfig);
 *
 * // Transition to a new state
 * transition('START'); // Transition to 'running'
 * transition('STOP');  // Transition to 'stopped'
 * transition('RESET'); // Transition to 'idle'
 */

const useStateMachine = (stateConfig: StateConfig) => {
  const [currentState, setCurrentState] = useState<string>(stateConfig.initial);

  const transition = (event: string) => {
    const nextState = stateConfig.states[currentState]?.on[event];
    if (nextState) {
      setCurrentState(nextState);
    } else {
      // throw(`Invalid transition: ${currentState} -> ${event}`);
    }
  };

  return {
    state: currentState,
    transition,
  };
};

export default useStateMachine;

