import { Component, OnInit } from "@angular/core";
import * as TNSPhone from 'nativescript-phone';
import * as Toast from 'nativescript-toast';
import * as utils from "tns-core-modules/utils/utils";
import * as application from "tns-core-modules/application";

const permissions = require('nativescript-permissions');
declare var android;

@Component({
    selector: "ns-sms",
    templateUrl: "./sms.component.html"
})
export class SmsComponent implements OnInit {
    public input: any;
    public profile = [];
    public numbers = [];
    simInfo: any;
    public operatorName = '';
    public cellInfo: string;


    public constructor() {
        this.input = {
            // recipient: "",
            message: ""
        }
        this.profile = [
            {name: "Monir", number: "01922934768", gender: "Male"},
            {name: "Farhan", number: "01818486107", gender: "Male"},
            {name: "Afrun", number: "01739985642", gender: "Female"},
            {name: "Ferdous", number: "01922934768", gender: "Male"},
            {name: "Anika", number: "(650) 555-1212", gender: "Female"}
        ];

        this.numbers = ["01922934768", "01739985642", "(650) 555-1212", "01959853044", "01738038356"]

        permissions.requestPermission([android.Manifest.permission.SEND_SMS, android.Manifest.permission.READ_PHONE_STATE,
            android.Manifest.permission.ACCESS_FINE_LOCATION], "I need these permissions because I'm cool")
            .then( () => {
                console.log("Woo Hoo, I have the power!!");
            })
            .catch( () => {
                console.log("Uh oh, no permissions - plan B time!");
            });

    }

    ngOnInit(): void {}


    // send sms by SmsManager api
    public sendMessage(number) {
        console.log('Message click');
        var sms = android.telephony.SmsManager.getDefault();
        sms.sendTextMessage(number, null, "I Love You!", null, null);
        Toast.makeText("Message Sent", "2000").show();
    }

    public sendMessageAll() {
        console.log('Message click :', this.input.message);

        for(let i=0; i<this.numbers.length; i++) {
           task(i, this.numbers[i], this.input.message);
        }

       function task(i,phoneNumber, message) {
            setTimeout(function() {
                var sms = android.telephony.SmsManager.getDefault();
                sms.sendTextMessage(phoneNumber, null, message, null, null);
                console.log('delay 3 second', message);
            }, 3000 * i);
        }
    }


    public call(args){
        TNSPhone.dial(args, true);
    }

    public message(args){
        TNSPhone.sms(args, "");

    }




public go() {
    this.simInfo = this.simManage();
    this.cellInfo = this.simInfo.cellPhoneInfo;
    console.log(this.simInfo);
    console.log(this.simInfo.carrierName);
}

 public simManage(){
        var tm = android.telephony.TelephonyManager;
        // var context = utils.ad.getApplicationContext();
        // var manager = context.getSystemService(android.content.Context.TELEPHONY_SERVICE);
        var manager = application.android.context.getSystemService(android.content.Context.TELEPHONY_SERVICE);

        // let cellinfogsm = manager.getAllCellInfo().get(0);
        // let cellSignalStrengthGsm = cellinfogsm.getCellSignalStrength();
        // cellSignalStrengthGsm.getDbm();

        // var message = cellSignalStrengthGsm;
        // console.log("Signal Streinght: ", cellSignalStrengthGsm);

        var phoneNumber = manager.getLine1Number();
        var countryCode = manager.getSimCountryIso();
        var simOperator = manager.getSimOperator();
        var carrierName = manager.getSimOperatorName();

        var deviceId = manager.getDeviceId();
        var deviceSoftwareVersion = manager.getDeviceSoftwareVersion();
        var simSerialNumber = manager.getSimSerialNumber();
        var subscriberId = manager.getSubscriberId();

        var callState = manager.getCallState();
        var dataActivity = manager.getDataActivity();
        var networkType = manager.getNetworkType();
        var phoneType = manager.getPhoneType();
        var simState = manager.getSimState();

        var isNetworkRoaming = manager.isNetworkRoaming();

        var mcc = "";
        var mnc = "";

        if (simOperator.length >= 3) {
            mcc = simOperator.substring(0, 3);
            mnc = simOperator.substring(3);
        }
        return {

            // cellPhoneInfo:message,
            phoneNumber:phoneNumber,
            countryCode:countryCode,
            simOperator:simOperator,
            carrierName:carrierName,
            deviceId:deviceId,
            deviceSoftwareVersion:deviceSoftwareVersion,
            simSerialNumber:simSerialNumber,
            subscriberId:subscriberId,
            callState:callState,
            dataActivity:dataActivity,
            networkType:networkType,
            phoneType:phoneType,
            simState:simState,
            isNetworkRoaming:isNetworkRoaming,
            mcc:mcc,
            mnc:mnc
        };
}


}
