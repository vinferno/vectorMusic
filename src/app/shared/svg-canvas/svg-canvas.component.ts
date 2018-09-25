import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
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



@Component({
  selector: 'vf-svg-canvas',
  templateUrl: './svg-canvas.component.html',
  styleUrls: ['./svg-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgCanvasComponent implements OnInit {

  public selectedBlock = null;
  public selectedBlockIndex = 0;
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
}




