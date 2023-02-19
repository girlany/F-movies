import React from  'react';


const Button = ({ to }) => {

    return (
        <a href={`/${to}`}>
            <button className="my-button">
                Page {to === '' ? "home" : to}
            </button>
        </a>
    )
}

export default Button;  