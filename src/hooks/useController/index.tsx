import { useState } from 'react';

/**
 * useController Hook
 *
 * This custom hook is designed for making asynchronous data fetch requests. It manages
 * the fetch operation, loading state, and the result data.
 *
 * @param {Function} controllerMethod - The asynchronous function that performs the data fetch.
 *
 * @returns {Object} An object containing the fetched result, loading state, and a fetch function.
 *
 * @example
 * // Usage example:
 * const { result, loading, error, action } = useController(controllerMethod);
 *
 * // Use the 'action' function to initiate a data fetch operation:
 * action([param_1, param_2]);
 *
 * // 'result' contains the fetched data, 'loading' indicates the loading state,
 * // and 'error' contains any errors that occurred during the fetch operation.
 */

const useController = (controllerMethod: Function) => {
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false); // Initialize as false

    const action = (input: Array<any>) => {
        setLoading(true);
        return controllerMethod.call({}, input)
            .then(async (data: any) => {
                setResult(data);
                setLoading(false);
                return data;
            })
            .catch((error: any) => {
                setError(error);
                setLoading(false);
            });
    };

    return {
        result,
        loading,
        error,
        action,
    };
}

export default useController;
