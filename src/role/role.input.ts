import { ApiProperty } from "@nestjs/swagger"
import { Association } from "src/associations/associations.entity";
import { User } from "src/users/users.entity";

export class RoleInput {
    @ApiProperty({
        description: 'The name of the role of the given user in the given association',
        example: "President",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The id of the user',
        example: "1",
        type: User,
    })
    public idUser: User;

    @ApiProperty({ 
        description: 'The id of the association',
        example: "1",
        type: Association,
    })
    public idAssociation: Association
}