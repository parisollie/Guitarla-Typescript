/*V-94,paso 3.2 definimos las carcatertisticas de la guitarra 
V-97, Paso 3.7,creamos el type de  guitarra para compartilo en los archivos.*/
export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}
//V-99,paso 3.9 hacemos herencia para heredar todos los atributos solo que le agregaremos uno más
export type CartItem = Guitar & {
    quantity: number
}


