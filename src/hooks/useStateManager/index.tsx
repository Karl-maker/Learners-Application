import { useState } from 'react';

/**
 * useStateManager Hook
 *
 * This custom hook is designed to facilitate complex state management and actions.
 * It provides a state object, loading state, and an action function to trigger state updates.
 *
 * @returns {Object} An object containing the state, loading state, error state, action function,
 *                   a setter function, and a getter function.
 *
 * @example
 * // Usage example:
 * const { state, loading, error, action, set, get } = useStateManager();
 *
 * // Use the 'action' function to initiate a data fetch or state update operation:
 * action(async (currentState, payload) => {
 *   // Perform state updates or data fetch operations here.
 *   return updatedState; // Update the state accordingly
 * });
 *
 * // 'state' contains the current state, 'loading' indicates the loading state,
 * // 'error' contains any error that occurred during an action, 'set' is used to update the state,
 * // and 'get' is used to retrieve the current state.
 */
const useStateManager = (initialState: object = {}) => {
    const [state, setState] = useState<any>(initialState);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false); // Initialize as false

    const action = async (method: Function, payload: any = null) => {
        try{
            setLoading(true);
            setState(await method(state, payload));
            setLoading(false);
        } catch(err) {
            setError(err);
            setLoading(false);
        }

    };

    const get = () => {
        return state;
    }

    const set = (input: object) => {
        setState((state: any) => {
            return {
                ...state,
                ...input
            }
        })
    }

    return {
        state,
        loading,
        error,
        action,
        set, 
        get
    };
}

export default useStateManager;
