import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesPipe } from './pipes.pipe';
import { DirectivesDirective } from './directives.directive';
import { NumberonlyDirectiveDirective } from './directives/numberonly-directive.directive';
import { CurrencyPipePipe } from './pipes/currency-pipe.pipe';



@NgModule({
  declarations: [PipesPipe, DirectivesDirective, NumberonlyDirectiveDirective, CurrencyPipePipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
