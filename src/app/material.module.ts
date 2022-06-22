import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
