/**
 * @description 公共方法
 * @author simple
 * @date 2018/10/30 10:01
 */
import axios from 'axios'
import Qs from 'qs'
export function fetch (url, param) {
  //参数
  param = Qs.stringify(param);
  return new Promise((resolve, reject) => {
    axios.post(url,param).then(response=>{
      console.log(response)
      resolve(response.data);
    },err => {
      reject(err);
    }).catch((error) => {
      reject(error);
    })
  })
}

