import { Controller, Get } from "@nestjs/common";
import { DomainService } from "./domain.service";
import { ApiTags } from "@nestjs/swagger";


@Controller('v1/history')
@ApiTags('History')
export class HistoryController {
    
    constructor(private readonly domainService: DomainService) {}

    @Get('')
    history() {
        return this.domainService.history();
    }


}