import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserBalances extends BaseSchema {
  protected tableName = 'user_balances'

  public async up () {
    this.schema.raw(`
      CREATE VIEW ${this.tableName} AS
      SELECT user_id,
      SUM(
      (CASE
        WHEN \`type\` = 1 THEN 1
        ELSE -1
      END) * \`amount\`) AS balance
      FROM \`transactions\` GROUP BY user_id`);
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
