import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageListComponent } from './page-list/page-list.component';
import { TemplateTodoComponent } from './_template/template-todo/template-todo.component';
import { TemplateTodoFormComponent } from './_template/template-todo-form/template-todo-form.component';
import { TemplateHeaderComponent } from './_template/template-header/template-header.component';

import { DragulaModule } from 'ng2-dragula';
import { HeaderSpinnerComponent } from './_template/header-spinner/header-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PageListComponent,
    TemplateTodoComponent,
    TemplateTodoFormComponent,
    TemplateHeaderComponent,
    HeaderSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
