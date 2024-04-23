function logFunctionInfo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Tên Hàm: ${propertyKey}`); // Sửa tên hàm
        console.log(`Đối số: ${args}`);

        let result = originalMethod.apply(this, args);
        console.log(`Kết Quả: ${result}`);
        return result;
    };

    return descriptor;
}

class Example {
    greet(arg0: string) {
        throw new Error("Phương thức chưa được cài đặt.");
    }
    @logFunctionInfo
    add(a: number, b: number): number {
        return a + b;
    }
}