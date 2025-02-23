// JSON Data
const data = {
    "genuses": [
        {
            "name": "Tortula",
            "occurences": 96,
            "subgenena": [
                { "name": "Tortula muralis", "occurrences": 96 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 }
            ]
        },
        {
            "name": "Rubus",
            "occurences": 112,
            "subgenena": [
                { "name": "Tortula muralis", "occurrences": 96 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 }
            ]
        },
        {
            "name": "Convolvulus",
            "occurences": 89,
            "subgenena": [
                { "name": "Tortula muralis", "occurrences": 96 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 }
            ]
        },
        {
            "name": "Phragmites",
            "occurences": 57,
            "subgenena": [
                { "name": "Tortula muralis", "occurrences": 96 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 },
                { "name": "Rubus fruticosus", "occurrences": 84 },
                { "name": "Rubus anglocandicans", "occurrences": 28 }
            ]
        },
        {
            "name": "Pentanema",
            "occurences": 13,
            "subgenena": [
                { "name": "Pentanema salicinum", "occurrences": 13 }
            ]
        }
    ]
};

// Set up dimensions
const width = 800, height = 500, padding = 50;

// Create the SVG element
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// Create the color scale
const colorScale = d3.scaleOrdinal()
    .domain(data.genuses.map(d => d.name))
    .range(d3.schemeCategory10);

// Function to render bubbles
function renderBubbles(dataset, parentGenus = null) {
    // Create pack layout
    const pack = d3.pack()
        .size([width - padding, height - padding])
        .padding(5);

    // Create hierarchy
    const hierarchy = d3.hierarchy({ children: dataset })
        .sum(d => d.occurences);

    // Compute layout
    const root = pack(hierarchy);
 
    // Create new bubbles
    const bubbles = svg.selectAll(".bubble")
        .data(root.descendants().slice(1)) // Ignore root node
        .enter()
        .append("g")
        .attr("class", "bubble")
        .attr("transform", d => `translate(${d.x + padding}, ${d.y + padding})`)
        .on("click", (event, d) => {
            if (!parentGenus && d.data.subgenena) {
                // Remove old bubbles
                svg.selectAll(".bubble").remove();
                renderBubbles2(d.data.subgenena, d.data.name); // Show subgenus
                console.log("SUBGENEA");
                console.log(d.data.subgenena);
                console.log(d.data.name);
            } else {
                renderBubbles(data.genuses); // Return to genus view
            }
        });

    // Add circles
    bubbles.append("circle")
        .attr("r", d => d.r)
        .attr("fill", d => colorScale(parentGenus || d.data.name))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Add text
    bubbles.append("text")
        .attr("dy", "-0.4em")
        .text(d => d.data.name);

    bubbles.append("text")
        .attr("dy", "1em")
        .text(d => d.data.occurences);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
function renderBubbles2(dataset, parentGenus = null) {
    // Create pack layout
    const pack = d3.pack()
        .size([width - padding, height - padding])
        .padding(5);

    // Create hierarchy
    const hierarchy = d3.hierarchy({ children: dataset })
        .sum(d => d.occurences);


    // Compute layout
    const root = pack(hierarchy);
 
    // Create new bubbles
    const bubbles = svg.selectAll(".bubble")
        .data(root.descendants().slice(1)) // Ignore root node
        .enter()
        .append("g")
        .attr("class", "bubble")
        .attr("transform", d => `translate(${getRandomIntInclusive(0, 700) + padding}, ${getRandomIntInclusive(0, 500) + padding})`)
        .on("click", (event, d) => {
            // Remove old bubbles
            svg.selectAll(".bubble").remove();
            renderBubbles2(d.data.subgenena, d.data.name); // Show subgenus
            console.log("SUBGENEA");
            console.log(d.data.subgenena);
            console.log(d.data.name);
        });


    // Add circles
    bubbles.append("circle")
        .attr("r", d => getRandomIntInclusive(50, 125))
        .attr("fill", d => colorScale(parentGenus || d.data.name))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Add text
    bubbles.append("text")
        .attr("dy", "-0.4em")
        .text(d => d.data.name);

    bubbles.append("text")
        .attr("dy", "1em")
        .text(d => d.data.occurences);
}

// Initial render
renderBubbles(data.genuses);
