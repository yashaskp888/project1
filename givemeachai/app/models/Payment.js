
import mongoose from "mongoose";
import { createDynamicTrackingState } from "next/dist/server/app-render/dynamic-rendering";
const {Schema,model} = mongoose

const PaymentSchema = new Schema({
    name:{type:String, required:true},
    to_user:{type:String, required:true},
    oid:{type:String, required:true},
    amount:{type:Number, required:true},
    message:{type:String},
    createAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    done:{type:Boolean, default:false}
})


export default mongoose.models?.Payment || model('Payment',PaymentSchema)