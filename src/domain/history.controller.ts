import { Controller, Get } from "@nestjs/common";
import { DomainService } from "./domain.service";
import { ApiTags } from "@nestjs/swagger";


@Controller('v1/history')
@ApiTags('History')
export class HistoryController {
    
    constructor(private readonly domainService: DomainService) {}


    /**
     * retrieve the latest 20 saved queries from the database and display them in order (the most recent should be first).
     * @returns 
     */
    @Get('')
    history() {
        return this.domainService.history();
    }


}