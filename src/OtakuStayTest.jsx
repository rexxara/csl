import React, { useEffect, useState, useCallback } from 'react'
import useUserList from './RHooks/services'
import LoadingUtils from './RHooks/loadingUtils'
import useMouse from './RHooks/uesMouse'
import { Button, List } from 'antd'
const cons = () => {
    console.log('resize')
}
export default function () {
    const [users, { getList, loading, addUser, deleteUser }] = useUserList()
    const [count, setCount] = useState(0)
    const addUserHandle = useCallback(() => { addUser(users.length) }, [users])
    useEffect(() => {
        getList()
        window.addEventListener('resize', cons)
        return () => {
            window.removeEventListener('resize', cons)
        }
    }, [])
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count])
    // const [MousePos,posObj]=useMouse()
    // console.log(posObj)
    return (
        <div>
            {/* <MousePos/> */}
            {/* <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
      </button> */}
            <div style={{ textAlign: 'center', width: '300px', margin: '50px' }}>
                <LoadingUtils loading={loading}>
                    <List
                        header={<div>OtakuStayTest</div>}
                        footer={<Button onClick={addUserHandle}>addUser</Button>}
                        bordered
                        dataSource={users}
                        renderItem={item => <List.Item>{item}
                            <Button
                                type='primary'
                                onClick={() => deleteUser((params) => params === item)}
                            >删除</Button>
                        </List.Item>}
                    />
                    {/* {users.map((v, k) => <div key={k}>
                        <span>{v}</span>
                        <Button
                            style={{ margin: '20px' }}
                            onClick={() => deleteUser((item) => item === v)}
                        >删除</Button>
                    </div>)} */}
                </LoadingUtils>
            </div>
        </div>
    )
}