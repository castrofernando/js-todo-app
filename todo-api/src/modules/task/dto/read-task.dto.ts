import { Expose} from "class-transformer";
import { ExposeId } from "src/helpers/helpers";

export class ReadTaskDto {
    //see issue: https://github.com/typestack/class-transformer/issues/1050
    @ExposeId({ name: '_id' })
    readonly id: string;
    @Expose()
    readonly description: string;
    @Expose()
    readonly done: boolean;
    @Expose()
    readonly createdAt: Date;
}