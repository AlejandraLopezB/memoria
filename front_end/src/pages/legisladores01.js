import React from "react"
import Layout from "../components/layout"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import highchartsItem from "highcharts/modules/item-series"
import { gql, useQuery } from '@apollo/client';

// init the module
highchartsItem(Highcharts);

const GET_LEGISLADORES = gql`
	query getLegisladores {
        legisladores(periodo:9) {
			idpersona
			genero
        }
	}
`;

function Legisladores() {
	const { loading, error, data } = useQuery(GET_LEGISLADORES);
  
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	var hombres = data.legisladores.filter(element => element.genero === "M").length;
	var mujeres = data.legisladores.filter(element => element.genero === "F").length;

	console.log("Hombres: ", hombres)
	console.log("Mujeres: ", mujeres)

	const options = {
		chart: {
			type: 'item',
			backgroundColor: '#191919'
		},
	
		title: {
			text: 'Legisladores',
			style: {
				color: '#E6E6E6'
			}
		},
	
		subtitle: {
			text: 'Parliament visualization'
		},
	
		legend: {
			labelFormat: '{name} <span style="opacity: 0.4">{y}</span>',
			itemStyle: {
				color: '#E6E6E6'
			}
		},
	
		series: [{
			name: 'Representatives',
			keys: ['name', 'y', 'color', 'label'],
			data: [
				['Hombres', hombres, '#96F5F5', 'Hombres'],
				['Mujeres', mujeres, '#ecad08', 'Mujeres']
			],
			dataLabels: {
				enabled: true,
				format: '{point.label}',
				color: '#E6E6E6',
				style: {
					textOutline: 'none'
				}
			},
	
			// Circular options
			center: ['50%', '88%'],
			size: '170%',
			startAngle: -100,
			endAngle: 100
		}]
	}

	return(
		<HighchartsReact
			highcharts={Highcharts}
			constructorType = { 'chart' }
			options={options}
		/>
	)
}

export default function Home() {
    return (
		<Layout>
            <Legisladores></Legisladores>
        </Layout>
    )
}