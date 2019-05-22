export class Controller {
    constructor(){
        this.port = 12000;

        document.getElementById('connectPiBtn').onclick = () => this.Connect()
    }
    
    webSocketClient: WebSocket;

    webSocketURL: string
    ip: string;
    port: number;
    isConnected: boolean = false;
    OnMessage: (event: MessageEvent) => any;

    Connect(): void{
        this.ip = (<HTMLInputElement>document.getElementById('piIp')).value;
        this.webSocketURL = 'ws://' + this.ip + ':' + this.port;
        this.webSocketClient = new WebSocket(this.webSocketURL);
        console.log('Connecting...');
        this.webSocketClient.addEventListener('open', () => this.OnConnect())
    }

    private OnConnect() {
        this.isConnected = true;
        console.log('Connection established to ' + this.ip);
        let connectBtn = <HTMLButtonElement>document.getElementById('connectPiBtn');
        connectBtn.innerText = 'Connected...';
        connectBtn.setAttribute('id', 'disconnectPiBtn');
        connectBtn.onclick = () => this.Disconnect()

        this.webSocketClient.addEventListener('message', (event) => this.OnMessage(event))
    }

    Disconnect(): void {
        this.webSocketClient.close();
        this.isConnected = false;
        console.log('Connection to ' + this.ip + ' has been closed.');
        let disconnectBtn = <HTMLButtonElement>document.getElementById('disconnectPiBtn');
        disconnectBtn.innerText = 'Disconnected...';
        disconnectBtn.setAttribute('id', 'connectPiBtn');
        disconnectBtn.onclick = () => this.Connect()

    }
}