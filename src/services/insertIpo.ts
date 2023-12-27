import { connection } from '../config/database';

const insertIpo = async (params: JSON) => {
    const postdb = await connection.connect();
    const insertSql = "insert into ipo_schedule values ?";
  try {        
      return new Promise((resolve, rejects)=>{
       
        postdb.query(insertSql, params, (err, res) => {
            if(err) {
                rejects(err)
            }
            resolve(res)
        })
      })
  } catch (err) {
      throw err;
  } finally {
      postdb.release();
  }
}

export default insertIpo;