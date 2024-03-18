import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Domain } from './entities/domain.entity';
import * as dnsPromises from 'node:dns/promises';
import { IAddress } from 'src/type/address';

@Injectable()
export class DomainService {
  constructor(@InjectModel('Domain') private domainModel: Model<Domain>) {}

  create(createDomainDto: CreateDomainDto): Promise<Domain> {
    const createdCat = new this.domainModel(createDomainDto);
    return createdCat.save();
  }

  findAll(): Promise<Domain[]> {
    return this.domainModel.find().exec();
  }

  findOne(id: number): Promise<Domain> {
    return this.domainModel.findById(id).exec();
  }

  update(id: number, updateDomainDto: UpdateDomainDto): Promise<Domain> {
    return this.domainModel.findByIdAndUpdate(id, updateDomainDto).exec();
  }

  remove(id: number) {
    return this.domainModel.findByIdAndDelete(id).exec();
  }

  /**
   * retrieve the latest 20 saved queries from the database and display them in order (the most recent should be first).
   */
  history() {
    return this.domainModel.find().sort({ _id: -1 }).limit(20).exec();
  }

  async lookupDomain(domain: string, clientIp: string) {
    const address = await dnsPromises.resolve4(domain);
    const addresses = address.map((ip) => ({ ip }) as IAddress);
    const domainRecord = new this.domainModel({
      domain,
      clientIp,
      addresses,
    });
    await domainRecord.save();
    return addresses;
  }

  async validateIp(ip: string) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip,
      )
    ) {
      return true;
    }
    return false;
  }
}
