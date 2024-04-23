function validateTypes(...types: any[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (args.length !== types.length) {                
                return `Expected ${types.length} arguments, but received ${args.length}`;
            }

            args.forEach((arg, index) => {
                if (typeof arg !== types[index].name.toLowerCase()) {
                    return `Argument at index ${index} is expected to be of type ${types[index].name}`;
                }
            });

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

class Example5 {
    @validateTypes(Number, String)
    static exampleFunction(num: number, str: string): void {
        console.log(`Received number: ${num}, string: ${str}`);
    }
}5

Example5.exampleFunction(10, "Hello"); // Thành công
Example5.exampleFunction("10", "Hello"); // Tham số đầu tiên phải là một số
Example5.exampleFunction(10, 20); //Tham số thứ hai phải là một chuỗi
Example5.exampleFunction(10); // Số lượng tham số không đúng
