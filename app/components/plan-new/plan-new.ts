import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { Http, Response } from 'angular2/http';
import {IPlan} from '../../interfaces/iplan';

import {PlanService} from '../../services/plan-service';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'url';
import {SqlService} from '../../services/sql-service';

@Component({
    selector: 'plan-new',
    templateUrl: './components/plan-new/plan-new.html',
    providers: [PlanService, SqlService],
    directives: [ROUTER_DIRECTIVES]
})
export class PlanNew {
    planIds: string[];
    newPlanName: string;
    newPlanContent: string;
    newPlanQuery: string;
    newPlan: IPlan;
    validationMessage: string;
    
    constructor(private _router: Router, private _planService: PlanService, private _sqlService: SqlService) { }

    submitPlan() {
        // remove psql generated header
        this.newPlanContent = this.newPlanContent.replace('QUERY PLAN=', '');
        this.newPlanContent = this.newPlanContent.slice(2, this.newPlanContent.length - 2);

        if (!this._planService.isJsonString(this.newPlanContent)) {
            this.validationMessage = 'The string you submitted is not valid JSON'
            return;
        }

        this.newPlan = this._planService.createPlan(this.newPlanName, this.newPlanContent, this.newPlanQuery);
        this._router.navigate(['PlanView', { id: this.newPlan.id }]);
    }

    prefill() {
        this.newPlanName = 'Sample plan';
        this.newPlanQuery = "select * from test;"
        this._sqlService.getQueryPlan(this.newPlanQuery).subscribe(res => this.newPlanContent = res);
        //this.queryURL = this.queryURL + this.newPlanQuery;
        //this.http.get<string>(this.queryURL).subscribe(res => this.newPlanContent = res.text());
    }
}
export var SAMPLE_JSON = `[
  {
    "Plan": {
      "Node Type": "Limit",
      "Startup Cost": 17024.84,
      "Total Cost": 17024.87,
      "Plan Rows": 10,
      "Plan Width": 133,
      "Actual Startup Time": 725.773,
      "Actual Total Time": 725.775,
      "Actual Rows": 10,
      "Actual Loops": 1,
      "Output": ["c.state", "cat.categoryname", "(sum(o.netamount))", "(sum(o.totalamount))"],
      "Shared Hit Blocks": 23,
      "Shared Read Blocks": 1392,
      "Shared Dirtied Blocks": 0,
      "Shared Written Blocks": 0,
      "Local Hit Blocks": 0,
      "Local Read Blocks": 0,
      "Local Dirtied Blocks": 0,
      "Local Written Blocks": 0,
      "Temp Read Blocks": 0,
      "Temp Written Blocks": 0,
      "I/O Read Time": 0.000,
      "I/O Write Time": 0.000,
      "Plans": [
        {
          "Node Type": "Sort",
          "Parent Relationship": "Outer",
          "Startup Cost": 17024.84,
          "Total Cost": 17026.88,
          "Plan Rows": 816,
          "Plan Width": 133,
          "Actual Startup Time": 725.771,
          "Actual Total Time": 725.772,
          "Actual Rows": 11,
          "Actual Loops": 1,
          "Output": ["c.state", "cat.categoryname", "(sum(o.netamount))", "(sum(o.totalamount))"],
          "Sort Key": ["c.state", "(sum(o.totalamount))"],
          "Sort Method": "top-N heapsort",
          "Sort Space Used": 25,
          "Sort Space Type": "Memory",
          "Shared Hit Blocks": 23,
          "Shared Read Blocks": 1392,
          "Shared Dirtied Blocks": 0,
          "Shared Written Blocks": 0,
          "Local Hit Blocks": 0,
          "Local Read Blocks": 0,
          "Local Dirtied Blocks": 0,
          "Local Written Blocks": 0,
          "Temp Read Blocks": 0,
          "Temp Written Blocks": 0,
          "I/O Read Time": 0.000,
          "I/O Write Time": 0.000,
          "Plans": [
            {
              "Node Type": "Aggregate",
              "Strategy": "Hashed",
              "Parent Relationship": "Outer",
              "Startup Cost": 16994.41,
              "Total Cost": 17006.65,
              "Plan Rows": 816,
              "Plan Width": 133,
              "Actual Startup Time": 723.877,
              "Actual Total Time": 724.417,
              "Actual Rows": 832,
              "Actual Loops": 1,
              "Output": ["c.state", "cat.categoryname", "sum(o.netamount)", "sum(o.totalamount)"],
              "Group Key": ["c.state", "cat.categoryname"],
              "Shared Hit Blocks": 13,
              "Shared Read Blocks": 1392,
              "Shared Dirtied Blocks": 0,
              "Shared Written Blocks": 0,
              "Local Hit Blocks": 0,
              "Local Read Blocks": 0,
              "Local Dirtied Blocks": 0,
              "Local Written Blocks": 0,
              "Temp Read Blocks": 0,
              "Temp Written Blocks": 0,
              "I/O Read Time": 0.000,
              "I/O Write Time": 0.000,
              "Plans": [
                {
                  "Node Type": "Hash Join",
                  "Parent Relationship": "Outer",
                  "Join Type": "Inner",
                  "Startup Cost": 4966.48,
                  "Total Cost": 13742.65,
                  "Plan Rows": 325176,
                  "Plan Width": 133,
                  "Actual Startup Time": 118.314,
                  "Actual Total Time": 354.285,
                  "Actual Rows": 383270,
                  "Actual Loops": 1,
                  "Output": ["c.state", "o.netamount", "o.totalamount", "cat.categoryname"],
                  "Hash Cond": "(o.orderid = ch.orderid)",
                  "Shared Hit Blocks": 13,
                  "Shared Read Blocks": 1392,
                  "Shared Dirtied Blocks": 0,
                  "Shared Written Blocks": 0,
                  "Local Hit Blocks": 0,
                  "Local Read Blocks": 0,
                  "Local Dirtied Blocks": 0,
                  "Local Written Blocks": 0,
                  "Temp Read Blocks": 0,
                  "Temp Written Blocks": 0,
                  "I/O Read Time": 0.000,
                  "I/O Write Time": 0.000,
                  "Plans": [
                    {
                      "Node Type": "Hash Join",
                      "Parent Relationship": "Outer",
                      "Join Type": "Inner",
                      "Startup Cost": 834.86,
                      "Total Cost": 4539.11,
                      "Plan Rows": 60350,
                      "Plan Width": 138,
                      "Actual Startup Time": 22.651,
                      "Actual Total Time": 133.484,
                      "Actual Rows": 60350,
                      "Actual Loops": 1,
                      "Output": ["o.netamount", "o.totalamount", "o.orderid", "ol.orderid", "cat.categoryname"],
                      "Hash Cond": "(ol.orderid = o.orderid)",
                      "Shared Hit Blocks": 9,
                      "Shared Read Blocks": 581,
                      "Shared Dirtied Blocks": 0,
                      "Shared Written Blocks": 0,
                      "Local Hit Blocks": 0,
                      "Local Read Blocks": 0,
                      "Local Dirtied Blocks": 0,
                      "Local Written Blocks": 0,
                      "Temp Read Blocks": 0,
                      "Temp Written Blocks": 0,
                      "I/O Read Time": 0.000,
                      "I/O Write Time": 0.000,
                      "Plans": [
                        {
                          "Node Type": "Hash Join",
                          "Parent Relationship": "Outer",
                          "Join Type": "Inner",
                          "Startup Cost": 464.86,
                          "Total Cost": 2962.11,
                          "Plan Rows": 60350,
                          "Plan Width": 122,
                          "Actual Startup Time": 12.467,
                          "Actual Total Time": 85.647,
                          "Actual Rows": 60350,
                          "Actual Loops": 1,
                          "Output": ["ol.orderid", "cat.categoryname"],
                          "Hash Cond": "(ol.prod_id = p.prod_id)",
                          "Shared Hit Blocks": 4,
                          "Shared Read Blocks": 483,
                          "Shared Dirtied Blocks": 0,
                          "Shared Written Blocks": 0,
                          "Local Hit Blocks": 0,
                          "Local Read Blocks": 0,
                          "Local Dirtied Blocks": 0,
                          "Local Written Blocks": 0,
                          "Temp Read Blocks": 0,
                          "Temp Written Blocks": 0,
                          "I/O Read Time": 0.000,
                          "I/O Write Time": 0.000,
                          "Plans": [
                            {
                              "Node Type": "Seq Scan",
                              "Parent Relationship": "Outer",
                              "Relation Name": "orderlines",
                              "Schema": "public",
                              "Alias": "ol",
                              "Startup Cost": 0.00,
                              "Total Cost": 988.50,
                              "Plan Rows": 60350,
                              "Plan Width": 8,
                              "Actual Startup Time": 0.005,
                              "Actual Total Time": 14.054,
                              "Actual Rows": 60350,
                              "Actual Loops": 1,
                              "Output": ["ol.orderlineid", "ol.orderid", "ol.prod_id", "ol.quantity", "ol.orderdate"],
                              "Shared Hit Blocks": 2,
                              "Shared Read Blocks": 383,
                              "Shared Dirtied Blocks": 0,
                              "Shared Written Blocks": 0,
                              "Local Hit Blocks": 0,
                              "Local Read Blocks": 0,
                              "Local Dirtied Blocks": 0,
                              "Local Written Blocks": 0,
                              "Temp Read Blocks": 0,
                              "Temp Written Blocks": 0,
                              "I/O Read Time": 0.000,
                              "I/O Write Time": 0.000
                            },
                            {
                              "Node Type": "Hash",
                              "Parent Relationship": "Inner",
                              "Startup Cost": 339.86,
                              "Total Cost": 339.86,
                              "Plan Rows": 10000,
                              "Plan Width": 122,
                              "Actual Startup Time": 12.446,
                              "Actual Total Time": 12.446,
                              "Actual Rows": 10000,
                              "Actual Loops": 1,
                              "Output": ["p.prod_id", "cat.categoryname"],
                              "Hash Buckets": 1024,
                              "Hash Batches": 1,
                              "Original Hash Batches": 1,
                              "Peak Memory Usage": 425,
                              "Shared Hit Blocks": 2,
                              "Shared Read Blocks": 100,
                              "Shared Dirtied Blocks": 0,
                              "Shared Written Blocks": 0,
                              "Local Hit Blocks": 0,
                              "Local Read Blocks": 0,
                              "Local Dirtied Blocks": 0,
                              "Local Written Blocks": 0,
                              "Temp Read Blocks": 0,
                              "Temp Written Blocks": 0,
                              "I/O Read Time": 0.000,
                              "I/O Write Time": 0.000,
                              "Plans": [
                                {
                                  "Node Type": "Hash Join",
                                  "Parent Relationship": "Outer",
                                  "Join Type": "Inner",
                                  "Startup Cost": 1.36,
                                  "Total Cost": 339.86,
                                  "Plan Rows": 10000,
                                  "Plan Width": 122,
                                  "Actual Startup Time": 0.283,
                                  "Actual Total Time": 9.015,
                                  "Actual Rows": 10000,
                                  "Actual Loops": 1,
                                  "Output": ["p.prod_id", "cat.categoryname"],
                                  "Hash Cond": "(p.category = cat.category)",
                                  "Shared Hit Blocks": 2,
                                  "Shared Read Blocks": 100,
                                  "Shared Dirtied Blocks": 0,
                                  "Shared Written Blocks": 0,
                                  "Local Hit Blocks": 0,
                                  "Local Read Blocks": 0,
                                  "Local Dirtied Blocks": 0,
                                  "Local Written Blocks": 0,
                                  "Temp Read Blocks": 0,
                                  "Temp Written Blocks": 0,
                                  "I/O Read Time": 0.000,
                                  "I/O Write Time": 0.000,
                                  "Plans": [
                                    {
                                      "Node Type": "Seq Scan",
                                      "Parent Relationship": "Outer",
                                      "Relation Name": "products",
                                      "Schema": "public",
                                      "Alias": "p",
                                      "Startup Cost": 0.00,
                                      "Total Cost": 201.00,
                                      "Plan Rows": 10000,
                                      "Plan Width": 8,
                                      "Actual Startup Time": 0.003,
                                      "Actual Total Time": 4.330,
                                      "Actual Rows": 10000,
                                      "Actual Loops": 1,
                                      "Output": ["p.prod_id", "p.category", "p.title", "p.actor", "p.price", "p.special", "p.common_prod_id"],
                                      "Shared Hit Blocks": 2,
                                      "Shared Read Blocks": 99,
                                      "Shared Dirtied Blocks": 0,
                                      "Shared Written Blocks": 0,
                                      "Local Hit Blocks": 0,
                                      "Local Read Blocks": 0,
                                      "Local Dirtied Blocks": 0,
                                      "Local Written Blocks": 0,
                                      "Temp Read Blocks": 0,
                                      "Temp Written Blocks": 0,
                                      "I/O Read Time": 0.000,
                                      "I/O Write Time": 0.000
                                    },
                                    {
                                      "Node Type": "Hash",
                                      "Parent Relationship": "Inner",
                                      "Startup Cost": 1.16,
                                      "Total Cost": 1.16,
                                      "Plan Rows": 16,
                                      "Plan Width": 122,
                                      "Actual Startup Time": 0.265,
                                      "Actual Total Time": 0.265,
                                      "Actual Rows": 16,
                                      "Actual Loops": 1,
                                      "Output": ["cat.categoryname", "cat.category"],
                                      "Hash Buckets": 1024,
                                      "Hash Batches": 1,
                                      "Original Hash Batches": 1,
                                      "Peak Memory Usage": 1,
                                      "Shared Hit Blocks": 0,
                                      "Shared Read Blocks": 1,
                                      "Shared Dirtied Blocks": 0,
                                      "Shared Written Blocks": 0,
                                      "Local Hit Blocks": 0,
                                      "Local Read Blocks": 0,
                                      "Local Dirtied Blocks": 0,
                                      "Local Written Blocks": 0,
                                      "Temp Read Blocks": 0,
                                      "Temp Written Blocks": 0,
                                      "I/O Read Time": 0.000,
                                      "I/O Write Time": 0.000,
                                      "Plans": [
                                        {
                                          "Node Type": "Seq Scan",
                                          "Parent Relationship": "Outer",
                                          "Relation Name": "categories",
                                          "Schema": "public",
                                          "Alias": "cat",
                                          "Startup Cost": 0.00,
                                          "Total Cost": 1.16,
                                          "Plan Rows": 16,
                                          "Plan Width": 122,
                                          "Actual Startup Time": 0.250,
                                          "Actual Total Time": 0.252,
                                          "Actual Rows": 16,
                                          "Actual Loops": 1,
                                          "Output": ["cat.categoryname", "cat.category"],
                                          "Shared Hit Blocks": 0,
                                          "Shared Read Blocks": 1,
                                          "Shared Dirtied Blocks": 0,
                                          "Shared Written Blocks": 0,
                                          "Local Hit Blocks": 0,
                                          "Local Read Blocks": 0,
                                          "Local Dirtied Blocks": 0,
                                          "Local Written Blocks": 0,
                                          "Temp Read Blocks": 0,
                                          "Temp Written Blocks": 0,
                                          "I/O Read Time": 0.000,
                                          "I/O Write Time": 0.000
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "Node Type": "Hash",
                          "Parent Relationship": "Inner",
                          "Startup Cost": 220.00,
                          "Total Cost": 220.00,
                          "Plan Rows": 12000,
                          "Plan Width": 16,
                          "Actual Startup Time": 10.159,
                          "Actual Total Time": 10.159,
                          "Actual Rows": 12000,
                          "Actual Loops": 1,
                          "Output": ["o.netamount", "o.totalamount", "o.orderid"],
                          "Hash Buckets": 2048,
                          "Hash Batches": 1,
                          "Original Hash Batches": 1,
                          "Peak Memory Usage": 609,
                          "Shared Hit Blocks": 2,
                          "Shared Read Blocks": 98,
                          "Shared Dirtied Blocks": 0,
                          "Shared Written Blocks": 0,
                          "Local Hit Blocks": 0,
                          "Local Read Blocks": 0,
                          "Local Dirtied Blocks": 0,
                          "Local Written Blocks": 0,
                          "Temp Read Blocks": 0,
                          "Temp Written Blocks": 0,
                          "I/O Read Time": 0.000,
                          "I/O Write Time": 0.000,
                          "Plans": [
                            {
                              "Node Type": "Seq Scan",
                              "Parent Relationship": "Outer",
                              "Relation Name": "orders",
                              "Schema": "public",
                              "Alias": "o",
                              "Startup Cost": 0.00,
                              "Total Cost": 220.00,
                              "Plan Rows": 12000,
                              "Plan Width": 16,
                              "Actual Startup Time": 0.008,
                              "Actual Total Time": 5.548,
                              "Actual Rows": 12000,
                              "Actual Loops": 1,
                              "Output": ["o.netamount", "o.totalamount", "o.orderid"],
                              "Shared Hit Blocks": 2,
                              "Shared Read Blocks": 98,
                              "Shared Dirtied Blocks": 0,
                              "Shared Written Blocks": 0,
                              "Local Hit Blocks": 0,
                              "Local Read Blocks": 0,
                              "Local Dirtied Blocks": 0,
                              "Local Written Blocks": 0,
                              "Temp Read Blocks": 0,
                              "Temp Written Blocks": 0,
                              "I/O Read Time": 0.000,
                              "I/O Write Time": 0.000
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Node Type": "Hash",
                      "Parent Relationship": "Inner",
                      "Startup Cost": 3377.25,
                      "Total Cost": 3377.25,
                      "Plan Rows": 60350,
                      "Plan Width": 7,
                      "Actual Startup Time": 95.610,
                      "Actual Total Time": 95.610,
                      "Actual Rows": 60350,
                      "Actual Loops": 1,
                      "Output": ["c.state", "ch.orderid"],
                      "Hash Buckets": 8192,
                      "Hash Batches": 1,
                      "Original Hash Batches": 1,
                      "Peak Memory Usage": 2239,
                      "Shared Hit Blocks": 4,
                      "Shared Read Blocks": 811,
                      "Shared Dirtied Blocks": 0,
                      "Shared Written Blocks": 0,
                      "Local Hit Blocks": 0,
                      "Local Read Blocks": 0,
                      "Local Dirtied Blocks": 0,
                      "Local Written Blocks": 0,
                      "Temp Read Blocks": 0,
                      "Temp Written Blocks": 0,
                      "I/O Read Time": 0.000,
                      "I/O Write Time": 0.000,
                      "Plans": [
                        {
                          "Node Type": "Hash Join",
                          "Parent Relationship": "Outer",
                          "Join Type": "Inner",
                          "Startup Cost": 938.00,
                          "Total Cost": 3377.25,
                          "Plan Rows": 60350,
                          "Plan Width": 7,
                          "Actual Startup Time": 24.115,
                          "Actual Total Time": 74.639,
                          "Actual Rows": 60350,
                          "Actual Loops": 1,
                          "Output": ["c.state", "ch.orderid"],
                          "Hash Cond": "(ch.customerid = c.customerid)",
                          "Shared Hit Blocks": 4,
                          "Shared Read Blocks": 811,
                          "Shared Dirtied Blocks": 0,
                          "Shared Written Blocks": 0,
                          "Local Hit Blocks": 0,
                          "Local Read Blocks": 0,
                          "Local Dirtied Blocks": 0,
                          "Local Written Blocks": 0,
                          "Temp Read Blocks": 0,
                          "Temp Written Blocks": 0,
                          "I/O Read Time": 0.000,
                          "I/O Write Time": 0.000,
                          "Plans": [
                            {
                              "Node Type": "Seq Scan",
                              "Parent Relationship": "Outer",
                              "Relation Name": "cust_hist",
                              "Schema": "public",
                              "Alias": "ch",
                              "Startup Cost": 0.00,
                              "Total Cost": 930.50,
                              "Plan Rows": 60350,
                              "Plan Width": 8,
                              "Actual Startup Time": 0.294,
                              "Actual Total Time": 11.812,
                              "Actual Rows": 60350,
                              "Actual Loops": 1,
                              "Output": ["ch.customerid", "ch.orderid", "ch.prod_id"],
                              "Shared Hit Blocks": 2,
                              "Shared Read Blocks": 325,
                              "Shared Dirtied Blocks": 0,
                              "Shared Written Blocks": 0,
                              "Local Hit Blocks": 0,
                              "Local Read Blocks": 0,
                              "Local Dirtied Blocks": 0,
                              "Local Written Blocks": 0,
                              "Temp Read Blocks": 0,
                              "Temp Written Blocks": 0,
                              "I/O Read Time": 0.000,
                              "I/O Write Time": 0.000
                            },
                            {
                              "Node Type": "Hash",
                              "Parent Relationship": "Inner",
                              "Startup Cost": 688.00,
                              "Total Cost": 688.00,
                              "Plan Rows": 20000,
                              "Plan Width": 7,
                              "Actual Startup Time": 23.786,
                              "Actual Total Time": 23.786,
                              "Actual Rows": 20000,
                              "Actual Loops": 1,
                              "Output": ["c.state", "c.customerid"],
                              "Hash Buckets": 2048,
                              "Hash Batches": 1,
                              "Original Hash Batches": 1,
                              "Peak Memory Usage": 743,
                              "Shared Hit Blocks": 2,
                              "Shared Read Blocks": 486,
                              "Shared Dirtied Blocks": 0,
                              "Shared Written Blocks": 0,
                              "Local Hit Blocks": 0,
                              "Local Read Blocks": 0,
                              "Local Dirtied Blocks": 0,
                              "Local Written Blocks": 0,
                              "Temp Read Blocks": 0,
                              "Temp Written Blocks": 0,
                              "I/O Read Time": 0.000,
                              "I/O Write Time": 0.000,
                              "Plans": [
                                {
                                  "Node Type": "Seq Scan",
                                  "Parent Relationship": "Outer",
                                  "Relation Name": "customers",
                                  "Schema": "public",
                                  "Alias": "c",
                                  "Startup Cost": 0.00,
                                  "Total Cost": 688.00,
                                  "Plan Rows": 20000,
                                  "Plan Width": 7,
                                  "Actual Startup Time": 0.005,
                                  "Actual Total Time": 16.771,
                                  "Actual Rows": 20000,
                                  "Actual Loops": 1,
                                  "Output": ["c.state", "c.customerid"],
                                  "Shared Hit Blocks": 2,
                                  "Shared Read Blocks": 486,
                                  "Shared Dirtied Blocks": 0,
                                  "Shared Written Blocks": 0,
                                  "Local Hit Blocks": 0,
                                  "Local Read Blocks": 0,
                                  "Local Dirtied Blocks": 0,
                                  "Local Written Blocks": 0,
                                  "Temp Read Blocks": 0,
                                  "Temp Written Blocks": 0,
                                  "I/O Read Time": 0.000,
                                  "I/O Write Time": 0.000
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "Planning Time": 26.171,
    "Triggers": [
    ],
    "Execution Time": 726.800
  }
]`;

export var SAMPLE_QUERY = `SELECT c.state,
  cat.categoryname,
  sum(o.netamount),
  sum(o.totalamount)
FROM customers c
  INNER JOIN cust_hist ch ON c.customerid = ch.customerid
  INNER JOIN orders o ON ch.orderid = o.orderid
  INNER JOIN orderlines ol ON ol.orderid = o.orderid
  INNER JOIN products p ON ol.prod_id = p.prod_id
  INNER JOIN categories cat ON p.category = cat.category
GROUP BY c.state, cat.categoryname
ORDER BY c.state, sum(o.totalamount) DESC
LIMIT 10 OFFSET 1`;
