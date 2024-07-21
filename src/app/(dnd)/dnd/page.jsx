import DndExample from "../../../components/DnDExample"


export default function DragDrop({CardsData , setCardsData, setDirId} ) {
  return (
    <div>
      <DndExample CardsData ={CardsData} setCardsData={setCardsData} setDirId = {setDirId}/>
    </div>
  )
}