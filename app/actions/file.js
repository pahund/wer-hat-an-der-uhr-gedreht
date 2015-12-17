export const OPEN = "OPEN";
export const NEW = "NEW";

export function neww() {
    return {
        type: NEW
    };
}

export function open(data) {
    return {
        type: OPEN,
        data
    };
}
