
/**
 * storage 封装
 */
const storage_key="mall";

export default{
    setItem(key,value,obj_name){
        if(obj_name){
            let obj=this.getItem(obj_name);
            obj[key]=value;
            this.setItem(obj_name,obj);
        }else{
            //只有一层时，如{username:123}
            let session_mall=this.getStorage();
            session_mall[key]=value;
            window.sessionStorage.setItem(storage_key,JSON.stringify(session_mall));
            
        }

    },
    //获取某一个对象下的属性 {user:{username:123}}
    getItem(key,obj_name){
        //获取整个mall
        let session_mall=this.getStorage();
        //如果有对象名
        if(obj_name){
            //根据对象名递归获取对象
            let obj=this.getItem(obj_name);
            if(obj){
                return obj[key];
            }
        }
            //如果没有对象直接获取key对应的值，如{username:123}
        return session_mall[key];  
    },
    getStorage(){
        return JSON.parse(window.sessionStorage.getItem(storage_key)) || '{}';
    },
    clear(key,obj_name){
        let session_mall=this.getStorage();//mall键对应的值
        if(obj_name){
            if(!session_mall[obj_name]) return;
            delete session_mall[obj_name][key];
        }else{
            delete session_mall[key];

        }
        window.sessionStorage.setItem(storage_key,JSON.stringify(session_mall));

    }
}
