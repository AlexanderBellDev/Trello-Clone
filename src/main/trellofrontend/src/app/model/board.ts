export class Board {
  constructor(id: number, username: string, boardColor: string) {
    this._id = id;
    this._username = username;
    this._boardColor = boardColor;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  private _boardColor: string;

  get boardColor(): string {
    return this._boardColor;
  }

  set boardColor(value: string) {
    this._boardColor = value;
  }
}
