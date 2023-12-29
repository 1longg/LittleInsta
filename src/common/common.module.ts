import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import GraphModule from "./graphql/graphql.module";

@Module({
    imports: [DatabaseModule, GraphModule],
    providers: [],
    exports: []
})
export default class CommonModule{}