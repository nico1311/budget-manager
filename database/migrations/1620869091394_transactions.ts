import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table.dateTime('created_at').defaultTo(this.now())
      table.integer('type').notNullable()
      table.integer('category').defaultTo(0)
      table.decimal('amount').notNullable()
      table.string('comment', 1000).notNullable()
    });

    this.schema.alterTable(this.tableName, (table) => {
      table.index('amount');
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
