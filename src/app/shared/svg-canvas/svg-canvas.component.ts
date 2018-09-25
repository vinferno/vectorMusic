import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';


class PathType {
  public value: string;
  public description: string;
  public output = '';

  public updateOutput(value) {
    this.output = value;
  }
}

class PathTypeM extends PathType {
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

class PathTypeL extends PathType {
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

class PathTypeH extends PathType {
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

class PathTypeV extends PathType {
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

class PathTypeC extends PathType {
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
}

class PathTypeS extends PathType {
  constructor() {
    super();
    this.value = 'S';
    this.description = 'Smooth Cubic Bézier';
  }
}

class PathTypeQ extends PathType {
  constructor() {
    super();
    this.value = 'Q';
    this.description = 'Quadratic Bézier';
  }
}

class PathTypeT extends PathType {
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

class PathTypeA extends PathType {
  constructor() {
    super();
    this.value = 'A';
    this.description = 'Arc';
  }
}

class PathTypeZ extends PathType {
  constructor() {
    super();
    this.value = 'Z';
    this.description = 'Close Path';
  }

  public calcOutput() {
    this.updateOutput('Z');
  }
}

@Component({
  selector: 'vf-svg-canvas',
  templateUrl: './svg-canvas.component.html',
  styleUrls: ['./svg-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgCanvasComponent implements OnInit {
  public types = [
    new PathTypeM(),
    new PathTypeL(),
    new PathTypeH(),
    new PathTypeV(),
    new PathTypeC(),
    new PathTypeS(),
    new PathTypeQ(),
    new PathTypeT(),
    new PathTypeA(),
    new PathTypeZ(),
  ];

  public currentType = this.types[0];
  public pathBlocks = [];
  public d = '';

  constructor() {
  }

  ngOnInit() {
    const m = new PathTypeM();
    m.setX(100);
    m.setY(100);
    this.pathBlocks.push(m);
    const l = new PathTypeL();
    l.setX(200);
    l.setY(200);
    this.pathBlocks.push(l);
  }

  public undo() {
    this.pathBlocks.pop();
  }


  public addPoint(event) {
    console.log('event', event);
    const value = this.currentType.value;
    // completed;
    if (value === 'M') {
      console.log('M');
      const m = new PathTypeM();
      m.setX(event.offsetX);
      m.setY(event.offsetY);
      this.pathBlocks.push(m);
    }
    if (value === 'L') {
      console.log('L');
      const l = new PathTypeL();
      l.setX(event.offsetX);
      l.setY(event.offsetY);
      this.pathBlocks.push(l);
    }

    if (value === 'T') {
      console.log('T');
      const t = new PathTypeT();
      t.setX(event.offsetX);
      t.setY(event.offsetY);
      this.pathBlocks.push(t);
    }

    if (this.currentType.value === 'Z') {
      this.pathBlocks.push(new PathTypeZ());
    }

    // incomplete
    if (value === 'A') {
      console.log('A');
      this.d += this.currentType.value + '30 50 -45 0 1 ' + event.offsetX + ' ' + event.offsetY;
    }

    if (value === 'Q') {
      console.log('Q');
      this.d += ',' + this.currentType.value + ' 100,100 ' + event.offsetX + ',' + event.offsetY;
    }

    if (value === 'H') {
      console.log('H');
      const h = new PathTypeH();
      h.setX(event.offsetX);
      this.pathBlocks.push(h);
    }

    if (value === 'V') {
      console.log('V');
      const v = new PathTypeV();
      v.setY(event.offsetY);
      this.pathBlocks.push(v);
    }

    if (value === 'C') {
      console.log('C');
      this.d += this.currentType.value +
        ' ' + (event.offsetX + 10) + ',' + (event.offsetY + 10) +
        ' ' + (event.offsetX + 20) + ',' + (event.offsetY + 20) +
        ' ' + (event.offsetX) + ',' + (event.offsetY);
    }

  }

  public clearD() {
    this.pathBlocks = [];
    this.currentType = this.types[0];
  }
  public getD() {
    let answer = '';

    this.pathBlocks.forEach( (block, index) => {
      console.log('index', index , block)
      block.calcOutput();
      answer += block.output;
    });
    console.log('get', answer);
    this.d = answer;
    return answer;
  }

  public getTypeClass(type) {
    return {selected: type === this.currentType};
  }
}
