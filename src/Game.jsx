//this modified game from youtube chanel Web Dev Cody
//thanks for that content
import "./App.css";
import { useEffect, useState } from "react";

export function Game() {
    //using list of object to store state of each cell
    const [grid, setGrid] = useState([
        [{cell:0, rev:false}, {cell:3, rev:false}, {cell:5, rev:false}, {cell:1, rev:false},],
        [{cell:1, rev:false}, {cell:2, rev:false}, {cell:2, rev:false}, {cell:4, rev:false},],
        [{cell:4, rev:false}, {cell:3, rev:false}, {cell:5, rev:false}, {cell:0, rev:false},],
    ]);

    //using this state to track two last cell that have been clicked
    const [revealedCells, setRevealedCells] = useState([]);

    //this function to change cell that has false state and update revealed cell
    function handleCardClicked(rowIndex, cellIndex) {

        if(grid[rowIndex][cellIndex].rev === false ) {
            setGrid((prev) => {
                prev[rowIndex][cellIndex] = {...prev[rowIndex][cellIndex], rev:true};
                return [...prev];
            });
            setRevealedCells((prev) => [...prev, [rowIndex, cellIndex]]);
        }
     }
   
    //using hook to maintain the main logic of this game
    // to match or to come back to its prior state if false
    useEffect(() => {
        var interval = null;
        if(revealedCells.length > 1) {
            const [a, b] = [...revealedCells];
            if(grid[a?.[0]][a?.[1]].cell !==  grid[b?.[0]][b?.[1]].cell) {
                interval = setInterval(() => {
                    setGrid((prev) => {
                        prev[a?.[0]][a?.[1]] = {...prev[a?.[0]][a?.[1]], rev:false}; 
                        prev[b?.[0]][b?.[1]] = {...prev[b?.[0]][b?.[1]], rev:false}; 
                        return [...prev];
                    });
                }, 1000);
            }
            //only save two last clicked cell
            setRevealedCells(prev => []);
        }
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
   }, [grid]); 
    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map(({cell, rev}, cellIndex) => (
                        <div 
                        className="card" 
                        key={cellIndex}
                        onClick={() => handleCardClicked(rowIndex, cellIndex)}
                        >
                            {!rev ? " " : cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}