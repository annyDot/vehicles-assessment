import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ErrorMessageComponent,
    ToolbarModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    NavbarComponent,
    MessageModule,
    ErrorMessageComponent,
    ToolbarModule
  ],
})
export class ComponentsModule {}
