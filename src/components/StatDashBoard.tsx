import React, { useState } from 'react'
import StatDashBoardStyles from '../styles/Component/StatDashBoardStyles'
import { BarChart } from "react-native-chart-kit";
import { Client, Resource } from 'rr-apilib';

interface Props {
    client: Client;
}

export default function StatDashBoard({client} : Props) {
    const date:Date = new Date();
    const month:string[] = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novemebre","Décembre"];

    const [resources] = useState<Resource[]>(Array.from(client.resources.cache.values()));

    let numberResourceFirstMonth:number = 0;
    let numberResourceSecMonth:number = 0;
    let numberResourceThirdMonth:number = 0;

    const firstMonth:number = date.getMonth()-2 < 0 ? date.getMonth()-2+12 : date.getMonth()-2;
    const secMonth:number = date.getMonth()-1 < 0 ? date.getMonth()-1+12 : date.getMonth()-1;
    const thirdMonth:number = date.getMonth();

    resources.map((resource) => {
        if(resource.createdAt.getMonth() == firstMonth){
            numberResourceFirstMonth++;
        }
        else if(resource.createdAt.getMonth() == secMonth){
            numberResourceSecMonth++;
        }
        else if(resource.createdAt.getMonth() == thirdMonth){
            numberResourceThirdMonth++;
        }
    });

    const data = {
        labels: [month[firstMonth], month[secMonth], month[thirdMonth]],
        datasets: [
            {
                data: [numberResourceFirstMonth, numberResourceSecMonth, numberResourceThirdMonth]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#F0F0F0",
        backgroundGradientTo: "#F0F0F0",
        color: (opacity = 1) => `rgba(3, 152, 158, ${opacity})`,
        labelColor : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 1.5,
    }

    return (
        <BarChart style={StatDashBoardStyles.container} data={data} width={320} height={300} yAxisLabel="" yAxisSuffix="" fromZero={true} verticalLabelRotation={0} yAxisInterval={1} chartConfig={chartConfig} />
  )
}