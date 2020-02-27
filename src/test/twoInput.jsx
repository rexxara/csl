import React, { useState, useCallback } from 'react'
const ChildC = React.memo(function ({ val, onChange }) {
    console.log('rendeccccr...')
    return <input value={val} onChange={onChange} />;
})
class ChildB extends React.PureComponent {
    render() {
        console.log('bbbbbbbbbbbbbb...')
        const { val, onChange } = this.props
        return <input value={val} onChange={onChange} />;
    }
}
function App() {
    const [val1, setVal1] = useState('A')
    const [val2, setVal2] = useState('B')
    const [val3, setVal3] = useState('C')
    const [val4, setVal4] = useState('D')

    const onChange1 = useCallback(evt => {
        setVal1(evt.target.value);
    }, []);
    const onChange2 = useCallback(evt => {
        setVal2(evt.target.value);
    }, [])
    const onChange3 = useCallback((evt) => {
        setVal3(evt.target.value)
    }, [])
    const onChange4 = useCallback((evt) => {
        setVal4(evt.target.value)
    }, [])
    return (
        <>
            <ChildC val={val1} onChange={onChange1} />
            <ChildC val={val2} onChange={onChange2} />
            <ChildB val={val3} onChange={onChange3} />
            <ChildB val={val4} onChange={onChange4} />
        </>
    );
}
export default App