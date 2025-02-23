// JSON Data
const data = {
    "genuses": [
        { "name": "Tortula", "occurenceTotalGenus": 96 },
        { "name": "Rubus", "occurenceTotalGenus": 112 },
        { "name": "Convolvulus", "occurenceTotalGenus": 89 },
        { "name": "Phragmites", "occurenceTotalGenus": 57 },
        { "name": "Pentanema", "occurenceTotalGenus": 13 }
    ]
};

// Set up dimensions
const width = 800, height = 500, padding = 50;

// Create the SVG element
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// Create the pack layout
const pack = d3.pack()
    .size([width - padding, height - padding])
    .padding(5);

// Create the hierarchy from the data
const hierarchy = d3.hierarchy({ children: data.genuses })
    .sum(d => d.occurenceTotalGenus);

// Compute the pack layout
const root = pack(hierarchy);

// Create the color scale
const colorScale = d3.scaleOrdinal()
    .domain(data.genuses.map(d => d.name))
    .range(d3.schemeCategory10);

// Create the bubbles
const bubbles = svg.selectAll(".bubble")
    .data(root.descendants().slice(1)) // Ignore the root node
    .enter()
    .append("g")
    .attr("class", "bubble")
    .attr("transform", d => `translate(${d.x + padding}, ${d.y + padding})`)
    .on("click", (event, d) => alert(`Genus: ${d.data.name}\nOccurrences: ${d.data.occurenceTotalGenus}`)); // Click event

// Add circles to bubbles
bubbles.append("circle")
    .attr("r", d => d.r)
    .attr("fill", d => colorScale(d.data.name))
    .attr("stroke", "black")
    .attr("stroke-width", 1);

// Add text labels
bubbles.append("text")
    .attr("dy", "-0.4em")
    .text(d => d.data.name);

bubbles.append("text")
    .attr("dy", "1em")
    .text(d => d.data.occurenceTotalGenus);
