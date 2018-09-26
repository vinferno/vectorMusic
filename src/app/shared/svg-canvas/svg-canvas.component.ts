import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  PathType,
  PathTypeA,
  PathTypeC,
  PathTypeH,
  PathTypeL,
  PathTypeM,
  PathTypeQ,
  PathTypeS,
  PathTypeT,
  PathTypeV, PathTypeZ
} from '../../classes/interface-class/paths';


const modeTypes = {
  addPoint: 'Add Point',
  changePropNumber: 'Change Prop Number'
}

@Component({
  selector: 'vf-svg-canvas',
  templateUrl: './svg-canvas.component.html',
  styleUrls: ['./svg-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgCanvasComponent implements OnInit {


  public modes = [modeTypes.addPoint, modeTypes.changePropNumber];
  public modeIndex = 0;

  public selectedBlock: PathType = null;
  public selectedBlockIndex = 0;

  public selectedProp;

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
    this.pushBlock(m);
    const l = new PathTypeL();
    l.setX(103);
    l.setY(103);
    this.pushBlock(l);
    this.selectedBlock = this.pathBlocks[this.pathBlocks.length - 1];
    this.selectedBlockIndex = this.pathBlocks.length - 1;
  }

  public undo() {
    this.pathBlocks.pop();
  }

  public clickOnSvg(event) {
    if (this.modes[this.modeIndex] === modeTypes.addPoint) {
      this.addPoint(event);
    }

    if (this.modes[this.modeIndex] === modeTypes.changePropNumber) {
      this.changePropNumber(event);
    }
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
      this.pushBlock(m);
    }
    if (value === 'L') {
      console.log('L');
      const l = new PathTypeL();
      l.setX(event.offsetX);
      l.setY(event.offsetY);
      this.pushBlock(l);
    }

    if (value === 'T') {
      console.log('T');
      const t = new PathTypeT();
      t.setX(event.offsetX);
      t.setY(event.offsetY);
      this.pushBlock(t);
    }

    if (this.currentType.value === 'Z') {
      this.pushBlock(new PathTypeZ());
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
      this.pushBlock(h);
    }

    if (value === 'V') {
      console.log('V');
      const v = new PathTypeV();
      v.setY(event.offsetY);
      this.pushBlock(v);
    }

    if (value === 'C') {
      console.log('C');
      const c = new PathTypeC();
      c.setX(event.offsetX);
      c.setY(event.offsetY);
      c.setX1(event.offsetX);
      c.setY1(event.offsetY);
      c.setX2(event.offsetX);
      c.setY2(event.offsetY);
      this.pushBlock(c);
    }

    this.selectedBlock = this.pathBlocks[this.pathBlocks.length - 1];
    this.selectedBlockIndex = this.pathBlocks.length - 1;

  }

  public clearD() {
    this.pathBlocks = [];
    this.currentType = this.types[0];
  }
  public getD() {
    let answer = '';

    this.pathBlocks.forEach( (block, index) => {
      block.calcOutput();
      answer += block.output;
    });
    this.d = answer;
    return answer;
  }

  public getDebugPath() {
    let answer = '';

    if (this.selectedBlock) {
      answer += 'M' + this.selectedBlock.startLocation.x + ',' + this.selectedBlock.startLocation.y;
      this.selectedBlock.calcOutput();
      answer += this.selectedBlock.output;
    }
    console.log('answer', answer);
    return answer;
  }

  public getTypeClass(type) {
    return {selected: type === this.currentType};
  }

  public getPropClass(prop) {
    return {selected: prop === this.selectedProp};
  }

  public cyclePathBlocksUp() {
    this.selectedBlockIndex++;
    this.selectedBlock = this.pathBlocks[this.selectedBlockIndex];
    if (!this.selectedBlock) {
      this.selectedBlock = this.pathBlocks[0];
      this.selectedBlockIndex = 0;
    }
  }

  public cyclePathBlocksDown() {
    this.selectedBlockIndex--;
    this.selectedBlock = this.pathBlocks[this.selectedBlockIndex];
    if (!this.selectedBlock) {
      this.selectedBlock = this.pathBlocks[this.pathBlocks.length - 1];
      this.selectedBlockIndex = this.pathBlocks.length - 1;
    }
  }

  public pushBlock(block) {
    this.pathBlocks.push(block);
    this.updateStartingLocation(block);
  }

  public updateStartingLocation(block) {
    let myIndex = 0;
    let myStartingX = null;
    let myStartingY = null;
    this.pathBlocks.forEach( (item, index) => {
      if (item === block) {
        myIndex = index;
      }
    });

    for (let i = myIndex - 1; i > -1; i--) {
      const test = this.pathBlocks[i];
      if (this.pathBlocks[i] && !myStartingX && test.x) {
        myStartingX = this.pathBlocks[i].x;
      }
      if (this.pathBlocks[i] && !myStartingY && test.y) {
        myStartingY = test.y;
      }
    }

    if (myStartingY && myStartingX) {
      block.updateStartLocation(myStartingX, myStartingY);
    } else {
      block.updateStartLocation(block.x, block.y);
    }
  }

  updateProp(event, prop) {
    console.log('prop', prop, event.target.value );
    this.selectedBlock[prop] = Number(event.target.value);
    this.pathBlocks.forEach(block => {
      this.updateStartingLocation(block);
    });
  }

  public getInputType(prop) {
    return typeof this.selectedBlock[prop] === 'number' ? 'number' : 'text';
  }

  public changePropNumber(event) {
    console.log('this.selectedProp', this.selectedProp);
    this.selectedBlock[this.selectedProp] = this.selectedProp.
    indexOf('Y') + 1 || this.selectedProp.indexOf('y') + 1 ? event.offsetY : event.offsetX;
    this.pathBlocks.forEach( block => {
      this.updateStartingLocation(block);
    });
  }

  public selectProp(prop) {
    this.selectedProp = prop;
  }
}




