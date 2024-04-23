function timingLogger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        let startTime = performance.now(); 

        let result = originalMethod.apply(this, args);
        let endTime = performance.now(); 

        let executionTime = endTime - startTime;
        console.log(`Thời gian thực thi của ${propertyKey}: ${executionTime} milliseconds`);

        return result; 
    };

    return descriptor;
}

class MyClass {
    @timingLogger
    myRenamedMethod(a: number, b: number): number {
        return a + b;
    }
}

let myInstance = new MyClass();
myInstance.myRenamedMethod(2, 3); 
