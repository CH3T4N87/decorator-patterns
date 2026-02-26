
function Retry(times: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let retryCount = 0;

    
    descriptor.value = function (...args: any[]) {
      const execute = () => {
        return originalMethod.apply(this, args).catch((err: any) => {
          if (retryCount < times) {
            retryCount++;
            console.log(`Payment Failed : RETRY NO. ${retryCount}`);
            return execute(); 
          } else {
            console.log("Maximum retries reached.");
            throw err; 
          }
        });
      };
      return execute();
    };
  };
}

class PaymentService {
  // @Retry(3)
  pay(amount: number) {
    console.log("----------Initiating Payment-----------");
    const random = Math.random();
    if (random <= 0.5) {
      return Promise.resolve("Processing payment of " + amount);
    } else {
      return Promise.reject("Payment failed because you are broke !!!!");
    }
  }
}

const service = new PaymentService();
service.pay(41).then(console.log).catch(console.error);
