import { useState } from "react"
import Box from '../../components/Box'
import Column from '../../components/Column';
import { Col, Row } from 'antd';



interface IFruitVagetable {
    name: string;
    type: number;
}

function Assignment1Page() {
    const [listMix, setListMix] = useState<Array<IFruitVagetable>>([{ name: "Banana", type: 1 }, { name: "Tomato", type: 2 }, { name: "Mushroom", type: 2 }, { name: "Orange", type: 1 }]);
    const [listFood, setListFood] = useState<Array<IFruitVagetable>>([]);
    const [listVagetables, setListVagetables] = useState<Array<IFruitVagetable>>([]);


    const [listGroupNew, setListGroupNew] = useState<Array<IFruitVagetable>>([]);


    const filterGroup = (group: IFruitVagetable | null, groups: IFruitVagetable[] = [], event: React.MouseEvent) => {

        if (event.button == 0 && group !== null) {
            /*   if (group.type === 1) {
                  setListFood(prevList => [...prevList, group]);
              } else if (group.type == 2) {
                  setListVagetables(prevList => [...prevList, group]);
              } */

            setListGroupNew(prevList => [...prevList, group]);
            const updatedList = listMix.filter(item => item.name !== group.name);
            setListMix(updatedList);

        } else if (event.button == 2 && groups.length > 0) {
            const last = groups[groups.length - 1]
            let notLast = groups.pop() ? groups : []

            /*  if (last.type === 1) {
                 setListFood(notLast)
             } else if (last.type === 2) {
                 setListVagetables(notLast)
             } */
            setListGroupNew(notLast);

            setListMix(pre => [...pre, last])
        }

    };

    const filterGroup = (item: IFruitVagetable) => {
        setListGroupNew(prevList => [...prevList, item]);
        const updatedList = listMix.filter(item => item.name !== item.name);
        setListMix(updatedList);
    }


    return (
        <>
            <div>
                <Row>
                    <Col span={8}>
                        {listMix.map((item, idx) => (
                            // <Box key={idx} props={{ name: item.name }} onClickAdd={(event) => filterGroup(item, [], event)}></Box>
                            <Box key={idx} props={{ name: item.name }} onClickAdd={(event) => filterGroup(item)}></Box>
                        ))}
                    </Col>
                    <Col span={8}>
                        <Column props={{ someProp: 'ss' }} onClickRight={(event) => filterGroup(null, listFood, event)}>
                            <Col span={24} >
                                <div >
                                    <Box props={{ name: 'Fruit' }}></Box>
                                </div>
                                <div>
                                    {listVagetables.filter(item => item.type === 1).map((item, idx) => (
                                        <Box key={idx} props={{ name: item.name }}></Box>
                                    ))}
                                </div>
                            </Col>
                        </Column>
                    </Col>
                    <Col span={8}>
                        <Column props={{ someProp: 'ss' }} onClickRight={(event) => filterGroup(null, listVagetables, event)}>
                            <Col span={24} >
                                <div >
                                    <Box props={{ name: 'Vegetable' }}></Box>
                                </div>
                                <div>
                                    {listVagetables.filter(item => item.type === 2).map((item, idx) => (
                                        <Box key={idx} props={{ name: item.name }}></Box>
                                    ))}
                                </div>
                            </Col>
                        </Column>
                    </Col>
                </Row>
                {/*  <Column props={{ someProp: 'ss' }}>
                    <Row>
                        <Col span={24} >
                            <div >
                                <Box props={{ name: 'Mango' }}></Box>
                            </div>
                        </Col>
                        <Col span={24} >
                            <div style={{ width: '90%' }}>
                                <Box props={{ name: 'Mango' }}></Box>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div style={{ width: '90%' }}>
                                <Box props={{ name: 'Apples' }}></Box>
                            </div>
                        </Col>
                    </Row>
                </Column >*/}
            </div >
        </>
    )
}

export default Assignment1Page