"use client"

import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import { DndContext } from "@/context/DndContext";
import Image from 'next/image';
import myImage from '../../public/send.png'; // Adjust the path as necessary


interface Component {
    id: number;
    name: string;
    displayName: string;
    [key: string]: any; // This allows for additional fields
}
let typedef: string = 'string'; // Define typedef as a string variable

interface Cards {
    id: number;
    title: string;
    hotel: any;
    components: {
        id: number;
        name: string;
        displayName: string;
    }[];
}
const DndExample = ({ CardsData, setCardsData,setDirId }: { CardsData: Cards[]; setCardsData: (cards: Cards[]) => void;  setDirId: React.Dispatch<React.SetStateAction<number>>; // More accurate type for setDirId
}) => {
    // const cardsData= CardsData ;
        // const [data, setData] = useState<Cards[] | []>([])
        console.log({CardsData})
        const onDragEnd = (result: DropResult) => {
            const { source, destination } = result;
            if (!destination) return;
            if (source.droppableId !== destination.droppableId) {
                const newData = [...JSON.parse(JSON.stringify(CardsData))];//shallow copy concept
                const oldDroppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
                const newDroppableIndex = newData.findIndex(x => x.id == destination.droppableId.split("droppable")[1])
                const [item] = newData[oldDroppableIndex].components.splice(source.index, 1);
                newData[newDroppableIndex].components.splice(destination.index, 0, item);
                console.log(newData)
                setCardsData([...newData]);
            } else {
                const newData = [...JSON.parse(JSON.stringify(CardsData))];//shallow copy concept
                const droppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
                const [item] = newData[droppableIndex].components.splice(source.index, 1);
                newData[droppableIndex].components.splice(destination.index, 0, item);
                setCardsData([...newData]);
                console.log(newData)
            }
        };
        // useEffect(() => {
        //     setCardsData(CardsData)
            
        // }, [CardsData])
        if (!CardsData.length) {
            return <LoadingSkeleton />
        }
    return (
        <DndContext onDragEnd={onDragEnd}>
    <h1 className="text-center mt-12 mb-3 font-bold text-[25px] ">Plan Arena</h1>
    <div className="flex gap-4 justify-between my-8 mx-4 flex-wrap overflow-y-auto">      
                {
                    CardsData.map((val, index) => {
                        return (

                            <Droppable key={index} droppableId={`droppable${index}`}>
                                {
                                    (provided) => (
                                        <div className="p-5 w-[250px] w-full bg-white overflow-y-auto  border-gray-400 border border-dashed"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2>
                                            <button 
                                                onClick={() => setDirId(val?.id)} 
                                                className="bg-grey-400 hover:bg-grey text-black font-bold py-2 px-4 transition duration-300"
                                                >
<div className="flex items-center border border-gray-300 hover:bg-gray-200 p-2 rounded transition duration-300">
    <p className="mr-2">Path Finder</p>
    <Image src={myImage} alt="My Image" width={25} height={20} />
</div>
                                                </button>            
                                            <div className="bg-gray-200 mx-1 px-4 py-3 my-3">
                                                                    {typeof val.hotel === 'string' ? val.hotel : val.hotel?.displayName || val.hotel?.name}
                                                                    </div>

                                            {
                                                val.components?.map((component, index) => (
                                                    <Draggable key={component.id} draggableId={component.id?.toString()} index={index}>
                                                        {
                                                            (provided) => (
                                                                <div className="bg-gray-200 mx-1 px-4 py-3 my-3"
                                                                    {...provided.dragHandleProps}
                                                                    {...provided.draggableProps}
                                                                    ref={provided.innerRef}
                                                                >{component.name || component?.displayName }</div>
                                                            )
                                                        }
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )
                                }

                            </Droppable>
                        )
                    })
                }


            </div>
        </DndContext>
    )
};

export default DndExample;