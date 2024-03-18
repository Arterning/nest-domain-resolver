import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { DomainService } from "./domain.service";
import { ValidateIpDto } from "./dto/validate-ip.dto";
import { ApiTags } from "@nestjs/swagger";


@Controller('v1/tools')
@ApiTags('Tools')
export class ToolsController {

    constructor(private readonly domainService: DomainService) {}

    @Get('lookup')
    lookup(@Query("domain") domain,  @Headers('x-forwarded-for') clientIp: string) {
        return this.domainService.lookupDomain(domain, clientIp);
    }


    /**
     * validateIPaddress
     */
    @Post('validate')
    validate(@Body() validateIpDto: ValidateIpDto) {
        return this.domainService.validateIp(validateIpDto.ip);
    }
    
}