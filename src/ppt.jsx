import React, { useEffect, useState, useCallback } from 'react'
import useUserList from './RHooks/services'
import LoadingUtils from './RHooks/loadingUtils'
import { Button, List } from 'antd'
export default function () {
    const [users, { getList, loading, addUser, deleteUser }] = useUserList()
    const addUserHandle = useCallback(() => { addUser(users.length) }, [users])
    useEffect(() => {
        getList()
    }, [])
    return (
        <div>
            <div style={{ textAlign: 'center', width: '300px', margin: '50px' }}>
                <LoadingUtils loading={loading}>
                    <List
                        header={<div>Test</div>}
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
                </LoadingUtils>
            </div>
        </div>
    )
}