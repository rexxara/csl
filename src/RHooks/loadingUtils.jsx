import React from 'react'
import STATE_MAP from './static'
import {Icon} from 'antd'
export default function (props) {
    const { loading, children } = props
    switch (loading) {
        case STATE_MAP.loading:
            return <Icon type="loading" />
        case STATE_MAP.loaded:
            return children
        default:
            return 'error'
    }
}