// eslint-disable-next-line
import React, { useState } from 'react';

export default class Grid extends React.Component{
    constructor(props){
        super(props);
        this.drop = this.drop.bind(this)
    }

    allowDrop(event){
        event.preventDefault();
    }

    // on drop
    drop(event){
        event.preventDefault();

        // get the data sent on drag
        let shipSize = event.dataTransfer.getData("ShipSize");
        let currentY = event.dataTransfer.getData("CurrentY");
        let x = event.target.dataset.x;
        let y = event.target.dataset.y - currentY + 1;

        // change board according to the data provided
        // from the dragged ship
        let result = this.props.changeBoard(shipSize, x, y);

        // if board was successfully changed
        // then remove the ship so it cant be added again
        if (result){
            this.props.changeShips();
            return;

        }
        else {
            return;
        }
    }

    // functions to change the row and column
    // data attribute of the row and column respectively
    changeRow = (event) => {
        event.target.parentElement.dataset.row = event.target.dataset.x;
    }
    
    changeColumn = (event) => {
        event.target.parentElement.dataset.column = event.target.dataset.y;
    }

    changeCoords = (event) => {
        this.changeRow(event);
        this.changeColumn(event);
    }

    gamePlayer = (event) => {
        let x = event.target.dataset.x;
        let y = event.target.dataset.y;
        this.props.playGame(x, y);
    }

    render(){
        return(
            <div
                className='grid'
                id={this.props.class}
            >
            {
            this.props.board.map((current, xIndex) => {
                return (
                    <div
                        key={xIndex}
                        onDragOver={this.allowDrop}
                        onDrop={this.drop}
                        className="grid-row"
                        data-row={0}
                        data-column={0}
                    >
                        {current.map((current, curIndex) => {
                            return(
                                <span
                                    key={curIndex}
                                    data-x = {xIndex}
                                    data-y = {curIndex}
                                    className={
                                        `grid-row-item 
                                        ${(current.match('ship') && this.props.class !== "computer" )? 'hasShip': null}
                                        ${(current.match('ship') && this.props.class === 'computer') ? 'cShip' : '' }
                                        ${current.match('x') ? "ship" : ''}
                                        ${current.match('.') ? "noShip" : ''}
                                        `}
                                    onMouseOver={!this.props.playable ? this.changeCoords : null}
                                    onClick={(this.props.class === "computer") ? this.gamePlayer : null}
                                    >{ current.match('ship') ? ' ' : current }
                                </span>
                            )
                        })}
                    </div>
                )
            })}
            </div>
        )
    }
}