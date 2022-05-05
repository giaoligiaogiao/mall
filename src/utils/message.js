import {Message} from 'element-ui'

const both=(res)=>{
    if(res.code==1)
    Message.success(res.message)
    else {
        Message.error(res.message)
    }
}
const error=(msg)=>{
    Message.error(msg)
}
const success=(msg)=>{
    Message.success(msg)
}

export const PushMessage={both,success,error}