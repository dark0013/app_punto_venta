import { NgModule, AfterViewInit, Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { MatCardModule } from '@angular/material/card';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        NgIf,
        MatDividerModule,
        MatListModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule, 
        MatGridListModule, 
        FlexLayoutModule, 
        MatCardModule,
        MatProgressSpinnerModule

    ]
})

export class MaterialModule { }