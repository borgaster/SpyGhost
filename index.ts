import * as net from 'net';
import { SpyGhost } from './SpyGhost'
let data1 = new Array();
let data2 = new Array();
data1[0] = -95;
data1[1] = 88;
data1[2] = 0;
data1[3] = 0;
data1[4] = 0;
data1[5] = 0;
data1[6] = 0;
data1[7] = ((data1[1] + data1[2] + data1[3] + data1[4] + data1[5] + data1[6]) & 255);
data1[8] = -1;
data2[0] = -95;
data2[1] = 88;
data2[2] = 0;
data2[3] = 0;
data2[4] = 0;
data2[5] = 0;
data2[6] = 0;
data2[7] = 0;
data2[8] = 0;
data2[9] = ((data1[1] + data1[2] + data1[3] + data1[4] + data1[5] + data1[6] + data1[7] + data1[8]) & 255);
data2[10] = -1;

// const socket = net.connect({ host: "192.168.16.188", port: 2001}, () => {
//     console.log('connected');
//     function send() {
//         socket.write( new Buffer(data1));
//         setInterval( () => socket.write( new Buffer(data2)), 1000)
//     }
//     send();
//     setInterval( () => console.log(socket.read()), 3000)
// });
const ghost = new SpyGhost().init();