import { Controller, Get } from "@nestjs/common";
import { DomainService } from "./domain.service";


@Controller('v1/history')
export class HistoryController {
    
    constructor(private readonly domainService: DomainService) {}

    @Get('')
    history() {
        return this.domainService.history();
    }


}