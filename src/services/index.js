
const successMessage = msg => {
    return (target, property, descriptor) => {
      const originalMethod = descriptor.value
      descriptor.value = (...args) => new Promise((resolve, reject) => {
        const before = Date.now()
        return originalMethod.call(this, ...args).then(res => {
          if (!res.code) {
            console.log({
              name: property,
              result: res.message,
              time: Date.now() - before
            })
            console.log(msg)
            // message.success(msg)
          }
          resolve(res)
        }).catch(err => reject(err))
      })
      return descriptor
    }
  }
const redDec=(target)=>{
for (const key in target) {
    if (target.hasOwnProperty(key)) {
        const element = target[key]
        console.log(element)
    }
}
console.log(':>>>>',target)
}
@redDec
class Services {
    @successMessage('get daze')
    getList() {
      return new Promise((res, rej) => {
        return setTimeout(() => {
          res({
            code: 0,
            message: 'success',
            data: [2, 3, 3]
          })
        }, 1000);
      })
    }
    getList2() {
      return new Promise((res, rej) => {
        return setTimeout(() => {
          res({
            code: 0,
            message: 'success',
            data: [2, 3, 3]
          })
        }, 1000);
      })
    }
    getList3() {
      return new Promise((res, rej) => {
        return setTimeout(() => {
          res({
            code: 0,
            message: 'success',
            data: [2, 3, 3]
          })
        }, 1000);
      })
    }
  }
  const services = new Services()
  console.log(services)
for (const key in services) {
    console.log(services[key])
}
  export default services