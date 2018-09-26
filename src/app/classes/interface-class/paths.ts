
export class PathType {
  public value: string;
  public description: string;
  public output = '';
  public startLocation = {x: 0, y: 0};

  public listProps() {
    return Object.keys(this);
  }

  public updateOutput(value) {
    this.output = value;
  }

  public updateStartLocation(x, y) {
    this.startLocation.x = x;
    this.startLocation.y = y;
  }

  public calcOutput() {
    console.log(this, 'calcOutput not set up.');
  }
}

export class PathTypeM extends PathType {
  public x = 0;
  public y = 0;

  constructor() {
    super();
    this.value = 'M';
    this.description = 'MoveTo';
  }

  public calcOutput() {
    this.updateOutput(this.value + this.x + ',' + this.y + ' ');
  }

  public setX(x) {
    this.x = x;
  }
  public setY(y) {
    this.y = y;
  }
}

export class PathTypeL extends PathType {
  public x = 0;
  public y = 0;
  constructor() {
    super();
    this.value = 'L';
    this.description = 'LineTo';
  }

  public calcOutput() {
    this.updateOutput(this.value + this.x + ',' + this.y + ' ');
  }

  public setX(x) {
    this.x = x;
  }
  public setY(y) {
    this.y = y;
  }
}

export class PathTypeH extends PathType {
  public x = 0;
  constructor() {
    super();
    this.value = 'H';
    this.description = 'Horizontal Line';
  }
  public setX(x) {
    this.x = x;
  }

  public calcOutput() {
    this.updateOutput(this.value + this.x + ' ');
  }
}

export class PathTypeV extends PathType {
  public y = 0;
  constructor() {
    super();
    this.value = 'V';
    this.description = 'Vertical Line';
  }
  public calcOutput() {
    this.updateOutput(this.value + this.y + ' ');
  }
  public setY(y) {
    this.y = y;
  }
}

export class PathTypeC extends PathType {
  public x1;
  public y1;
  public x2;
  public y2;
  public x;
  public y;

  constructor() {
    super();
    this.value = 'C';
    this.description = 'Cubic Bézier';
  }

  public setY(y) {
    this.y = y;
  }
  public setX(x) {
    this.x = x;
  }

  public setY1(y1) {
    this.y1 = y1;
  }
  public setX1(x1) {
    this.x1 = x1;
  }

  public setY2(y2) {
    this.y2 = y2;
  }
  public setX2(x2) {
    this.x2 = x2;
  }

  public calcOutput() {
    this.updateOutput(this.value + this.x1 + ' ' +  this.y1 + ' ' + this.x2 + ' ' + this.y2 + ' ' + this.x + ' ' + this.y);
  }
}

export class PathTypeS extends PathType {
  constructor() {
    super();
    this.value = 'S';
    this.description = 'Smooth Cubic Bézier';
  }
}

export class PathTypeQ extends PathType {
  constructor() {
    super();
    this.value = 'Q';
    this.description = 'Quadratic Bézier';
  }
}

export class PathTypeT extends PathType {
  public x = 0;
  public y = 0;
  constructor() {
    super();
    this.value = 'T';
    this.description = 'T Quadratic Bézier';
  }
  public calcOutput() {
    this.updateOutput(this.value + this.x + ',' + this.y + ' ');
  }

  public setX(x) {
    this.x = x;
  }
  public setY(y) {
    this.y = y;
  }
}

export class PathTypeA extends PathType {
  constructor() {
    super();
    this.value = 'A';
    this.description = 'Arc';
  }
}

export class PathTypeZ extends PathType {
  constructor() {
    super();
    this.value = 'Z';
    this.description = 'Close Path';
  }

  public calcOutput() {
    this.updateOutput('Z');
  }

}
