import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name}, you have sumbitted `}
            </div>
            <div className='white f1'>
                {`${entries}`}
                { entries > 1 
                ? <span className='white f3'> links.</span>
                : <span className='white f3'> link.</span> }         
            </div> 
        </div>
    );
}

export default Rank;