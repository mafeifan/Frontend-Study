import React from 'react'
import Input from './Input'

import '../antd.css'

export default () => {

  return (<div>
    <Input placeholder="Basic usage" size="small" onPressEnter={() => alert('hello')}/>
    <br/><br/>
    <Input placeholder="Basic usage" size="small" disabled />
    <br/><br/>
    <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
  </div>)
}
