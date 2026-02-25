//Any payment request should automatically retry up to 3 times before finally failing.

function Retry(times: number) {
   return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
   ) {
      // console.log(target); target === PaymentService.prototype
      // console.log("propertyKey: "+propertyKey); fun name
      // console.log(descriptor); //prop chars
      let retryCount = 1;




   }
}


class PaymentService {
   @Retry(3)
   pay(amount: number) {
      
      console.log("Processing payment of " + amount);
   }
}

const service = new PaymentService();
service.pay(41);