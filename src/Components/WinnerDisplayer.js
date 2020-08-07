import React from 'react';

export default function WinnerDisplayer(props){
    return(
        <div className="Winner">
            {(props.winner === '') ? 'none' : (props.winner === 'computer') ?
            "You Lost!" : "You Are The Winner" }
        </div>
    )
}