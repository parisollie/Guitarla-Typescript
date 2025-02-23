//Vid 60
import { useState, useEffect, useMemo } from "react"
import { db } from '../data/db'
//V-98,paso 3.8
import type { Guitar, CartItem } from '../types'

//Vid 87
export const useCart = () => {

    //Vid 83
    //V-98,paso 3.8, le aggregamos el (: CartItem[])
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        //Si hay algo en local Storage lo convertimos en carrito.
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //Vid 63, db es nuestro archivo local
    const [data] = useState(db)
    //Vid 68, lo inicializamos vacio por ser el carrito
    const [cart, setCart] = useState(initialCart)
    //console.log(data)

    //Vid 79
    const MAX_ITEMS = 5
    //Vid 80
    const MIN_ITEMS = 1

    //Vid 82,local Storage-----EN REACT SON ASINCRONOS 
    //Otras funciones se mandan cuando el state aun no sido llamado

    useEffect(() => {
        //Pasamos nuestro carrito a Json 
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    //V-101,Paso 3.10,tendrá el tipo de guitar (item : Guitar)
    function addToCart(item: Guitar) {
        //console.log('agregando...')
        //Vid 170
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) {
            //Vid 80
            //Si al apretar el boton del carrito , ya no llega a mas.
            if (cart[itemExists].quantity >= MAX_ITEMS) return


            //console.log('Ya existe')
            //Vid 72,Hacemos una copia del carrito
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            //Siempre debemos setear
            setCart(updateCart)

        } else {
            //Vid 69
            console.log('No existe...agregando')
            //V-101,Paso 3.11 especificamos que sera del tipo cart item ,hacemos una copia y le pasamos la cantidad.
            const newItem: CartItem = { ...item, quantity: 1 }
            //y seteamos el carrito de tipo caritem.
            setCart([...cart, newItem])
        }

    }

    //Vid 78
    //V-103 id : Guitar['id'],paso 31.11 solo quiero usar el id
    function removeFromCart(id: Guitar['id']) {
        console.log('Eliminando...', id)
        //filtrame las guitarras diferentes al id que te estoy dando.
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    //Vid 79
    function increaseQuantity(id: Guitar['id']) {
        //.map, nos genera nueva nueva copia 
        const updateCart = cart.map(item => {
            //si el id es igual al id actual le retorno las mismas cantidades
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            //para que el resto de los elementos fuera los mantenga
            return item
        })
        setCart(updateCart)
    }

    //Vid 80

    function decreaseQuantity(id: Guitar['id']) {
        //.map, nos genera nueva nueva copia 
        const updateCart = cart.map(item => {
            //si el id es igual al id actual le retorno las mismas cantidades
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            //para que el resto de los elementos fuera los mantenga
            return item
        })
        setCart(updateCart)
    }

    //Vid 81
    //Nuestra funcion de limpiar el carrito.
    function clearCart() {
        setCart([])
    }

    //Vid 90

    //Vid 75,State Derivado, es derivado porque depende de este state cart.length
    //Vid 77 Use Memo,renderiza cuando el carrito cambie
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    //Vid 76,ponemos 0 ,porque suamremos apartir de ahí
    //const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0),[cart])
    //Vid 90
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])



    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}