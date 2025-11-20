// bleService.js
import EventEmitter from "events";
import bleno from "bleno";

const { PrimaryService } = bleno;
const Characteristic = bleno.Characteristic;

class BLEService extends EventEmitter {
  constructor() {
    super();
    this.logs = [];
    this.LOCAL_NAME = "NodeBLE-Service";
    this.SERVICE_UUID = "1234567812345678123456789abcdef0";
    this.CHAR_UUID = "876543214321678943210fedcba98765";

    this.init();
  }

  log(message) {
    const entry = { ts: new Date().toISOString(), msg: message };
    this.logs.push(entry);
    this.emit("log", entry); // broadcast to listeners
    console.log(`[BLE] ${entry.ts} - ${entry.msg}`);
  }

  getLogs() {
    return this.logs;
  }

  init() {
    const self = this;

    class HelloCharacteristic extends Characteristic {
      constructor() {
        super({
          uuid: self.CHAR_UUID,
          properties: ["read"],
        });
        this._value = Buffer.from("hello from Node BLE Service\n", "utf8");
      }

      onReadRequest(offset, callback) {
        self.log("Characteristic read request received");
        const data = this._value;
        const result =
          offset >= data.length ? Buffer.alloc(0) : data.slice(offset);
        callback(Characteristic.RESULT_SUCCESS, result);
      }
    }

    bleno.on("stateChange", (state) => {
      self.log(`State changed: ${state}`);
      if (state === "poweredOn") {
        bleno.startAdvertising(self.LOCAL_NAME, [self.SERVICE_UUID], (err) => {
          if (err) self.log(`Advertising error: ${err}`);
          else self.log(`Advertising as '${self.LOCAL_NAME}'`);
        });
      } else {
        bleno.stopAdvertising(() => {
          self.log(`Stopped advertising (state=${state})`);
        });
      }
    });

    bleno.on("advertisingStart", (err) => {
      if (err) return self.log(`advertisingStart error: ${err}`);
      self.log("Advertising started — setting up services.");
      const service = new PrimaryService({
        uuid: self.SERVICE_UUID,
        characteristics: [new HelloCharacteristic()],
      });
      bleno.setServices([service], (err2) => {
        if (err2) self.log(`setServices error: ${err2}`);
        else self.log("Services configured and ready.");
      });
    });

    bleno.on("accept", (clientAddress) =>
      self.log(`Accepted connection from ${clientAddress}`)
    );
    bleno.on("disconnect", (clientAddress) =>
      self.log(`Disconnected from ${clientAddress}`)
    );
  }
}

const bleService = new BLEService();

export default bleService;
