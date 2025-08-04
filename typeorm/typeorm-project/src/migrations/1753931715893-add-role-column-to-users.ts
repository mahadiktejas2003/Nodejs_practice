import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleColumnToUsers1753931715893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userTable=await queryRunner.getTable('users');
        const rolesColumn=  new TableColumn({name:"roles", type: "int"});
        await queryRunner.addColumn(userTable ,rolesColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userTable=await queryRunner.getTable('users');
        await queryRunner.dropColumn(userTable, 'roles');
    }

}
