import { Gift } from "@prisma/client";
import { User } from "./user.model";

export class UserWithGifts extends User {
  gifts: Gift[] = [];
}