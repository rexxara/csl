import React, { useState, useEffect } from 'react';


function HoocConsole(config) {
    const [array, setArray] = useState([])
    const [cslState, setCslState] = useState(config.open)
    if (!window.hcsl) {
        window.hcsl = function (params) {
            const type = Object.prototype.toString.call(params)
            console.log(type)
            if (type === '[object Object]') {
                try {
                    JSON.stringify(params)
                } catch (error) {
                    return alert(error)
                }
            }
            if (type === '[object HTMLSpanElement]' || type === '[object HTMLCollection]') {
                return alert("type" + type + "are not valid")
            }
            return setArray((array) => [...array, params])
        }
    }

    // Without the second parameter
    useEffect(() => {
        // console.log('I will run after every render');
    });

    // With the second parameter
    useEffect(() => {
        // console.log('I will run only when array cha00nges');
    }, [array]);

    // With empty array
    useEffect(() => {
        // console.log('I will run only once');
    }, []);
    const render = (param) => {
        const type = Object.prototype.toString.call(param)
        switch (type) {
            case '[object Array]':
                let arr = []
                param.map((v, i) => {
                    arr.push(v)
                    arr.push(",")
                })
                arr.pop()
                return <div className="array">[{arr.map((v, k) => <span key={k}>{render(v)}</span>)}]</div>

            case '[object Null]':
                return <span style={{ color: "#7d7d7d" }} className="undefined">null</span>
            case '[object Number]':
                return <span style={{ color: "#7261bb" }} className="number">{param}</span>
            case '[object Object]':
                return <span style={{ color: "#7261bb" }} className="object">{JSON.stringify(param)}</span>
            case '[object String]':
                return <span style={{ color: "#e68551" }} className="string">{param}</span>
            case '[object Undefined]':
                return <span style={{ color: "#9df0f0" }} className="undefined">undefined</span>
            default:
                return <span className="default">{param}</span>
        }

    }
    return <React.Fragment>
        <div className="cslCon" style={{ bottom: `${cslState ? '0vw' : '-38vw'}` }}>
            {array.map((v, k) => <div style={{ fontWeight: "bold" }} key={k}>{render(v)}</div>)}
        </div>
        <div className="closeBtn" style={{ bottom: `${cslState ? '40vw' : '0vw'}` }} onClick={() => setCslState(!cslState)} />
    </React.Fragment>
}

export default HoocConsole


// componentDidMount(){
//     window.hcsl=this.hcsl.bind(this)
// }
// hcsl=function(){
//     console.log(...arguments)
//     console.log('inHcsl')
// }