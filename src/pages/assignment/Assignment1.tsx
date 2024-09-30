import { useEffect, useRef, useState } from "react";
import Box from '../../components/Box';
import Column from '../../components/Column';
import { Col, Row } from 'antd';



function Assignment1Page() {
    const listMixRef = useRef<Array<IFruitVegetable>>([
        { name: "Apple", type: ETypeFruitVegetable.Fruit },
        { name: "Broccoli", type: ETypeFruitVegetable.Vegetable },
        { name: "Mushroom", type: ETypeFruitVegetable.Vegetable },
        { name: "Banana", type: ETypeFruitVegetable.Fruit },
        { name: "Tomato", type: ETypeFruitVegetable.Vegetable },
        { name: "Orange", type: ETypeFruitVegetable.Fruit },
        { name: "Mango", type: ETypeFruitVegetable.Fruit },
        { name: "Pineapple", type: ETypeFruitVegetable.Fruit },
        { name: "Cucumber", type: ETypeFruitVegetable.Vegetable },
        { name: "Watermelon", type: ETypeFruitVegetable.Fruit },
        { name: "Carrot", type: ETypeFruitVegetable.Vegetable },
    ]);
    const [listGroupNew, setListGroupNew] = useState<Array<IFruitVegetable>>([]);

    const filterGroups = (item: IFruitVegetable) => {
        setListGroupNew(prevList => [...prevList, item]);
        listMixRef.current = listMixRef.current.filter(mixItem => mixItem.name !== item.name);
        
        moveBack(item);
    };

    const mergeGroups = (itemNew: IFruitVegetable, type: ETypeFruitVegetable) => {
        const itemsByGroup = listGroupNew.filter(item => item.type === type);
        const itemsNotGroup = listGroupNew.filter(item => item.type !== type);

        if (itemsByGroup.length > 0) {
            const remainingItems = itemsByGroup.filter(item => item.name !== itemNew.name);
            const existsInMix = listMixRef.current.some(item => item.name === itemNew.name);

            if (!existsInMix) {
                listMixRef.current.push(itemNew);
                setListGroupNew([...remainingItems, ...itemsNotGroup]);
            }
        }
    };

    const moveBack = (itemMove: IFruitVegetable) => {
        const id = setInterval(() => {

            const exists = listMixRef.current.some(item => item.name === itemMove.name);
            
            if (!exists) {
                listMixRef.current.push(itemMove);
                setListGroupNew(prev => prev.filter(i => i.name !== itemMove.name));
            } 
            clearInterval(id); 
        }, 5000);
        
    };
    
    const onClickActionSwap = (action: string, item: IFruitVegetable, groupType: number = 0) => {
        if (action === "Add") {
            filterGroups(item);
        } else if (action === "Remove") {
            mergeGroups(item, groupType);
        }
    }

    return (
        <div>
            <Row gutter={[16, 0]}>
                <Col span={8}>
                  <Row gutter={[0, 12]}>
                    {listMixRef.current.map((item, idx) => (
                      <Col span={24} style={{padding:"0px 10% 0px 10%"}}>
                       <Box key={idx} props={{ name: item.name,  enableMouseHover: true, styles: { border: '1px solid black', backgroundColor:'lightblue' } }} 
                              onClickAction={() => onClickActionSwap("Add", item)} 
                              />
                      </Col>
                      ))}
                  </Row>
                </Col>
                <Col span={8}>
                    <Column>
                        <Col span={24} style={{padding:'0px'}}>
                          <Row style={{backgroundColor:'#c5c6c7'}}>
                            <Col span={24}>
                              <Box props={{ name: 'Fruit', styles: { borderBottom: '1px solid black' } }} />
                            </Col>
                          </Row>
                            <div>
                                {listGroupNew.filter(item => item.type === 1).map((item, idx) => (
                                    <Box key={idx} props={{ name: item.name, styles: { border: '1px solid black', margin:'15px' } }}  
                                      onClickAction={() => onClickActionSwap("Remove", item, ETypeFruitVegetable.Fruit)} />
                                ))}
                            </div>
                        </Col>
                    </Column>
                </Col>
                <Col span={8}>
                    <Column>
                        <Col span={24} style={{padding:'0px'}}>
                        <Row style={{backgroundColor:'#c5c6c7'}}>
                            <Col span={24}>
                              <Box props={{ name: 'Vegatables', styles: { borderBottom: '1px solid black' } }} />
                            </Col>
                          </Row>
                            <div>
                                {listGroupNew.filter(item => item.type === 2).map((item, idx) => (
                                    <Box key={idx} props={{ name: item.name, styles: { border: '1px solid black', margin:'15px' } }} 
                                      onClickAction={() => onClickActionSwap("Remove", item, ETypeFruitVegetable.Vegetable)} />
                                ))}
                            </div>
                        </Col>
                    </Column>
                </Col>
            </Row>
        </div>
    );
}


interface IFruitVegetable {
  name: string;
  type: ETypeFruitVegetable;
}

enum ETypeFruitVegetable {
  Fruit = 1,
  Vegetable = 2,
}

export default Assignment1Page;
