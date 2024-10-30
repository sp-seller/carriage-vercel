// App.js
import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import InputSection from './components/InputSection';
import CostResult from './components/CostResult';

const { Content } = Layout;

const App = () => {
    const [inputs, setInputs] = useState({route: 1, typeOfGoods: 1});
    const [costs, setCosts] = useState(null);

    const handleInputChange = (newInputs) => {
        setInputs(newInputs);
    };

    const calculateCosts = () => {
        console.log("inputs:", inputs)
        const {
            route,
            typeOfGoods,
            boxCount,
            length,
            width,
            height,
            weightPerBox,
            itemsPerBox,
            storageDays,
        } = inputs;

        const rate = 4.7; // 汇率
        const actualVolume = (boxCount * length * width * height) / 1000000;
        const volumeWeight = (actualVolume * 1000000) / 6000;
        const actualWeight = boxCount * weightPerBox
        let volume = Math.round(Math.max(actualWeight, volumeWeight)/230*100)/100;
        if (volume < 1) {
            volume = 1
        }
        console.log(actualVolume, actualWeight, volume)

        let carriageUnit = 0;
        if (route === 2) {
            carriageUnit = typeOfGoods === 1 ? 630 : (typeOfGoods === 2 ? 730 : (typeOfGoods === 3 ? 900 : 0))
        } else {
            carriageUnit = typeOfGoods === 1 ? 1180 : (typeOfGoods === 2 ? 1300 : (typeOfGoods === 3 ? 1600 : 0));
        }

        // 仓储费
        let storageCost = storageDays <= 30 ? actualVolume * storageDays * 10 :
            (storageDays <= 90 ? actualVolume * storageDays * 16 :
                (storageDays <= 180 ? actualVolume * storageDays * 19 :
                    (actualVolume * storageDays * 26))); // 每立方米每天5元
        storageCost = Math.ceil(storageCost / rate);

        const carriage = Math.ceil(carriageUnit * volume); // 运费
        const listingFee = Math.ceil(boxCount * itemsPerBox * 1 / rate); // 上架费
        const outboundFee = Math.ceil(boxCount * itemsPerBox * 12 / rate); // 出库费
        const unloadingFee = Math.ceil(actualVolume * 110 / rate); // 卸货费
        const returnFee = 0; // 退货费用
        const interceptionFee = 0; // 拦截费用
        const tax = Math.round((carriage + storageCost + listingFee + outboundFee + unloadingFee + returnFee + interceptionFee) * 0.07 / rate);

        const totalCost = carriage + storageCost + listingFee + outboundFee + unloadingFee + returnFee + interceptionFee + tax;

        // 计算单个商品费用
        const itemCost = totalCost / (boxCount * itemsPerBox);

        setCosts({
            total: {
                value: totalCost,
                details: [
                    { label: "运费", value: carriage, percent: Math.round(carriage / totalCost * 100) / 100 },
                    { label: "仓储费", value: storageCost, percent: Math.round(storageCost / totalCost * 100) / 100 },
                    { label: "卸货费", value: unloadingFee, percent: Math.round(unloadingFee / totalCost * 100) / 100 },
                    { label: "上架费", value: listingFee, percent: Math.round(listingFee / totalCost * 100) / 100 },
                    { label: "出库费", value: outboundFee, percent: Math.round(outboundFee / totalCost * 100) / 100 },
                    { label: "销退入库", value: returnFee, percent: Math.round(returnFee / totalCost * 100) / 100 },
                    { label: "拦截订单", value: interceptionFee, percent: Math.round(interceptionFee / totalCost * 100) / 100 },
                    { label: "增值税", value: tax, percent: Math.round(tax / totalCost * 100) / 100 },
                ],
            },

            item: {
                value: itemCost,
            }
        });
    };

    return (
        <Layout style={{ padding: '20px', backgroundColor: '#fff' }}>
            <Content>
                <InputSection onInputChange={handleInputChange} />
                <Button type="primary" onClick={calculateCosts} style={{ marginTop: '20px' }}>
                    计算费用
                </Button>
                {costs && <CostResult costs={costs} />}
            </Content>
        </Layout>
    );
};

export default App;
