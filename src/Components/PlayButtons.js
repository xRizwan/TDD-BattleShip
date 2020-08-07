import React from 'react';

export default function PlayButtons(props){
    return(
        <div className="main-buttons">
            <button className="button" onClick={props.play}>PlayGame</button>
            <button className="button" onClick={props.restart}>Restart</button>
        </div>
    )
}