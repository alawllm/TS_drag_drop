namespace App {
 
  // autobind decorator
  // naming: hint that the parameter is not used
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    // descriptor.value is the original method
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      // ensures that the method is bound to the correct this keyword
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
}  
 