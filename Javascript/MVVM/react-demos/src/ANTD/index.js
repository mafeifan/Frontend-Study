import React from 'react'
import {Row, Col} from './grid/index'
import Breadcrumb from './breadcrumb/index';

export default () => {
  return (<div>
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
    <Row gutter={16}>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row gutter={32}>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </div>)
}
