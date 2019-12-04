import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { SmsComponent } from "./sms/sms.component";


const routes: Routes = [
    { path: "", redirectTo: "/sms", pathMatch: "full" },
    { path: "sms", component: SmsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
