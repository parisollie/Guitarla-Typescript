import type { Guitar } from '../types'
import { Dispatch } from 'react'
import type { CartActions } from '../reducers/cart-reducer'

//Vid 96, si el type es de un compeonente se deja en la misma página.
type GuitarProps = {

    //Vid 95, tendra el tipo de guitarra
    guitar: Guitar,

    //V-173,paso 4.8, le pasamos el dispatch
    dispatch: Dispatch<CartActions>
}

//Vid 58, creando otro componente
//Vid 65,props
export default function Guitar({ guitar, dispatch }: GuitarProps) {

    //console.log(guitar)
    //Vid 66
    const { name, image, description, price } = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">{price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    //V-173,paso 4.9, le ponemos el dispatch que usamos add-to-cart
                    onClick={() => dispatch({ type: 'add-to-cart', payload: { item: guitar } })}

                >Agregar al Carrito</button>
            </div>
        </div>
    )
}