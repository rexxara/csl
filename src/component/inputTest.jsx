import React from 'react';
import listenKeybord from '../utils/inputHandle'
console.log(listenKeybord)



class Input extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            inputlistener: null
        }
    }
    componentDidMount() {
        this.addHandle()
    }
    componentWillUnmount() {
        this.removeHandle()
    }
    removeHandle = () => {
        listenKeybord.remove(this.state.inputlistener)
    }
    addHandle = () => {
        window.csl('add')
        const inputlistener = listenKeybord.add(
            document.getElementById("rexxara"),
            () => { window.csl('键盘弹起啦') },
            () => { window.csl('键盘收回去啦') }
        )
        this.setState({
            inputlistener
        })
    }
    render() {
        console.log(this.state.inputlistener)
        if (this.state.inputlistener) {
            console.log(this.state.inputlistener.focusCallback)
        }
        return <React.Fragment> input: <input type="text" id="rexxara" />
            <button onClick={this.addHandle}>add</button>
            <button onClick={this.removeHandle}>remove</button>
        </React.Fragment>
    }
}

export default Input