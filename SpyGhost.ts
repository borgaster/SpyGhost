import * as net from 'net';
import { Observable, interval }from 'rxjs';
import { flatMap, takeWhile, map } from 'rxjs/operators';

export class SpyGhost {
    host: string = '192.168.16.188';
    dataPort: number = 2001;
    data1 = new Array(); 
    data2 = new Array();
    connection: net.Socket;
    getDataStream: boolean = true;

    init(): void {
        this.data1[0] = -95;
        this.data1[1] = 88;
        this.data1[2] = 0;
        this.data1[3] = 0;
        this.data1[4] = 0;
        this.data1[5] = 0;
        this.data1[6] = 0;
        this.data1[7] = ((this.data1[1] + this.data1[2] + this.data1[3] + this.data1[4] + this.data1[5] + this.data1[6]) & 255);
        this.data1[8] = -1;
        this.data2[0] = -95;
        this.data2[1] = 88;
        this.data2[2] = 0;
        this.data2[3] = 0;
        this.data2[4] = 0;
        this.data2[5] = 0;
        this.data2[6] = 0;
        this.data2[7] = 0;
        this.data2[8] = 0;
        this.data2[9] = ((this.data1[1] + this.data1[2] + this.data1[3] + this.data1[4] + this.data1[5] + this.data1[6] + this.data1[7] + this.data1[8]) & 255);
        this.data2[10] = -1;

        this.connection = net.connect( { host: this.host, port: this.dataPort }, () => {
            console.log('connected');
            this.send(new Buffer(this.data1) )
            setInterval( () => {
                this.send( new Buffer(this.data2))
                this.readConnection().subscribe((data: any) => console.log(data) )
            }, 1000)
            
        } )
    }

    close(): void {
        this.getDataStream = false;
        this.connection.end(() => console.log('connection closed'));
    }

    private readConnection(): Observable<any> {
        return interval(3000).pipe(
            takeWhile( () => this.getDataStream ),
            map( () => this.connection.read() )
        )
    }

    private send( data: Buffer): void {
        this.connection.write( data );
        //return new Promise( ( resolve ) => setTimeout( () => resolve( this.connection.read()), 1000 ) )
    }
}