export const StoreData = function GetData({set}){
    async function me(){
    var data =  await fetch("https://fakestoreapi.com/products")
    data = await data.json()
    set(data)
    console.log(data)
    }
    me();
}