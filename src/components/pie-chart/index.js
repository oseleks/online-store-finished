import BaseComponent from "../base-component";

import "./pie-chart-style.css";

export default class PieChart extends BaseComponent {
  constructor(data = []) {
    super();
    this.data = data;
    this.init();

    this.addEventListeners();
  }

  get template() {
    return `
      <div class="wrapper">
        <div class="pieID pie"></div>
        <ul class="pieID legend">
          ${this.data.map((brand) => `<li><em>${brand.name}</em><span>${brand.productsCount}</span></li>`).join('')}
        </ul>
      </div>
    `;
  }

  afterRender() {
    setTimeout(()=>{
      this.createPie(".pieID.legend", ".pieID.pie");
    }, 1)
  }

  addEventListeners() {

  }

  sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }
  
  addSlice(sliceSize, pieElement, offset, sliceID, color) {
    var sliceElement = document.createElement('div');
    sliceElement.className = 'slice ' + sliceID;
    sliceElement.innerHTML = '<span></span>';
    pieElement.appendChild(sliceElement);
  
    var offsetAdjusted = offset - 1;
    var sizeRotation = -179 + sliceSize;
    var slice = document.querySelector('.' + sliceID);
    slice.style.transform = 'rotate(' + offsetAdjusted + 'deg) translate3d(0,0,0)';
  
    var span = slice.querySelector('span');
    span.style.transform = 'rotate(' + sizeRotation + 'deg) translate3d(0,0,0)';
    span.style.backgroundColor = color;
  }
  
  iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s" + dataCount + "-" + sliceCount;
    var maxSize = 179;
    if (sliceSize <= maxSize) {
      this.addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
      this.addSlice(maxSize, pieElement, offset, sliceID, color);
      this.iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
    }
  }
  
  createPie(dataElement, pieElement) {
    var listData = [];
    document.querySelectorAll(dataElement + ' span').forEach(function(elem) {
      listData.push(Number(elem.textContent));
    });
    var listTotal = listData.reduce((a, b) => a + b, 0);
    
    var offset = 0;
    var colors = [
      "cornflowerblue", "olivedrab", "orange", "tomato", "crimson", 
      "purple", "turquoise", "forestgreen", "navy", "gray"
    ];
  
    listData.forEach((data, i) => {
      var size = this.sliceSize(data, listTotal);
      this.iterateSlices(size, document.querySelector(pieElement), offset, i, 0, colors[i]);
      document.querySelector(dataElement + ' li:nth-child(' + (i + 1) + ')').style.borderColor = colors[i];
      offset += size;
    });
  }
}
