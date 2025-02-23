/* Vid 55 ,Importamos nuestro componente */
import Guitar from "./components/Guitar"
import Heaader from "./components/Header"
//Vid 87
import { useCart } from "./hooks/useCart"

function App() {

    //Vid 89
    const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart()

    return (
        <>
            <Heaader
                //Vid 73
                cart={cart}
                removeFromCart={removeFromCart}
                //Vid 79
                increaseQuantity={increaseQuantity}
                //Vid 80
                decreaseQuantity={decreaseQuantity}
                //Vid 81
                clearCart={clearCart}
                //Vid 90
                isEmpty={isEmpty}
                cartTotal={cartTotal}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">

                    {data.map((guitar) => (
                        <Guitar
                            //Vid 66 ,siempre becesitan una key,si tenemos una base podemos ponerle el id.
                            key={guitar.id}
                            guitar={guitar}
                            //Vid 68
                            addToCart={addToCart}

                        />
                    )
                    )}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
