import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: [],
  })
  favorite: { id?: string }[];

  @Column({ nullable: true, default: '' })
  token: string;

  @BeforeInsert()
  updatePassword() {
    if (this.password) {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }
}

export default User;
