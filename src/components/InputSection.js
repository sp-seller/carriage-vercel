// InputSection.js
import React from 'react';
import { Row, Col, Typography, Card, Input, Radio } from 'antd';

const { Title, Text } = Typography;

const InputSection = ({ onInputChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div>
      <Card bordered={false} style={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ textAlign: 'center' }}>物流费用计算器</Title>

      <h2>请输入商品信息：</h2>
      <Row gutter={[16,16]}>
        <Col span={12}>
          <Text>运输路线：</Text>
          <Radio.Group  defaultValue={1} optionType="button" buttonStyle="solid" name = "route" onChange={handleChange}
            options={[
              {label: "陆运", value: 1},
              {label: "海运", value: 2},
            ]}
          />
        </Col>

        <Col span={12}>
          <Text>货物类型：</Text>
          <Radio.Group  defaultValue={1} optionType="button" buttonStyle="solid" name = "typeOfGoods" onChange={handleChange}
            options={[
              {label: "普货", value: 1},
              {label: "电商货", value: 2},
              {label: "其它", value: 3},
            ]}
          />
        </Col>
      </Row>
      <br />

      <Row gutter={[16, 16]}>
        <Col span={12}>
        <Text>商品箱数：</Text>
          <Input size='large' style={{width: "50%"}} name="boxCount" placeholder="商品箱数" onChange={handleChange} />
        </Col>
        <Col span={12}>
          <Text>商品体积：</Text>
          <Input size='large' style={{width: "15%", marginLeft: "0px"}}  name="length" placeholder="长 (cm)" onChange={handleChange} />
          <Input size='large' style={{width: "15%", marginLeft: "15px"}}  name="width" placeholder="宽 (cm)" onChange={handleChange} />
          <Input size='large' style={{width: "15%", marginLeft: "15px"}}  name="height" placeholder="高 (cm)" onChange={handleChange} />
        </Col>
      </Row>
      <br/>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text>每箱重量：</Text>
          <Input size='large' style={{width: "50%"}}  name="weightPerBox" placeholder="每箱重量 (kg)" onChange={handleChange} />
        </Col>
        <Col span={12}>
          <Text>每箱个数：</Text>
          <Input size='large' style={{width: "50%"}}  name="itemsPerBox" placeholder="每箱个数" onChange={handleChange} />
        </Col>
      </Row>
      <br/>
      <Row gutter={[16, 16]}>
        {/* <Col span={12}>
          <Text>商品重量：</Text>
          <Input size='large' style={{width: "50%"}}  name="weightPerItem" placeholder="商品重量 (kg)" onChange={handleChange} />
        </Col> */}
        <Col span={12}>
          <Text>仓储天数：</Text>
          <Input size='large' style={{width: "50%"}}  name="storageDays" placeholder="每箱个数" onChange={handleChange} />
        </Col>
      </Row>
      </Card>
    </div>
  );
};

export default InputSection;
