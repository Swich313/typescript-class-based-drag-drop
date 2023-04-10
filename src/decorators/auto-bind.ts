namespace App {
    //autobind decorator
    export function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;
        const adjustedDescriptor: PropertyDescriptor = {
            configurable: true,
            get(): Function {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        }
        return adjustedDescriptor;
    }
}