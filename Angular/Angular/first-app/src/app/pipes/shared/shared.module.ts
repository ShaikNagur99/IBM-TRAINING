import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountMaskPipe } from "../account-mask.pipe";

@NgModule({
    imports: [
        CommonModule,
        AccountMaskPipe
    ]
})
export class SharedModule {}