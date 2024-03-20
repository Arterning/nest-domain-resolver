import { Controller, Get } from "@nestjs/common";
import { DomainService } from "./domain.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { QueryDto } from "./dto/query.dto";


@Controller('v1/history')
@ApiTags('History')
export class HistoryController {

    constructor(private readonly domainService: DomainService) {}


    /**
     * retrieve the latest 20 saved queries from the database and display them in order (the most recent should be first).
     * @returns
     */
    @ApiOperation({ summary: 'List queries', description: 'List queries' })
    @ApiResponse({ status: 200, description: 'OK', type: [QueryDto] })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Get('')
    history(): Promise<QueryDto[]> {
        return this.domainService.history();
    }


}
