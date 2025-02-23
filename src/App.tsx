import { useReducer, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { cartReducer, initialState } from "./reducers/cart-reducer"



function App() {

    //V-171 ,paso 4.5, importamos el reducer y el initial state
    const [state, dispatch] = useReducer(cartReducer, initialState)

    //V-181,paso 4.28,
    useEffect(() => {
        //Pasamos nuestro carrito a Json 
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])


    return (
        <>
            <Header
                //V-176,paso 4.12
                cart={state.cart}
                //V-177,paso 4.18
                dispatch={dispatch}

            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {/*V-172,Paso 4.6, simplificamos pasos con el reducer ahora lo ponemos
                    state.data */}
                    {state.data.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            //V-173,paso 4.7 ponemos el dispatch
                            dispatch={dispatch}
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
