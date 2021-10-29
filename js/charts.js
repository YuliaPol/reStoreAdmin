jQuery(function ($) {
    $(document).ready(function () {
        if(typeof chartData != 'undefined'){
            if(chartData.length > 0){
                DrawCharts(chartData);
            }
        }
        function DrawCharts(chartData){
            for(let i = 0; i < chartData.length; i++){
                if(chartData[i].element && chartData[i].data){
                    if(chartData[i].type == 'lineDot'){
                        drawLineDot(chartData[i].element, chartData[i].data, chartData[i].dotColor);
                    }
                }
            }
        }
        function drawLineDot(element, data, dotColor) {
            if(data.length > 0 && $(element).length>0) {
                var maxValue = parseInt(data[0].progress);
                var minValue = parseInt(data[0].progress);
                var total = 0;
                for (let i = 0; i < data.length; i++) {
                    total += parseInt(data[i].progress);
                    if(maxValue<data[i].progress){
                        maxValue = parseInt(data[i].progress);
                    }
                    if(minValue>data[i].progress){
                        minValue = parseInt(data[i].progress);
                    }
                }
                var maxAxes = 1;
                var minAxes = 0;
                var axes = new Array();
                var step = 1;
                if(maxValue < 1) {
                    maxAxes = Math.round(maxValue*10)/10 + 0.1;
                    step = 0.1;
                }
                else if(maxValue < 10) {
                    maxAxes = Math.round(maxValue)/ + 1;
                    step = 1;
                }
                else {
                    step = 5;
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
                    maxAxes = maxValue + step;
                    if(minValue > step && maxAxes > 100){
                        minAxes = step;
                    }
                }
                var axesValue = minAxes;
                for (let i = 0; axesValue < maxAxes + step; i++) {
                    axes.push(axesValue);
                    axesValue = axesValue + step;
                }
            
                var percentValue = new Array(data.length);
                var percentPosition = new Array(data.length);
            
                var minValuePosition = axes[0];
                var maxValuePosition = axes[axes.length-1];
                var axesRange = maxValuePosition - minValuePosition;
                var positionPercent = 100/axesRange;
                var valuePercent = 100/total;
            
                for (let i = 0; i < data.length; i++) {
                    if(parseInt(data[i].progress) > 0){
                        percentValue[i] = Math.round(valuePercent*parseInt(data[i].progress));
                        percentPosition[i] = Math.round(positionPercent*(parseInt(data[i].progress) - minValuePosition));
                    }
                    else {
                        percentValue[i] = 0;
                        percentPosition[i] = 0;
                    }
                }
        
                let tooltipValue = ' ';
                var str = '<div class="lineDotcont">';
                str += '<div class="lineDotlist">';
                for (let i = 0; i < data.length; i++) {
                    var label = 'баллов';
                    if($.isNumeric(data[i].labelText)) {
                        if(data[i].labelText == '1'){
                            label = 'балл';
                        }
                        else if(data[i].labelText == '2' || data[i].labelText == '3' || data[i].labelText == '4'){
                            label = 'балла';
                        }
                    }
                    else {
                        label = ' ';
                    }
                    if($(element).parents('.charts-for-pdf').length > 0){
                        tooltipValue = '<div class="tooltip-value">' + percentValue[i] + '% / ' + data[i].progress + ' шт</div>';
                    }
                    str += 
                    '<div class="lineDotRow">'
                    +'    <div class="label">' + data[i].labelText + ' ' + label
                    + tooltipValue
                    +'</div>'
                    +'  <div class="line-col">'
                    +'      <div class="line" style="background: linear-gradient(90deg, '+ data[i].backgroundStart + ' 0%, '+ data[i].backgroundEnd + ' 100%);">'
                    +'          <div class="dot" style="left: calc('+ percentPosition[i] + '% - 7px);border-color: '+ dotColor +'"></div>'
                    +'          <div class="tooltip" style="left: calc('+ percentPosition[i] + '% - 50px);">' + percentValue[i] + '% / ' + data[i].progress + ' шт</div>'
                    +'      </div>'
                    +'  </div>'
                    +'</div>';
                }
                str += '</div>';
                str += '<div class="y-axis">';
                for (let i = 0; i < axes.length; i++) {
                    str +=
                    '<div class="axis-item">'
                    +'    ' + axes[i] + '<br>'
                    +'  шт'
                    +'</div>';
                }
                str += '</div>';
                str += '</div>';
                $(element).append(str);
            }
        }
    });
});