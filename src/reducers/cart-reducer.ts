import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

//-----------------------------------REDUCER ------------------------------------------------------

//V-168, paso 4.0, y le ponemos sus payload
export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'decrease-quantity', payload: { id: Guitar['id'] } } |
    { type: 'increase-quantity', payload: { id: Guitar['id'] } } |
    { type: 'clear-cart' }

//V-169,PASO 4.1 creamos el state del carrito
export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

//V-181, paso 4.27
const initialCart = (): CartItem[] => {
    //Pasamos nuestro carrito a Json 
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

//Paso 4.2
export const initialState: CartState = {
    data: db,
    //V-181 
    cart: initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

//V-170,Paso 4.3, es para tener autocompletado en el reducer.
export const cartReducer = (
    //Nuestro state es al state inicial.
    state: CartState = initialState,
    action: CartActions
) => {

    //------------------------Paso 4.4,ponemos todas nuestras acciones-----------------------

    if (action.type === "add-to-cart") {
        //V-174,Paso 4.5 Le ponemos el payload action.payload.item.id
        //V-175,Paso 4.10 le cambiamos el find por el findindex, el find me retorna
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        //V-174,paso 4.6, le damos un valor inicial en arreglo vacio
        let updatedCart: CartItem[] = []
        if (itemExists) {
            //paso 4.7, le mandamos el updatedCar
            updatedCart = state.cart.map(item => {
                //paso 4.11,es el elemento que el usuario agrega repetido
                if (item.id === action.payload.item.id) {
                    //Si quiere agregar mas elementos hasta 5
                    if (item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        //V-175, mantenemos lo que esta en el carrito.
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            console.log('No existe...agregando')
            //Paso 4.9, le agregamos , ...action.payload.item
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            //Tomamos una copia del carrito y le pasamos el nuevo elemento.
            updatedCart = [...state.cart, newItem]
        }

        return {
            //paso 4.8 ahora lo hara el reducer,Copia del state
            ...state,
            cart: updatedCart
        }
    }

    //V-177,paso 4.17
    if (action.type === 'remove-from-cart') {
        //Variable para poder eliminar
        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    }


    //V-178,paso 4.21
    if (action.type === 'increase-quantity') {
        //.map, nos genera nueva nueva copia 
        const cart = state.cart.map(item => {
            //si el id es igual al id actual le retorno las mismas cantidades
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            //para que el resto de los elementos fuera los mantenga
            return item
        })

        return {
            ...state,
            cart
        }
    }


    /*V-179,paso 4.23
    .map, nos genera nueva nueva copia */
    if (action.type === 'decrease-quantity') {
        const cart = state.cart.map(item => {
            //si el id es igual al id actual le retorno las mismas cantidades
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            //para que el resto de los elementos fuera los mantenga
            return item
        })

        return {
            ...state,
            //V-179 
            cart
        }
    }

    //V-180,paso 4.25
    if (action.type === 'clear-cart') {
        return {
            ...state,
            //el carrito debe ser un arreglo vacío
            cart: []
        }
    }

    return state
}