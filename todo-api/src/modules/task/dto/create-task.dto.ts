import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    readonly description: string;
    @IsBoolean()
    @Expose()
    readonly done: boolean;
}
