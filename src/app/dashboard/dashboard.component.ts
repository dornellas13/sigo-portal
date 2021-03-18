import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company/services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  multi: any[];
  view: any[] = [1980, 600];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Consultorias e Acessorias';
  showYAxisLabel = true;
  yAxisLabel = 'Nota de Conformidade';
  legendTitle = 'Normas Técnicas';
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 10;
  legendPosition = 'right';

  colorScheme = {
    domain: ['#FF8A80',
    '#EA80FC',
    '#8C9EFF',
    '#80D8FF',
    '#A7FFEB',
    '#CCFF90',
    '#FFFF8D',
    '#FF9E80']
  };

  constructor(private companyService: CompanyService) {
  }

  async ngOnInit(): Promise<void> {
    const companies = await this.companyService.getAll();
    this.multi = companies
    .filter(a => a.standards.some(b => b.rating > 0))
    .map(company => {
      return {
          name: company.name,
          series: company.standards.map(standard => {
            return {
              name: `${standard.id} - ${standard.name}`,
              value: standard.rating
            };
          })
        };
    });
  }

 onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
