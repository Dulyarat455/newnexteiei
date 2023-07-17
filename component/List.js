import React from "react";
import { useState,useEffect, useRef } from "react";
import { TrashIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/outline';
import Popup from "./Popup";
import Popedit from "./Popedit";



export default function List(props) {
    const { items } = props ;
    console.log("component = ",items)

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopeditOpen, setPopeditOpen] = useState(false);
    const [itemNumber, setItemNumber] = useState();
    const [itemName, setItemName] = useState('');
    const [tranId,setTranId] = useState('');
    const [token, setToken] = useState('');

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
       
      
      }, []);

    const openPopup = () => {
      setPopupOpen(true);
    
    };
  
    const closePopup = () => {
      setPopupOpen(false);
    };

    const openPopedit = () =>{
        setPopeditOpen(true)
    }

    const closePopedit = () => {
        setPopeditOpen(false)
    }


    

   

    let type
    console.log(itemName)
    console.log(itemNumber)


    return (       
       
        

           <div class="relative overflow-x-auto pl-10 pr-10">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-20 ">
                            <tr >
                            <th scope="col" class="px-6 py-3">
                                    Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Topic name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Balance
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Transaction type
                                </th>
                              
                            </tr>
                            
                            
                        </thead>
                       
                       

                       { items.length  && (<tbody>
                       
                        {items.map ((item,index) => {
                                 {console.log(item.topic_name)
                                if(item.trans_type === 1){
                                    type = "expenses"
                                }
                                else if(item.trans_type === 0)
                                    type ="income"
                                }
                                 return (
                                
                                
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                     <td class="px-6 py-4">
                                        {index+1}
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.topic_name}
                                        
                                    </th>
                                   
                                    <td class="px-6 py-4">
                                        {item.balance}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.date}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.description}
                                    </td>
                                    <td class="px-6 py-4 ">
                                        
                                        {type}
                                    </td>
                                    <td>
                                        <button  type="submit" onClick={() => { setItemNumber(index+1)
                                            setItemName(item.topic_name)  
                                            setTranId(item.tran_id)  
                                            openPopup() }}>
                                        {/* <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
                                        </svg> */}
                             
                                             <TrashIcon className="h-6 w-6 text-black" />
                                         
                                        </button>
                                     
                                   </td>
                                    <td>
                                        <button  type="submit" onClick={() => {
                                            setItemNumber(index+1)
                                            setItemName(item.topic_name)  
                                            setTranId(item.tran_id)  
                                            openPopedit()
                                        }} >
                                            <PencilIcon className="w-6 h-6 text-gray-800 dark:text-white" />
                                        </button>
                                    </td>
                                    
                                </tr>)
                               
                             }
                          )
                        }
                           
                          
                        </tbody>)
                          
                        }
                        
                       
                    </table>
                    <Popup  tranId = {tranId} token={token} itemNumber={itemNumber} itemName={itemName} isOpen={isPopupOpen} onClose={closePopup} />
                    <Popedit  tranId = {tranId} token={token} itemNumber={itemNumber} itemName={itemName} isOpen={isPopeditOpen} onClose={closePopedit} />
                </div>
           
        )

}