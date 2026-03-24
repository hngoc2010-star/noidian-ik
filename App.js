import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
StyleSheet,
ScrollView
} from "react-native";
import * as Clipboard from "expo-clipboard";

export default function App() {

const [orders,setOrders]=useState([]);

const [supplier,setSupplier]=useState("");
const [orderDate,setOrderDate]=useState("");
const [deliveryDate,setDeliveryDate]=useState("");
const [qty,setQty]=useState("");
const [type,setType]=useState("");
const [exw,setExw]=useState("");
const [logistics,setLogistics]=useState("");
const [sell,setSell]=useState("");

function format(n){
if(!n) return "";
return Number(n).toLocaleString("en-US");
}

function addOrder(){

const q=Number(qty)||0;
const e=Number(exw)||0;
const l=Number(logistics)||0;
const s=Number(sell)||0;

const totalEXW=q*e;
const sellAmount=q*s;

const profit=sellAmount-totalEXW-l;

const newOrder={
id:Date.now().toString(),
supplier,
orderDate,
deliveryDate,
qty:q,
type,
exw:e,
totalEXW,
logistics:l,
sell:s,
profit
};

setOrders([...orders,newOrder]);

setSupplier("");
setQty("");
setType("");
setExw("");
setLogistics("");
setSell("");

}

async function copyOrders(){

let text="";

orders.forEach(o=>{

text+=`
Order: ${o.orderDate}
Delivery: ${o.deliveryDate}
${o.supplier}
Qty: ${o.qty}
EXW: ${format(o.exw)}
Sell: ${format(o.sell)}
Profit: ${format(o.profit)}

`;

});

await Clipboard.setStringAsync(text);

}

return (

<ScrollView style={styles.container}>

<Text style={styles.title}>PLYWOOD ORDERS</Text>

<TextInput
style={styles.input}
placeholder="Supplier"
value={supplier}
onChangeText={setSupplier}
/>

<TextInput
style={styles.input}
placeholder="Order Date"
value={orderDate}
onChangeText={setOrderDate}
/>

<TextInput
style={styles.input}
placeholder="Delivery Date"
value={deliveryDate}
onChangeText={setDeliveryDate}
/>

<TextInput
style={styles.input}
placeholder="Quantity"
keyboardType="numeric"
value={qty}
onChangeText={setQty}
/>

<TextInput
style={styles.input}
placeholder="Type (12/14/18)"
value={type}
onChangeText={setType}
/>

<TextInput
style={styles.input}
placeholder="EXW price"
keyboardType="numeric"
value={exw}
onChangeText={setExw}
/>

<TextInput
style={styles.input}
placeholder="Logistics"
keyboardType="numeric"
value={logistics}
onChangeText={setLogistics}
/>

<TextInput
style={styles.input}
placeholder="Sell price"
keyboardType="numeric"
value={sell}
onChangeText={setSell}
/>

<TouchableOpacity style={styles.button} onPress={addOrder}>
<Text style={styles.buttonText}>ADD ORDER</Text>
</TouchableOpacity>

<FlatList
data={orders}
keyExtractor={(item)=>item.id}
renderItem={({item})=>(

<View style={styles.row}>

<Text>{item.supplier}</Text>

<Text>Qty:{item.qty}</Text>

<Text>Total:{format(item.totalEXW)}</Text>

<Text
style={{
color:item.profit>0?"blue":"red",
fontWeight:"bold"
}}
>
Profit:{format(item.profit)}
</Text>

</View>

)}
/>

<TouchableOpacity style={styles.copy} onPress={copyOrders}>
<Text style={styles.buttonText}>COPY ZALO</Text>
</TouchableOpacity>

</ScrollView>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
padding:20,
marginTop:40
},

title:{
fontSize:26,
fontWeight:"bold",
marginBottom:15
},

input:{
borderWidth:1,
borderColor:"#ccc",
padding:10,
marginBottom:10,
borderRadius:5
},

button:{
backgroundColor:"#27ae60",
padding:12,
alignItems:"center",
borderRadius:5,
marginBottom:15
},

copy:{
backgroundColor:"#3498db",
padding:12,
alignItems:"center",
borderRadius:5,
marginTop:10
},

buttonText:{
color:"#fff",
fontWeight:"bold"
},

row:{
padding:10,
borderBottomWidth:1,
borderColor:"#ddd"
}

});
