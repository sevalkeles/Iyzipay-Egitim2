import iyzipay from "../connection/iyzipay";

export const checkInstallments = (data) => {
    return new Promise((resolve,reject) => {
        iyzipay.installmentInfo.retrieve(data,(err,result) =>{
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}