import React from 'react';


const CurrencyFormat = ({ price }) => {
    const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (

        <span> {formattedPrice}</span>

    );
};

export default CurrencyFormat;