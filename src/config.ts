export const DB_HOST = getConfigValue('DB_HOST', 'string'),
    DB_USER = getConfigValue('DB_USER', 'string'),
    DB_PASSWORD = getConfigValue('DB_PASSWORD', 'string'),
    DB_NAME = getConfigValue('DB_NAME', 'string'),
    PORT = getConfigValue('PORT', 'number');

function getConfigValue(key: string, type: 'string'): string;
function getConfigValue(key: string, type: 'number'): number;
function getConfigValue(key: any, type: any) {
    const value = process.env[key];
    if (!value) {
        throw Error(`In Environment should be defined "${key}".`);
    }
    if (type === 'string') {
        return value;
    } else if (type === 'number') {
        const valueAsNumber = parseFloat(value);
        if (isNaN(valueAsNumber)) {
            throw new Error(
                `Config value in Environment "${key}" is not numeric but its value is "${value}".`,
            );
        }
        return valueAsNumber;
    }

    throw new Error(
        `Config value in Environment "${key}" should be string or number.`,
    );
}
