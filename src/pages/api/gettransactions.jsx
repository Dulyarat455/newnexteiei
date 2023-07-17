import { MongoClient, ServerApiVersion  } from 'mongodb';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256'
import jwt from 'jsonwebtoken';



export default  async  function gettransactions (req,res)  {


    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );


    const token = req.headers["auth-token"];
    const decoded =   jwt.decode(token)
    const { account_id } = decoded || {};
    

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
      }


    try{
       
        await client.connect();
        let tran  = client.db('income_expenses').collection('transactions');
     
       const getTran = await tran.find({"account_id": account_id},{projection:{"_id":0}}).toArray()


         console.log(decoded)


        return( res.status(200).json({getTran: getTran, message: 'Transactions  success', success: true}))


    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
      }



}