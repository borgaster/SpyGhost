import * as net from 'net';
import { Observable, interval, Subscription }from 'rxjs';
import { flatMap, takeWhile, map, tap } from 'rxjs/operators';

export interface Movement {
    axis: Axis;
    value: number;

}

export enum Axis {
    x = 3,
    y = 2
}

export class SpyGhost {
    private static instance: SpyGhost;
    private host: string = '192.168.16.188';
    private dataPort: number = 2001;
    private data1 = new Array(); 
    private data2 = new Array();
    private connection!: net.Socket;
    private getDataStream: boolean = true;
    private connectionListner$!: Subscription
    private constructor() {
        this.init();
    }
    static getInstance(): SpyGhost {
        if( !SpyGhost.instance ) {
            SpyGhost.instance = new SpyGhost();
        }
        return SpyGhost.instance;
    }
    private init(): void {
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
            this.send(Buffer.from(this.data1))
            this.connectionListner$ = interval(50).pipe(
                takeWhile( () => this.getDataStream ),
                tap( () => this.send( Buffer.from(this.data2))),
                flatMap( () => this.readConnection())
            ).subscribe( (data: any) => console.log(data))
        } )
    }

    close(): void {
        this.getDataStream = false;
        this.connection.end(() => console.log('connection closed'));
        this.connectionListner$.unsubscribe();
    }

    move( movement: Movement): void {
        this.data2[movement.axis] = (50 | movement.value);
        this.send( Buffer.from( this.data2 ) );
    }

    private readConnection(): Observable<Buffer> {
        return interval(3000).pipe(
            map( () => this.connection.read() as Buffer )
        )
    }

    private send( data: Buffer): void {
        this.connection.write( data );
    }
}