import type { Guitar } from '../types'

//V-96,Paso 3.7,si el type es de un componente se deja en la misma página.
type GuitarProps = {

    //V-95,Paso 3.5, le diremos que guiarra tendrá el tipo de guitarra.
    guitar: Guitar,
    //V-95,Paso 3.6,El item que voy asignar será de guitarra y no retorna nada.
    addToCart: (item: Guitar) => void
}

//Paso 3.8, le asignamos los props
export default function Guitar({ guitar, addToCart }: GuitarProps) {

    //V-66
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
                    //Vid 69
                    onClick={() => addToCart(guitar)}

                >Agregar al Carrito</button>
            </div>
        </div>
    )
}