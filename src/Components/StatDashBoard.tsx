import React, { useState } from 'react'
import StatDashBoardStyles from '../Styles/Components/StatDashBoardStyles'
import { BarChart } from "react-native-chart-kit";
import { Resource, User } from 'rr-apilib';
import { View } from 'react-native';
import { COLORS } from '../Styles/Colors';

interface Props {
    user: User;
}

export default function StatDashBoard({user} : Props) {
    const date:Date = new Date();
    const month:string[] = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];

    if(!user) {
        return (
            <View></View>
        )
    }

    const [resources] = useState<Resource[]>(Array.from(user.resources.cache.values()));

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
        backgroundGradientFrom: COLORS.componentBackground,
        backgroundGradientTo: COLORS.componentBackground,
        color: (opacity = 1) => `rgba(3, 152, 158, ${opacity})`,
        labelColor : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 1.3,
    }

    return (
        <View style={StatDashBoardStyles.container}>
            <BarChart data={data} width={350} height={300} yAxisLabel="" yAxisSuffix="" fromZero={true} verticalLabelRotation={0} yAxisInterval={1} chartConfig={chartConfig} />
        </View>
        
  )
}