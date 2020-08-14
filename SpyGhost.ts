import * as net from 'net';
import { Observable, interval }from 'rxjs';
import { flatMap, takeWhile } from 'rxjs/operators';

export class SpyGhost {
    host: string = '192.168.16.188';
    dataPort: number = 2001;
    data1 = new Array(); 
    data2 = new Array();
    connection: net.Socket;
    getDataStream: boolean = true;

    init(): void {
        this.data1 = [
            -95,
            88,
            0,
            0,
            0,
            0,
            0,
            ((this.data1[1] + this.data1[2] + this.data1[3] + this.data1[4] + this.data1[5] + this.data1[6]) & 255),
            -1
        ]
        this.data2 = [
            -95,
            88,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            ((this.data1[1] + this.data1[2] + this.data1[3] + this.data1[4] + this.data1[5] + this.data1[6] + this.data1[7] + this.data1[8]) & 255)
            -1
        ]
        this.connection = net.connect( { host: this.host, port: this.dataPort }, async () => {
            await this.send(new Buffer(this.data1))
            await this.send( new Buffer( this.data2 ))
            this.readConnection().subscribe((data: any) => console.log(data) )
        } )
    }

    close(): void {
        this.getDataStream = false;
        this.connection.end(() => console.log('connection closed'));
    }

    private readConnection(): Observable<any> {
        return interval(1000).pipe(
            takeWhile( () => this.getDataStream ),
            flatMap( () => this.connection.read() )
        )
    }

    private send( data: Buffer): Promise<any> {
        this.connection.write( data );
        return new Promise( ( resolve ) => setTimeout( () => resolve( this.connection.read()), 1000 ) )
    }
}