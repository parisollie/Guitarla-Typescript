//Vid 97
//Vid 94, definimos las carcatertisticas de la guitarra 
export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}
//Vid 99 hacemos herencia 
export type CartItem = Guitar & {
    quantity: number
}

// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }
// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }

