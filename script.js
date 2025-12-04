const colorInput = document.getElementById("color");
const brushSize = document.getElementById("size");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const rectBtn = document.getElementById("rectangle");
const circleBtn = document.getElementById("circle");
const clearBtn = document.getElementById("clear");
const downloadBtn = document.getElementById("download");

const canvas = document.getElementById("canvas");

canvas.height = 650;
canvas.width = 1200;

// creating object of canvas
const ctx = canvas.getContext("2d");

let currentTool = "pen";

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "#000000";

let isdrawing = false;
let savedImage;
let rectStartX, rectStartY;
let circleStartX, circleStartY;

function startDraw(e) {
    isdrawing = true;

    if(currentTool == "rectangle") {
        rectStartX = e.offsetX;
        rectStartY = e.offsetY;

        savedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return;
    }

    if(currentTool == "circle") {
        circleStartX = e.offsetX;
        circleStartY = e.offsetY;

        savedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return;
    }

    ctx.beginPath();
    ctx.moveTo(e.offsetX , e.offsetY)
}

function draw(e) {
    if(!isdrawing) return;
    ctx.strokeStyle = currentTool == "eraser" ? "#ffffff" : colorInput.value;
    ctx.lineWidth = brushSize.value;

    if(currentTool == "rectangle") {
        ctx.putImageData(savedImage, 0, 0);

        const width = e.offsetX - rectStartX;
        const height = e.offsetY - rectStartY;

        ctx.beginPath();
        ctx.rect(rectStartX, rectStartY, width, height);
        ctx.stroke();
        return;
    }

    if(currentTool == "circle") {
        ctx.putImageData(savedImage, 0, 0);

        const dx = e.offsetX - circleStartX;
        const dy = e.offsetY - circleStartY;
        const radius = Math.sqrt(dx * dx + dy * dy);

        ctx.beginPath();
        ctx.arc(circleStartX, circleStartY, radius, 0, Math.PI * 2);
        ctx.stroke();
        return;
    }

    ctx.lineTo(e.offsetX , e.offsetY);
    ctx.stroke(); 
    ctx.beginPath();
    ctx.moveTo(e.offsetX , e.offsetY)
}

function stopDraw(e) {
    if(!isdrawing) return;
    if(currentTool == "rectangle"){
        ctx.putImageData(savedImage, 0, 0)
        const width = e.offsetX - rectStartX;
        const height = e.offsetY - rectStartY;
        
        ctx.beginPath();
        ctx.rect(rectStartX, rectStartY, width, height);
        ctx.stroke();
        
    }
    
    if(currentTool == "circle") {
        ctx.putImageData(savedImage, 0, 0);
        
        const dx = e.offsetX - circleStartX;
        const dy = e.offsetY - circleStartY;
        const radius = Math.sqrt(dx * dx + dy * dy);
        
        ctx.beginPath();
        ctx.arc(circleStartX, circleStartY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
    }
    isdrawing = false;
}

penBtn.addEventListener('click', function() {
    currentTool = "pen";
    document.querySelectorAll(".button").forEach(btn => btn.classList.remove("active"));
    penBtn.classList.add("active");
});

eraserBtn.addEventListener('click', function() {
    currentTool = "eraser";
    document.querySelectorAll(".button").forEach(btn => btn.classList.remove("active"));
    eraserBtn.classList.add("active");
});

rectBtn.addEventListener('click', function() {
    currentTool = "rectangle";
    document.querySelectorAll(".button").forEach(btn => btn.classList.remove("active"));
    rectBtn.classList.add("active");
});

circleBtn.addEventListener('click', function() {
    currentTool = "circle";
    document.querySelectorAll(".button").forEach(btn => btn.classList.remove("active"));
    circleBtn.classList.add("active");
});

clearBtn.addEventListener('click', function() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
});

downloadBtn.addEventListener('click', function() {
    const link = document.createElement("a");
    
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
})

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseleave', stopDraw);