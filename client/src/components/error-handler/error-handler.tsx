import React from 'react'

export default function ErrorHandler(): JSX.Element {
    return (
        <div className="error-container">
            <div className="error-container column">
                <strong>
                    <h2>OOPS...</h2>
                </strong>
                <span className="error-container column-message">
                    Something went wrong
                </span>
                <span className="error-container column-message">
                    On our way to fix this
                </span>
            </div>
        </div>
    )
}
