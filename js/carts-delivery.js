/** Bar charts */
if(typeof barChartData !== "undefined"){
    if(barChartData.length > 0){
        for (let i = 0; i < barChartData.length; i++) {
            drawBarChart(barChartData[i]);
        }
    }
}

function drawBarChart(barEl){
    let barData = barEl.data;
    let maxValue = 10;
    for (let i = 0; i < barData.length; i++) {
        if(parseInt(barData[i].progress) > maxValue){
            maxValue = parseInt(barData[i].progress);
        }
    }
    var maxAxes = maxValue + maxValue*0.2;
    var minAxes = 0;
    var axes = new Array();
    var step = 5;
    while ((maxValue + step)/step > 9 || step>10000){
        if(step >=200) {
            step += 100;
        }
        else if(step >=50) {
            step += 50;
        }
        else if(step >=30) {
            step += 10;
        }
        else {
            step += 5;
        }
    }
    var axesValue = minAxes;
    for (let i = 0; axesValue < maxAxes + step; i++) {
        axes.push(axesValue);
        axesValue = axesValue + step;
    }
    let percent = 100/axesValue;
    let barHtml = "";
    for (let i = 0; i < barData.length; i++) {
        barHtml += 
        `<div class="bar five-el-bar">
            <div class="bar-bg">
                <div class="bar-content pink-bar-content" style="height:0%;background:${barEl.color}">
                    <div class="bar-tooltip">
                        <p class="tooltip-count"><span class="count-val">${barData[i].progress}</span>шт</p>
                    </div>
                </div>
            </div>
            <div class="bar-name">${barData[i].labelText}</div>
        </div>`; 
    }
    barHtml += `<div class="y-scale">`;
    for (let i = 0; i < axes.length; i++) {
        if(i === 0){
            barHtml += `<div class="scale"><span class="y-scale-number"></span></div>`;
        } else {
            barHtml += `<div class="scale"><span class="y-scale-number">${axes[i]} шт.</span></div>`;
        }
    }
    barHtml += 
    `</div>`;
    if($(barEl.element).length > 0){
        $(barEl.element).html(barHtml);
        let bars = $(barEl.element).find('.bar');
        setTimeout(() => {
            for (let i = 0; i < bars.length; i++) {
                let percentItem = Math.round(percent*parseInt(barData[i].progress)) + '%';
                $(bars[i]).find('.bar-content').css('height', percentItem);
            }
        }, 100);
    }
}