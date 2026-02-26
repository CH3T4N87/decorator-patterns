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
      const original = descriptor.value;
      descriptor.value = (...args: any[]) => {
         console.log("----------Initiating Payment-----------");
         original.apply(this, args)
         .then((res: any) => console.log(res))
         .catch((err: any)=>{
            console.log("Payment Failed : RETRY NO."+retryCount);
            if(retryCount < 3){
               original.apply(this, args)
            }else{
               console.log(err);
            }
         })
      }



   }
}


class PaymentService {
   @Retry(3)
   pay(amount: number) {
      const random = Math.random();
      if(random === 0){
         return Promise.resolve("Processing payment of "+amount);
      }else{
         return Promise.reject("Payment failed because you are broke !!!!");
      }
      // console.log("Processing payment of " + amount);
   }
}

const service = new PaymentService();
service.pay(41);