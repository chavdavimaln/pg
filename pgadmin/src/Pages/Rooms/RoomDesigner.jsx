import react from 'react';
import RoomCanvas from '../../Components/Rooms/RoomCanvas';
import RoomToolbar from '../../Components/Rooms/RoomToolbar';

const RoomDesigner = () => {
    const [beds, setBeds] = react.useState([
        { id: 1, x: 20, y: 20 },
        { id: 2, x: 200, y: 50 },
    ]);

    const addBed = () => {
        if (beds.length < 5) return;
        const newBed = {
            id: Date.now(),
            // x: 20 + beds.length * 180,
            // y: 20
            x: 50,
            y: 50
        };
        setBeds([...beds, newBed]);
    }

    const removeBed = () => {
        if (beds.length <= 2) return;
        setBeds(beds.slice(0, beds.length - 1));
    }

    const updateBedPosition = (id, x, y) => {
        setBeds(beds.map(bed => bed.id === id ? { ...bed, x, y } : bed));
    }
    const saveLayout = () => {
        // const layoutData = {
        //     roomName: "Room A101",
        //     beds: beds
        // };
        // console.log("Saved Layout:", layoutData);
        localStorage.setItem("roomLayout", JSON.stringify(beds));
        alert("Layout saved");
    }

    return (    
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Room Designer</h1>
            <RoomToolbar addBed={addBed} removeBed={removeBed} bedCount={beds.length} />
            <RoomCanvas beds={beds} updateBedPosition={updateBedPosition} />
            <button onClick={saveLayout} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save Layout
            </button>
        </div>
    );
};

export default RoomDesigner;