export function waitImmediate(): Promise<void> {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            resolve();
        });
    });
}

export function waitTime(miliseconds: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, miliseconds);
    });
}
