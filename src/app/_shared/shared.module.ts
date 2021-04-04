import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        TableModule,
        PaginatorModule,
        DropdownModule,
        ConfirmDialogModule,
        FileUploadModule,
        HttpClientModule,
        DialogModule
    ],
    providers: [
        ConfirmationService
    ]

})
export class SharedModule { }