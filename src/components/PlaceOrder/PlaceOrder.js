import React from 'react';
import { useHistory } from 'react-router-dom';
import img from '../../images/giphy.gif';

const PlaceOrder = () => {
    // const history = useHistory();

    // const handlePushPlaceOrder = () => {
    //     history.push('/placeorder')
    // }
    return (
        <div>
            <img src= {img} alt="" />
        </div>
    );
};

export default PlaceOrder;