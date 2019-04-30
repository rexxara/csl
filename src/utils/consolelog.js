
console.log('logger')

let con = null
let toggle = null
const defaultSetting = {
    open: true,
    background: "#242424"
}
let state = {
    open: true
}
function addStyle(target, obj) {
    for (let i in obj) {
        target.style[i] = obj[i]
    }
}
function render(param) {
    const type = Object.prototype.toString.call(param)
    // console.log(param, type, 'inrender')
    switch (type) {
        case '[object Array]':
            console.log(param)
            let res = document.createElement("SPAN")
            res.className = 'array'
            let left = document.createElement("SPAN")
            left.innerText = "["
            left.style.color = "white"
            let right = document.createElement("SPAN")
            right.innerText = "]"
            right.style.color = "white"
            let arr = []
            param.map((v, i) => {
                if (i === 0) {
                    res.appendChild(left)
                } else {
                    arr.push(",")
                }
                arr.push(v)
                return 0
            })
            arr.push(right)
            arr.map(v => {
                return res.appendChild(render(v))
            }
            )
            return res
        case '[object HTMLSpanElement]':
            return param
        case '[object Null]':
            let nnull = document.createElement("SPAN")
            nnull.style.color = "#7d7d7d"
            nnull.innerText += "null"
            return nnull
        case '[object Number]':
            let number = document.createElement("SPAN")
            number.style.color = "#7261bb"
            number.innerText += param
            return number
        case '[object Object]':
            let obj = document.createElement("SPAN")
            obj.style.color = "#7261bb"
            obj.innerText += JSON.stringify(param)
            return obj
        case '[object String]':
            let string = document.createElement("SPAN")
            string.style.color = "#e68551"
            string.innerText = param
            return string
        case '[object Undefined]':
            let Undefined = document.createElement("SPAN")
            Undefined.style.color = "#9df0f0"
            Undefined.innerText = param
            return Undefined
        default:
            let def = document.createElement("SPAN")
            def.className = 'default'
            def.innerText = param
            return def
    }

}
function consolelog(setting) {
    init({
        ...defaultSetting,
        ...setting
    })
    return function () {
        const line = document.createElement("p")
        line.style.margin = "3px"
        console.log(arguments)
        Array.prototype.map.call(arguments, v => render(v)).map(v => line.appendChild(v))
        con.appendChild(line)
    }
}
function toggleCosnole() {
    state.open = !state.open
    con.style.bottom = state.open ? '0' : '-40vw'
    toggle.style.bottom = state.open ? '39vw' : '0vw'
}
function init(setting) {
    // console.log(setting)
    const { background, open } = setting
    const cslCon = document.createElement("DIV")
    const toggleBtn = document.createElement("DIV")
    const style = {
        width: '100vw',
        height: '40vw',
        background: background,
        border: '1px solid #505050',
        padding: '5px',
        position: 'fixed',
        bottom: open ? "0" : '-40vw',
        overflow: "scroll",
        transition: 'all ease-in 0.5s',
        "font-family": 'Arial'
    }
    const toggleBtnStyle = {
        width: '7vw',
        height: '7vw',
        background: "#0084ff",
        "border-radius": '50%',
        position: 'fixed',
        bottom: "39vw",
        right: '3vw',
        transition: 'all ease-out 0.5s'
    }
    addStyle(cslCon, style)
    addStyle(toggleBtn, toggleBtnStyle)
    cslCon.className = "csl-con"
    con = cslCon
    toggle = toggleBtn
    document.body.appendChild(cslCon)
    document.body.appendChild(toggleBtn)
    toggleBtn.addEventListener("click", toggleCosnole)
}

export default consolelog