import React from 'react';

const ProgressBar = ({ label, percentage, fillCharacter = '█', unfilledCharacter = '░' }) => {
    const barHeight = 20; // Adjusted bar height

    // Calculate the width of the filled part of the progress bar
    const filledWidth = percentage + "%";

    return (
        <div style={{ width: '100%', maxWidth: '300px' }}> {/* Adjust max-width as needed */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{label}</span>
                <div style={{ flex: '1', marginLeft: '8px', marginRight: '8px', width: '100%' }}>
                    <svg width="100%" height={barHeight}>
                        {/* Filled part of the bar */}
                        <text x="0" y={barHeight / 2} fontSize={barHeight} fontFamily="monospace" fill="#333" alignmentBaseline="middle">
                            {fillCharacter.repeat(Math.floor(percentage))}
                        </text>

                        {/* Unfilled part of the bar */}
                        <text x={filledWidth} y={barHeight / 2} fontSize={barHeight} fontFamily="monospace" fill="#ccc" alignmentBaseline="middle">
                            {unfilledCharacter.repeat(Math.ceil(100 - percentage))}
                        </text>
                    </svg>
                </div>
                <span>{percentage}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
