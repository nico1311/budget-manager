import { DateTime } from 'luxon';
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime()
  public created_at: DateTime

  @column()
  public type: number

  @column()
  public category: number

  @column()
  public amount: number

  @column()
  public comment: string
}
