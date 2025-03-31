import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743433179579 implements MigrationInterface {
    name = 'Migration1743433179579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "fcmToken" varchar`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fcmToken"`);
    }

}
