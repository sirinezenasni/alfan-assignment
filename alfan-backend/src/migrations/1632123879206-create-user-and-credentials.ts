import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserAndCredentials1632123879206 implements MigrationInterface {
    name = 'createUserAndCredentials1632123879206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "firstName" character varying(255), "lastName" character varying(255), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userCredentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" character varying(255) NOT NULL, "providerId" character varying(255) NOT NULL, "accessToken" character varying(500) NOT NULL, "refreshToken" character varying(500), "userId" uuid, CONSTRAINT "PK_2b516afde7eb92e4871de6ef845" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5d45988afae94aa686620f9ce5" ON "userCredentials" ("type", "providerId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_75f7968eaf1dd737c234ff70e8" ON "userCredentials" ("type", "userId") `);
        await queryRunner.query(`ALTER TABLE "userCredentials" ADD CONSTRAINT "FK_812549eeef178a1b74b9539bf39" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userCredentials" DROP CONSTRAINT "FK_812549eeef178a1b74b9539bf39"`);
        await queryRunner.query(`DROP INDEX "IDX_75f7968eaf1dd737c234ff70e8"`);
        await queryRunner.query(`DROP INDEX "IDX_5d45988afae94aa686620f9ce5"`);
        await queryRunner.query(`DROP TABLE "userCredentials"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
