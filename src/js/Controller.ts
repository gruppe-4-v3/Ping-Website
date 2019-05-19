export class Controller {
    constructor(port?: number){
        if(port === undefined){
            this.port = 12000;
        }
        else{
            this.port = port;
        }
    }
    
    private webSocketClient: WebSocket;

    webSocketURL: string
    ip: string;
    port: number;
    isConnected: boolean = false;

    Connect(): void{
        this.webSocketURL = 'ws://' + this.ip + ':' + this.port;
        this.webSocketClient = new WebSocket(this.webSocketURL);
        console.log('Connecting...');
        this.webSocketClient.addEventListener('open', () => { 
            this.isConnected = true;
            console.log('Connection established to ' + this.ip);
            let connectBtn = <HTMLButtonElement>document.getElementById('connectPiBtn');
            connectBtn.innerText = 'Connected...';
            connectBtn.setAttribute('id', 'disconnectPiBtn');
        })
    }

    Disconnect(): void {
        this.webSocketClient.close();
        this.isConnected = false;
        console.log('Connection to ' + this.ip + ' has been closed.');
        let connectBtn = <HTMLButtonElement>document.getElementById('disconnectPiBtn');
        connectBtn.innerText = 'Disconnected...';
        connectBtn.setAttribute('id', 'connectPiBtn');

    }
}