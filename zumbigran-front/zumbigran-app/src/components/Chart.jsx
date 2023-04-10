import React from 'react'

import ApexChart from 'react-apexcharts'

export default function Chart({options, series, type}) {
  return (
    <div style={{width: "100%"}}>
        <ApexChart options={options} series={series} type={type}/>
    </div>
  )
}
