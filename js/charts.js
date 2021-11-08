jQuery(function ($) {
    $(document).ready(function () {
        if(typeof chartData != 'undefined'){
            if(chartData.length > 0){
                DrawCharts(chartData);
            }
        }
        $( window ).resize(function() {
            if(typeof chartData != 'undefined'){
                if(chartData.length > 0){
                    ClearChart(chartData);
                    DrawCharts(chartData);
                }
            }
        });
        function ClearChart(chartData){
            $('.doughnutTipExpand').remove();
            $('.pyraamidTip').remove();
            $('.doughnutTip').remove();
            $('.pieTip').remove();
            for(let i = 0; i < chartData.length; i++){
                if(chartData[i].type !== 'radialbar' && chartData[i].type !== 'radialBar2'){
                    $(chartData[i].element).html(' ');
                    $(chartData[i].element).parents('.chart-content').find('.legend .legend-list').html(' ');
                    $(chartData[i].element).parents('.chart-content').find('.legend-wrap').remove();
                }
            }
        }
        function DrawCharts(chartData){
            for(let i = 0; i < chartData.length; i++){
                if(chartData[i].element && chartData[i].data){
                    if(chartData[i].type == 'lineDot'){
                        drawLineDot(chartData[i].element, chartData[i].data, chartData[i].dotColor);
                    }
                    if(chartData[i].type == 'lineChart'){
                        drawLineChart(chartData[i].element, chartData[i].data);
                    }
                    if(chartData[i].type == 'pieRound'){
                        drawPieRound(chartData[i].element, chartData[i].data, chartData[i].innerValue, chartData[i].innerText );
                    }
                }
            }
        }
        function drawLineChart(element, data) {
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
                var str = '<div class="lineChartcont">';
                str += '<div class="lineChartlist">';
                for (let i = 0; i < data.length; i++) {
                    let lineStyle = 'background: linear-gradient(317.7deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0.4) 105.18%), ' + data[i].background + ';';
                    lineStyle += 'box-shadow: inset -2.5px -2.5px 5px rgba(250, 251, 255, 0.1), inset 2.5px 2.5px 5px '+ data[i].background2 +';'; 
                    str += 
                    '<div class="lineChartRow">'
                    +'  <div class="line-col">'
                    +'      <div class="line">'
                    +'          <div class="active-line" style="width: '+ percentPosition[i] + '%;' + lineStyle + '"></div>'
                    +'      </div>'
                    +'  </div>'
                    +'   <div class="label-row">'
                    +'      <div class="label">' + data[i].labelText  +'</div>'
                    +'      <div class="value">'+ data[i].progress + ' шт. / ' + percentValue[i] + '%'
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
        function drawPieRound(element, data, innerValue, innerText){
            if($(element).length==1 && data.length > 0){
                var newData = data;
                var total = 0;
                $(element).addClass('rounded');
                for (let i = 0; i < data.length; i++) {
                    newData[i].title = data[i].labelText;
                    newData[i].color = data[i].background;
                    newData[i].value = parseInt(data[i].progress);
                    total = total + parseInt(data[i].progress);
                }
                if(newData) {
                    if(total > 0) {
                        $(element).drawPieChart(newData);
                    }
                    drawLegend(element, data);
                    if(innerText && innerValue){
                        addCenterText(element, innerValue, innerText);
                    }
                }
            }
        }
        function drawLegend(element, data){
            if($(element).parents('.pieRound').find('.legend-wrap').length === 0){
                let legendHtml = '<div class="legend-wrap"><div class="legend-list"></div></div>';
                $(legendHtml).appendTo($(element).parents('.pieRound'));
            }
            let legend = $(element).parents('.pieRound').find('.legend-wrap .legend-list');
            let segmentTotal = 0;
            for (let i = 0, len = data.length; i < len; i++){
                if(data[i].value) {
                    segmentTotal += data[i].value;
                }
            }
            //percent for each value
            for (let i = 0, len = data.length; i < len; i++){
                if(data[i].value) {
                    data[i].percent = Math.round((100/segmentTotal)*data[i].value);
                }
                else {
                    data[i].percent = 0;
                }
            }
            for (let i = 0, len = data.length; i < len; i++){
                let legendRow = 
                '<div class="legend-item">'
                +'    <div class="circle" style="background: '+ data[i].color +'; box-shadow: 0px 7px 8px -1px '+ data[i].color +'50;"></div>'
                +'  <div class="label-col">'
                +'      <div class="value">'
                + data[i].value +' шт. / ' + data[i].percent + '%'
                +'      </div>'
                +'      <div class="label">'
                + data[i].title
                +'      </div>'
                +'  </div>'
                +'</div>';
                $(legendRow).appendTo(legend);
            }
            console.log(legend);
        }
        function addCenterText(element, value, text){
            if($(element).length > 0 && value && text){
                let innerText = 
                '<div class="inner-circle">'
                +'<div class="inner-text">'
                + '<div class="value">'
                + value
                + '</div>'
                + '<div class="text">'
                + text
                + '</div>'
                + '</div>'
                + '</div>';
                $(innerText).appendTo(element);
            }
        }
    });
});