export class UserAlreadyExist extends Error {
  constructor() {
    super('Email already exists!')
  }
}
