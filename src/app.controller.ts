import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResultWords } from './app.interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test')
  getTransformedWords(@Query('words') words: string | string[]): ResultWords {
    return this.appService.getTransformedWords(words);
  }

  @Post('test')
  getTransformedWordsPost(
    @Body('words') words: string | string[],
  ): ResultWords {
    return this.appService.getTransformedWords(words);
  }
}
