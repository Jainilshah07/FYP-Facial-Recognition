import React from 'react'
// import { PieChart } from '@mui/x-charts/PieChart';
import { PieChart } from '@mui/x-charts/PieChart'

const BasicPie = () => {
  return (
    <div>
        <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Support' },
            { id: 1, value: 15, label: 'Security' },
            { id: 2, value: 20, label: 'HR' },
          ],
        },
      ]}
      width={350}
      height={200}
    />
    </div>
  )
}

export default BasicPie