export const sanitizeRequestBody = (req, res, next) => {
    const sanitizeValue = (value) => {
        if (typeof value === 'string') {
            return value.replace(/^\s+|\s+$/g, '');
        }
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const sanitized = {};
            for (const [key, val] of Object.entries(value)) {
                sanitized[key] = sanitizeValue(val);
            }
            return sanitized;
        }
        if (Array.isArray(value)) {
            return value.map(sanitizeValue);
        }
        return value;
    };

    if (req.body) {
        req.body = sanitizeValue(req.body);
    }

    next();
};