function cachingDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache: { [key: string]: any } = {};

    descriptor.value = function (...args: any[]) {
        const argsString = JSON.stringify(args);
        if (!(argsString in cache)) {
            console.log("Đang tính");
            cache[argsString] = originalMethod.apply(this, args);
        } else {
            console.log("Hehehe");
        }
        return cache[argsString];
    };

    return descriptor;
}

class Example2 {
    @cachingDecorator
    static addNumbers(x: number, y: number): number {
        return x + y;
    }
}

console.log(Example2.addNumbers(4, 6));
console.log(Example2.addNumbers(6, 4));