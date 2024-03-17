import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

export type AuditLogDocument = HydratedDocument<Domain>;

@Schema()
export class Domain {
  @Prop()
  domain: string;

  @Prop()
  addresses: string[];

  @Prop()
  clientIp: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}


export const DomainSchema = SchemaFactory.createForClass(Domain);
