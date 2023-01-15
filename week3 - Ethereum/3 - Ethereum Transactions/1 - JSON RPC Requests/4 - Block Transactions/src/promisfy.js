// This piece of implementation is a fork of https://github.com/googleapis/nodejs-promisify

function promisify(originalMethod, options) {
    if (originalMethod.promisified_) {
        return originalMethod;
    }
    
    options = options || {};
    const slice = Array.prototype.slice;

    const wrapper = function () {
        let last;
        for (last = arguments.length - 1; last >= 0; last--) {
            const arg = arguments[last];
            if (typeof arg === 'undefined') {
                continue;
            }
            if (typeof arg !== 'function') {
                break;
            }
            return originalMethod.apply(this, arguments);
        }

        const args = slice.call(arguments, 0, last + 1);

        let PromiseCtor = Promise;

        if (this && this.Promise) {
            PromiseCtor = this.Promise;
        }
        return new PromiseCtor((resolve, reject) => {
            args.push((...args) => {
                const callbackArgs = slice.call(args);
                const err = callbackArgs.shift();
                if (err) {
                    return reject(err);
                }

                resolve(callbackArgs[0]);
            });
            originalMethod.apply(this, args);
        });
    };

    wrapper.promisified_ = true;

    return wrapper;
}

module.exports = promisify;