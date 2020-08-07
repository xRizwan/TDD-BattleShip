import React from 'react';

export default class BattleShip extends React.Component{
    // eslint-disable-next-line
    constructor(props){
        super(props)
    }

    // when dragged send data
    handleDrag = (event) => {
        event.dataTransfer.setData("ShipSize", event.target.dataset.size);
        event.dataTransfer.setData("CurrentY", event.target.dataset.current);
        this.props.changeName(event.target.dataset.name)
    }
    changeData = (event) => {
        event.target.parentElement.dataset.current = event.target.dataset.spot;
    }

    render(){
        return(
            this.props.shipsData.map((current, currentIndex) => {
                return(
                    <div
                        key={currentIndex}
                        className="Ships"
                        draggable={true}
                        onDragStart={this.handleDrag}
                        data-size = {current[0].length}
                        data-name = {`${current[1]}`}
                        data-current = {0}
                    >
                        {current[0].map((current, currentIndex) => {
                            return (
                            <span
                                key={currentIndex}
                                data-spot = {current}
                                className="ship-item"
                                onMouseOver={this.changeData}
                                >
                            </span>
                            )
                        })}
                    </div>
                )
            })
        )
    }
}