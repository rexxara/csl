
/**
 * 来找出某个对象身上的某个属性继承自哪个对象。
 */
function findPrototypeByProperty(obj, propertyName) {
    do {
      if (obj.hasOwnProperty(propertyName)) {
        return obj
      }
    } while (obj = Object.getPrototypeOf(obj))
  }

const foo = {a: 1}

const bar = Object.create(foo)
bar.b = 2

const baz = Object.create(bar)
baz.c = 3

console.log(findPrototypeByProperty(baz, "c") === baz) // true
console.log(findPrototypeByProperty(baz, "b") === bar) // true
console.log(findPrototypeByProperty(baz, "a") === foo) // true



/**
 * class URLSearchParams {} 语法实现一个该接口的 polyfill
 */

class URLSearchParams {
    _searchParams = []
  
    constructor(init) {
      if (typeof init === "string") {
        this._searchParams = init.split("&").map(kv => kv.split("="))
      } else {
        this._searchParams = Object.entries(init)
      }
    }
  
    get(key) {
      const param = this._searchParams.find(param => param[0] === key)
      return param && param[1]
    }
  
    set(key, value) {
      const param = this._searchParams.find(param => param[0] === key)
  
      if (param) {
        param[1] = value
      } else {
        this._searchParams.push([key, value])
      }
    }
  
    has(key) {
      return this._searchParams.some(param => param[0] === key)
    }
  
    append(key, value) {
      this._searchParams.push([key, value])
    }
  
    toString() {
      return this._searchParams.map(param => param.join("=")).join("&")
    }
  
    *[Symbol.iterator]() {
      yield* this._searchParams
    }
  } 

  // 构造函数支持传入 URL 参数串
searchParams = new URLSearchParams("foo=1&bar=2") 

// 构造函数也支持传入一个包含参数键值对的对象
searchParams = new URLSearchParams({foo: "1", bar: "2"})

// 实例支持 get()、set()、has()、append() 四个方法
console.log(searchParams.get("foo")) // "1"
searchParams.set("foo", "10") 
console.log(searchParams.has("bar")) // true
searchParams.append("foo", "100") 

// 实例支持 toString() 方法
console.log(searchParams.toString()) // "foo=10&bar=2&foo=100"

// 实例支持 for-of 迭代
for(const [key, value] of searchParams) {
  console.log([key, value])
  // ["foo", "10"]
  // ["bar", "2"]
  // ["foo", "100"]
}