export class GymDoesNotExist extends Error {
  constructor() {
    super('Gym does not exist!')
  }
}
