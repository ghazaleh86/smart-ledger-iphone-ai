
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const SpendingInsights = () => {
  const pieChartRef = useRef<SVGSVGElement>(null);
  const barChartRef = useRef<SVGSVGElement>(null);

  const categoryData = [
    { name: 'Meals & Entertainment', value: 680, color: '#f59e0b' },
    { name: 'Transportation', value: 420, color: '#10b981' },
    { name: 'Shopping', value: 380, color: '#f97316' },
    { name: 'Bills & Utilities', value: 320, color: '#a855f7' },
    { name: 'Other', value: 540, color: '#ef4444' },
  ];

  const weeklyData = [
    { week: 'Week 1', spent: 520 },
    { week: 'Week 2', spent: 680 },
    { week: 'Week 3', spent: 450 },
    { week: 'Week 4', spent: 690 },
  ];

  useEffect(() => {
    if (!pieChartRef.current) return;

    const svg = d3.select(pieChartRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 240;
    const radius = Math.min(width, height) / 2 - 20;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<any>()
      .innerRadius(50)
      .outerRadius(radius);

    const tooltip = d3.select("body").selectAll(".d3-tooltip").data([0])
      .join("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid #e5e7eb")
      .style("border-radius", "8px")
      .style("padding", "12px")
      .style("box-shadow", "0 10px 15px -3px rgba(0, 0, 0, 0.1)")
      .style("font-size", "14px")
      .style("z-index", "1000");

    const arcs = g.selectAll(".arc")
      .data(pie(categoryData))
      .enter().append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => d.data.color)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        tooltip
          .style("visibility", "visible")
          .html(`<div style="font-weight: 600; color: #111827;">${d.data.name}</div>
                 <div style="color: #6b7280;">Amount: <span style="font-weight: 600;">$${d.data.value}</span></div>`);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });
  }, []);

  useEffect(() => {
    if (!barChartRef.current) return;

    const svg = d3.select(barChartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, left: 40, bottom: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 240 - margin.top - margin.bottom;

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(weeklyData.map(d => d.week))
      .range([0, width])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(weeklyData, d => d.spent) || 0])
      .nice()
      .range([height, 0]);

    const tooltip = d3.select("body").selectAll(".d3-bar-tooltip").data([0])
      .join("div")
      .attr("class", "d3-bar-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid #e5e7eb")
      .style("border-radius", "8px")
      .style("padding", "12px")
      .style("box-shadow", "0 10px 15px -3px rgba(0, 0, 0, 0.1)")
      .style("font-size", "14px")
      .style("z-index", "1000");

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("fill", "#6b7280")
      .style("font-size", "12px");

    g.append("g")
      .call(d3.axisLeft(y).tickFormat(d => `$${d}`))
      .selectAll("text")
      .style("fill", "#6b7280")
      .style("font-size", "12px");

    g.selectAll(".bar")
      .data(weeklyData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.week) || 0)
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.spent))
      .attr("height", d => height - y(d.spent))
      .attr("fill", "#3b82f6")
      .attr("rx", 6)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        tooltip
          .style("visibility", "visible")
          .html(`<div style="font-weight: 600; color: #111827;">${d.week}</div>
                 <div style="color: #6b7280;">Amount: <span style="font-weight: 600;">$${d.spent}</span></div>`);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
      });

    // Remove default axis lines
    g.select(".domain").remove();
    g.selectAll(".tick line").remove();

    // Add grid lines
    g.selectAll(".grid-line")
      .data(y.ticks())
      .enter().append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .style("stroke", "#e5e7eb")
      .style("stroke-dasharray", "3,3");
  }, []);

  return (
    <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-8">This Month's Insights</h3>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-amber-50 rounded-lg p-6 border-0">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-5 h-5 text-amber-600" />
            <div className="text-2xl font-semibold text-gray-800">$2,340</div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Total Spent</div>
          <div className="flex items-center text-xs text-orange-600 font-medium">
            <TrendingDown className="w-3 h-3 mr-1" />
            12% less than last month
          </div>
        </div>
        
        <div className="bg-emerald-50 rounded-lg p-6 border-0">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <div className="text-2xl font-semibold text-gray-800">$4,820</div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Total Income</div>
          <div className="text-xs text-emerald-600 font-medium">On track for goals</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border-0 hidden lg:block">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <div className="text-2xl font-semibold text-gray-800">$2,480</div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Net Savings</div>
          <div className="text-xs text-emerald-600 font-medium">+5.2% from last month</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border-0 hidden lg:block">
          <div className="text-2xl font-semibold text-gray-800 mb-2">73%</div>
          <div className="text-sm text-gray-600 mb-4">Budget Used</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-400 h-2 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </div>
      </div>

      {/* Desktop Charts */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-orange-50 rounded-lg p-6 border-0">
          <h4 className="font-semibold text-gray-800 mb-6">Spending by Category</h4>
          <div className="flex justify-center">
            <svg ref={pieChartRef}></svg>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-6 border-0">
          <h4 className="font-semibold text-gray-800 mb-6">Weekly Spending Trend</h4>
          <div className="flex justify-center">
            <svg ref={barChartRef}></svg>
          </div>
        </div>
      </div>

      {/* Top Categories (Always Visible) */}
      <div className="bg-slate-50 rounded-lg p-6 border-0">
        <h4 className="font-semibold text-gray-800 mb-6">Top Categories</h4>
        <div className="space-y-4">
          {categoryData.slice(0, 3).map((category, index) => (
            <div key={category.name} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">${category.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
