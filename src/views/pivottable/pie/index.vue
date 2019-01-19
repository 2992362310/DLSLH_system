<template>
    <div id="output" ref="pivotDiv"></div>
</template>

<script>

import Plotly from 'plotly.js-dist'
import $ from "jquery"
import jqueryui from 'jqueryui'

import "pivottable/dist/pivot.min.css"
import pivottable from "pivottable"
import plotly_renderers from "pivottable/dist/plotly_renderers"
import "pivottable/dist/pivot.zh.js"
import lcsJson from '@/assets/lcsbj01.json'

export default {
    data() {
        return{}
    },
    mounted() {
        this.initPivotTable();
    },
    methods: {
        initPivotTable() {

            // var inputdata=[{color: "blue", shape: "circle"},
            //         {color: "red", shape: "triangle"}];

            let inputdata = [];

            for(var i in lcsJson.features){
                inputdata.push(lcsJson.features[i].attributes)
            };
            
            //let derivers = $.pivotUtilities.derivers;
            // let renderers = $.extend(
            //     $.pivotUtilities.renderers,
            //     $.pivotUtilities.plotly_renderers,
            // );
            
            $("#output").pivotUI(inputdata,{
                    //renderers: renderers,
                    localeStrings:$.pivotUtilities.locales.zh.localeStrings,
                    aggregators:$.pivotUtilities.locales.zh.aggregators,
                    renderers:$.pivotUtilities.locales.zh.renderers,
                    rendererName: "多饼图",
                    aggregatorName: "求和",
                    vals: ["面积"],
                    rows: ["生态功"], cols: ["县区"]
                }
            );
        }
    }
}
</script>

<style>
#output{
    margin: 30px
}
</style>

