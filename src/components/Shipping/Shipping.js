import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Shipping.css'

const Shipping = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {user} = useAuth();
    const onSubmit = data => console.log(data);
    const history = useHistory();

    const handlePushPlaceOrder = () => {
        history.push('/placeorder')
    }

    return (
        <div>
            <form className='shipping-form' onSubmit={handleSubmit(onSubmit)}>
     
             <input defaultValue={user.displayName}  {...register("name")} />
             <input defaultValue={user.email} {...register("email", { required: true })} />
             {errors.email && <span className='error'>This field is required</span>}
             <input placeholder='Your address' defaultValue="" {...register("address")} />
             <input placeholder='Your City' defaultValue="" {...register("city")} />
             <input placeholder='Your PhoneNumber' defaultValue="" {...register("phoneNumber")} />
             <input onClick={handlePushPlaceOrder} className='btn-regular' type="submit" />
           </form>
        </div>
    );
};

export default Shipping;