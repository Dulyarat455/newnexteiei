import { MongoClient, ServerApiVersion  } from 'mongodb';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256'
import jwt from 'jsonwebtoken';


export default  async  function gettransactionsfillter (req,res)  {

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

    let  trans_type  = parseInt (req.query?.trans_type)
    let topic_name = req.query?.topic_name || null
    let dateIn = req.query?.dateIn || null
    let dateOut = req.query?.dateOut || null



    console.log("tran_type = ",trans_type)

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
      }



      try{
       
        await client.connect();
        let tran  = client.db('income_expenses').collection('transactions');
        let query = [] ;

        query.push({'$match': {"account_id":account_id}})
        
        if(trans_type === 1 || trans_type === 0){
          
          query.push({'$match': {"trans_type":trans_type}})
        }
        if(topic_name !== "" && topic_name !== null ){

          // use for word in collection "topic_name"
          query.push({'$match': {"topic_name":{ $regex: topic_name }}})

          // use for get topic_name which beginning with word
          // query.push({'$match': { topic_name: { $regex: new RegExp("^" + topic_name) }}})

          
        }
        if(dateIn && dateOut){
          query.push( {
            '$match': {
              
                
                  'date': {
                    $gte: dateIn,
                    $lte: dateOut
                  }
                
                
                }
          })
        }

        const getTran = await tran.aggregate(query).toArray()
     
      

        return( res.status(200).json({getTran: getTran, message: 'Transactions query success', success: true}))


    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
      }



}