import { useRef } from "react";

/**
 * Helpful function to help see why your copnent is rerendering
 * watch items and log when they change
 * @param toTrack - object with values you want to track state/props/whatever
 * @param context - a kew to help you identify your stuff in the logs
 * @param showValues - if you want to see the actual new/old values
 */
export const useLogUpdates = (toTrack: any, context: string, showValues?: boolean) => {
    const dataRef = useRef(toTrack);
    const changes = Object.keys(toTrack).reduce((agg, key) => {
        const oldValue = dataRef.current[key];
        const newValue = toTrack[key];
        if (oldValue !== newValue) {
            agg.push({ key, old: oldValue, new: newValue });
        }
        return agg;
    }, [] as { key: string; old: any; new: any }[]);
    if (changes.length) {
        dataRef.current = toTrack;
        if (showValues) {
            console.info(`${context} changes detected`, JSON.stringify(changes, null, 3));
        } else {
            console.info(
                `${context} changes detected`,
                JSON.stringify(
                    changes.map((c) => c.key),
                    null,
                    3,
                ),
            );
        }
    } else {
        console.info(`${context} NO changes detected`);
    }
};

export default useLogUpdates;
