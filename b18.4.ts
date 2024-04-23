function parameterValidation(validationFunc: Function) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (validationFunc(...args)) {
                return originalMethod.apply(this, args);
            } else {
                return "Parameter validation failed.";
            }
        };

        return descriptor;
    };
}

function validatePositiveSum(...args: number[]): boolean {
    const sum = args.reduce((total, num) => total + num, 0);
    return sum > 0;
}

class Example3 {
    @validate(validatePositiveSum)
    static addNumbers(x: any, y: any): number {
        return x + y;
    }
}

console.log(Example3.addNumbers(1,1)); 
console.log(Example3.addNumbers("he", 3)); 
