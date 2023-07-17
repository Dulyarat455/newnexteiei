import { MongoClient, ServerApiVersion  } from 'mongodb';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256'
import jwt from 'jsonwebtoken';

export default  async  function deletetran (req,res)  {



    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );


    
    let  tran_id  = req.body?.tran_id
    const test = req.body?.test || {}

    const token = req.headers["auth-token"];
    const decoded =   jwt.decode(token)
    const { account_id } = decoded || {};



 // check method
//  if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed', success: false });
//   }

 try{
       
        await client.connect();
        const tran  = client.db('income_expenses').collection('transactions');
        console.log(tran_id)
       


     
        const result  = await  tran.deleteOne({ tran_id: tran_id,account_id:account_id}) 

       

        if(result){
            return res.status(200).json({ message: 'Delete transaction success', success: true });
        }
        else {
            return res.status(400).json({ message: 'Delete transaction invalid', success: false });
        }

        

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } 
      finally {
        await client.close();
      }


}