import BaseComponent from "../../components/base-component.js";
import PieChart from "../../components/pie-chart/index.js";
import { getBrands } from "../../api/dashboard.js";

import "./dashboard.css"

export default class DashboardPage extends BaseComponent {
  components = {};

  constructor() {
    super();
    // this.components.cart = new Cart();

   
    this.getBrands = getBrands;

    this.init();
    this.initializeComponents();
  }

  get template() {
    return `<div>
      <h2 class="app-page-title">Dashboard Page</h2>
      <div class="d-container">
        <div class="d-box">
          <h3 class="d-box-title">Brands count pie chart</h3>
          <div data-element="pieChart">
            <!-- PieChart -->
          </div>
        </div>
        <div class="d-box">
        2
        </div>
        <div class="d-box">
        3
        </div>
        <div class="d-box">
        4
        </div>
      </div>
    </div>`;
  }

  async initializeComponents() {
    const pieChartData = await this.getBrands();
    const pieChart = new PieChart(pieChartData);

    this.components = {
      pieChart
    };

    this.renderComponents();
  }

  renderComponents() {
    Object.keys(this.components).forEach((component) => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      if (element) {
        root.append(element);
      }
    });
  }
}