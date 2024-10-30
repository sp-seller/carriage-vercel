// CostResult.js
import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { Liquid } from '@ant-design/plots';

const { Text, Title } = Typography;

const CostResult = ({ costs }) => {
  console.log(costs)
  const style = {
    outlineBorder: 1,
    outlineDistance: 2,
    waveLength: 150,
  }

  return (
    <div style={{ padding: '20px' }}>
      单个货品费用:<Text style={{fontSize: '17px', fontWeight: 'bold'}}> {costs.item.value.toFixed(2)}元</Text><br />
      货品总费用: <Text style={{fontSize: '17px', fontWeight: 'bold'}}>{costs.total.value.toFixed(2)}元</Text><br /><br />
      <Row gutter={[16, 16]} justify='space-around'>
        {costs.total.details.map((item, index) => (
          <Col span={6} key={index}>
            <Card style={{ padding: '10px' }}>
              <Row align='middle'>
                <Col style={{ width: '40%', height: '100px' }}>
                  <Liquid percent={item.percent || 0} style={style} />
                </Col>
                <Col style={{ width: '50%' }}>
                  <Title level={5}>{item.value || 0}元</Title>
                  <Text>{item.label}（人民币）</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CostResult;
