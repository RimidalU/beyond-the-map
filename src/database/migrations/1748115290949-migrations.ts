import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1748115290949 implements MigrationInterface {
    name = 'Migrations1748115290949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "article_entity" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "published_at" TIMESTAMP WITH TIME ZONE, "tags" text, "is_local" boolean NOT NULL DEFAULT false, "locality_name" character varying(255) NOT NULL, "landmarks_url" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "authorId" integer, CONSTRAINT "PK_362cadb16e72c369a1406924e2d" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "article_entity" ADD CONSTRAINT "FK_d84d3caa203db7cf1725b95b0c4" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "article_entity" DROP CONSTRAINT "FK_d84d3caa203db7cf1725b95b0c4"`,
        )
        await queryRunner.query(`DROP TABLE "article_entity"`)
    }
}
