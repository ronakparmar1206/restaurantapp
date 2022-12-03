import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useDispatch, useSelector } from "react-redux";
import { immerable } from "immer";

const RowContainer = ({ flag, data, scrollValue, setScrollValue }) => {
  // console.log(data);
  const [noOfItem, setnoOfItem] = useState(1)
  const [updated, setUpdated] = useState([])
  const cart = useSelector((state) => state.authentication.cart);
  console.log(cart);

  const dispatch = useDispatch();
  const rowContainer = useRef();
  useEffect(() => {
    console.log("123");
    rowContainer.current.scrollLeft += scrollValue;
    // setScrollValue(0);
  }, [scrollValue]);
  // console.log("kl")
  const addToCart = (item) => {
    // setnoOfItem((prevItem)=>prevItem+1)
  
    // console.log("dfg",updated);
    // console.log(item);
    let updatedItem
   let quantity=updated.find((ele)=>ele.id===item.id)
   if(quantity){
   updatedItem= {...item,...{qty:item.qty+1}}
  console.log("index", updated.indexOf(quantity))
  let abc=[...updated]
abc[updated.indexOf(quantity)]=updatedItem
   setUpdated(abc)
   }else{
    setUpdated([...updated,item])
   }
   
    localStorage.setItem("cartItems", JSON.stringify(item));
  };
  useEffect(() => {
   if(updated.length){
    dispatch({
      type: "ADD_CART",
      payload: updated,
      
      
    })
   }
  
    
  }, [updated.length])
  

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageUrl}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => addToCart(item)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;