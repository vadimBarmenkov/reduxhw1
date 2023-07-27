import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const MainPage = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [filterInput, setFilterInput] = useState('');
    const [productList, setProductList] = useState([]);
    const [changeIndex, setChangeIndex] = useState();
    const [test, setTest] = useState(true)
    const dispatch = useDispatch();
    const viewProductList = useSelector( state => state.add.products)

    function formHandler(e){
        e.preventDefault();
    }

    const saveBtn = () => {
        if (test){
            dispatch({type: 'SET_PRODUCT', payload: {name: productName, price: productPrice, index: viewProductList.length}});
        }else {
            dispatch({type: "CHANGE_PRODUCT", payload: {name: productName, price: productPrice, index: changeIndex}});
            setProductName("");
            setProductPrice(0);
            setTest(true);
        }
    }


    useEffect(() => {
        console.log("viewProductList: " + viewProductList);
        if (filterInput == ''){
            setProductList(viewProductList);
        }else{
            setProductList(viewProductList.filter(product => product.name.includes(filterInput)));
        }
    }, [viewProductList])

    const productFilter = (event) => {
        setFilterInput(event.target.value)
        if (event.target.value == ''){
            setProductList(viewProductList);
        }else{
            setProductList(viewProductList.filter(product => product.name.includes(event.target.value)));
        }
    }

    const remove = (index) => {
        dispatch({type: 'DELETE_PRODUCT', payload: index})
    }

    const cancelBtn = () => {
        setProductName("");
        setProductPrice(0);
        setTest(true);
    }

    const changeBtn = (index) => {
        setProductName(viewProductList[index].name);
        setProductPrice(viewProductList[index].price);
        console.log("product name: " + viewProductList[index].name +
        "  product price" + viewProductList[index].price);

        setTest(false);
        setChangeIndex(index);
    }

    return(
        <div>
            <form onSubmit={formHandler}>
                <input type={"string"} value={productName} onChange={event => setProductName(event.target.value)}/>
                <input type={"number"} value={productPrice} onChange={event => setProductPrice(Number(event.target.value))}/>
                <button onClick={saveBtn}>Save</button>
                <button onClick={cancelBtn}>Cancel</button>
                <input type={"string"} value={filterInput} onChange={event => productFilter(event)}/>
            </form>
            <div>
                {console.log("productList: " + productList)}
                {productList.map((element, index) =>
                    <ul key={index}>{element.name}  {element.price}
                        <button onClick={() => changeBtn(element.index)}>change</button>
                        <button onClick={() => remove(element.index)}>del</button></ul>)}
            </div>
        </div>)
}