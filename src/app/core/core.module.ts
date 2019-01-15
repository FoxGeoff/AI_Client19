import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { PlainLoggerService } from './plain-logger.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
