import { useEffect, useState } from "react";
import Box from '../../components/Box';
import Column from '../../components/Column';
import { Col, Row } from 'antd';

interface IFruitVegetable {
    name: string;
    type: number;
}

function Assignment1Page() {
    const [listMix, setListMix] = useState<Array<IFruitVegetable>>([
        { name: "1Banana", type: 1 },
        { name: "3Tomato", type: 2 },
        { name: "2Mushroom", type: 2 },
        { name: "4Orange", type: 1 }
    ]);
    const [listGroupNew, setListGroupNew] = useState<Array<IFruitVegetable>>([]);

    const filterGroups = (item: IFruitVegetable) => {
        setListGroupNew(prevList => [...prevList, item]);
        const updatedList = listMix.filter(mixItem => mixItem.name !== item.name);
        setListMix(updatedList);
        moveBack(item)
    };

    const mergeGroups = (itemNew: IFruitVegetable, type: number) => {
        /* const itemsByGroup = listGroupNew.filter(item => item.type === type);
        const itemsNotGroup = listGroupNew.filter(item => item.type !== type);

        if (itemsByGroup.length > 0) {
            const lastItem = itemsByGroup[itemsByGroup.length - 1];
            const remainingItems = itemsByGroup.slice(0, -1);

            setListMix(prev => [...prev, lastItem]);
            setListGroupNew([...remainingItems, ...itemsNotGroup]);
        } */

        const itemsByGroup = listGroupNew.filter(item => item.type === type);
        const itemsNotGroup = listGroupNew.filter(item => item.type !== type);

        if (itemsByGroup.length > 0) {
            const remainingItems = itemsByGroup.filter(item => item.name != itemNew.name);

            setListMix(prev => [...prev, itemNew]);
            setListGroupNew([...remainingItems, ...itemsNotGroup]);
        }
    };

    /*    const moveBack = () => {
           const first = listGroupNew[0]
   
           const id = setInterval(() => {
               setListMix(prev => [...prev, first]);
               setListGroupNew(prev => prev.filter(i => i.name !== first.name));
               clearInterval(id);
           }, 5000);
       }; */

    const moveBack = (itemMove: IFruitVegetable) => {
        const exists = listMix.some(item => item.name === itemMove.name);

        const id = setInterval(() => {
            if (exists) {
                setListMix(prev => [...prev, itemMove]);
                setListGroupNew(prev => prev.filter(i => i.name !== itemMove.name));

            }
            clearInterval(id);
        }, 5000);
    };

    const onClickActionSwap = (action: string, item: IFruitVegetable, groupType: number = 0) => {
        if (action == "Add") {
            filterGroups(item)
        } else if (action == "Remove") {
            mergeGroups(item, groupType)
        }
    }


    return (
        <>
            <div>
                <Row>
                    <Col span={8}>
                        {listMix.map((item, idx) => (
                            <Box key={idx} props={{ name: item.name }} onClickAction={() => onClickActionSwap("Add", item)} />
                        ))}
                    </Col>
                    <Col span={8}>
                        <Column props={{ someProp: 'ss' }}>
                            <Col span={24}>
                                <div>
                                    <Box props={{ name: 'Fruit' }} />
                                </div>
                                <div>
                                    {listGroupNew.filter(item => item.type === 1).map((item, idx) => (
                                        <Box key={idx} props={{ name: item.name }} onClickAction={() => onClickActionSwap("Remove", item, 1)} />
                                    ))}
                                </div>
                            </Col>
                        </Column>
                    </Col>
                    <Col span={8}>
                        <Column props={{ someProp: 'ss' }}>
                            <Col span={24}>
                                <div>
                                    <Box props={{ name: 'Vegetable' }} />
                                </div>
                                <div>
                                    {listGroupNew.filter(item => item.type === 2).map((item, idx) => (
                                        <Box key={idx} props={{ name: item.name }} onClickAction={() => onClickActionSwap("Remove", item, 2)} />
                                    ))}
                                </div>
                            </Col>
                        </Column>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Assignment1Page;
