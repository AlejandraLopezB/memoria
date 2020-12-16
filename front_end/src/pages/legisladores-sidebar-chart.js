import React, { useState } from "react"
import Layout from "../components/layout"
import HomeNav from "../components/homeNav"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const GET_PARTIDOS = gql`
	query getPartidos {
		personaPorPartidoYPeriodo {
			persona {
				cargo
			}
			partidoPorPeriodo {
				periodoLegislativo {
					periodo_legislativo
				}
				partidoPolitico {
					nombre
				}
			}
		}
	}
`;

function Legisladores(props) {

	var { loading, error, data } = useQuery(GET_PARTIDOS);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	data = data.personaPorPartidoYPeriodo
	var periodo8 = data.filter(element => parseInt(element.partidoPorPeriodo.periodoLegislativo.periodo_legislativo) === 8)
	var periodo9 = data.filter(element => parseInt(element.partidoPorPeriodo.periodoLegislativo.periodo_legislativo) === 9)
	var dataPartidos = [];
	var total_por_periodo = {
		periodo8: 0,
		periodo9: 0
	}

	if (props.legisladores === "todos") {
		periodo8.forEach(element => {
			if(!dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				dataPartidos.push({
					name: element.partidoPorPeriodo.partidoPolitico.nombre,
					data: [1,0]
				})
			} else if(dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				var i = dataPartidos.findIndex(function(item, i){
					return item.name === element.partidoPorPeriodo.partidoPolitico.nombre
				})
				dataPartidos[i].data[0] += 1
			}
		})
		periodo9.forEach(element => {
			if(!dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				dataPartidos.push({
					name: element.partidoPorPeriodo.partidoPolitico.nombre,
					data: [0,1]
				})
			} else if(dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				var i = dataPartidos.findIndex(function(item, i){
					return item.name === element.partidoPorPeriodo.partidoPolitico.nombre
				})
				dataPartidos[i].data[1] += 1
			}
		})
	} else if (props.legisladores === "diputados") {
		periodo8 = periodo8.filter(element => (element.persona.cargo === "Diputado" || element.persona.cargo === "Diputada"))
		periodo9 = periodo9.filter(element => (element.persona.cargo === "Diputado" || element.persona.cargo === "Diputada"))

		periodo8.forEach(element => {
			if(!dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				dataPartidos.push({
					name: element.partidoPorPeriodo.partidoPolitico.nombre,
					data: [1,0]
				})
			} else if(dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				var i = dataPartidos.findIndex(function(item, i){
					return item.name === element.partidoPorPeriodo.partidoPolitico.nombre
				})
				dataPartidos[i].data[0] += 1
			}
		})
		periodo9.forEach(element => {
			if(!dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				dataPartidos.push({
					name: element.partidoPorPeriodo.partidoPolitico.nombre,
					data: [0,1]
				})
			} else if(dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				var i = dataPartidos.findIndex(function(item, i){
					return item.name === element.partidoPorPeriodo.partidoPolitico.nombre
				})
				dataPartidos[i].data[1] += 1
			}
		})
	} else if (props.legisladores === "senadores") {
		periodo8 = periodo8.filter(element => (element.persona.cargo === "Senador" || element.persona.cargo === "Senadora"))
		periodo9 = periodo9.filter(element => (element.persona.cargo === "Senador" || element.persona.cargo === "Senadora"))
		
		periodo8.forEach(element => {
			if(!dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				dataPartidos.push({
					name: element.partidoPorPeriodo.partidoPolitico.nombre,
					data: [1,0]
				})
			} else if(dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				var i = dataPartidos.findIndex(function(item, i){
					return item.name === element.partidoPorPeriodo.partidoPolitico.nombre
				})
				dataPartidos[i].data[0] += 1
			}
		})
		periodo9.forEach(element => {
			if(!dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				dataPartidos.push({
					name: element.partidoPorPeriodo.partidoPolitico.nombre,
					data: [0,1]
				})
			} else if(dataPartidos.find(x => x.name === element.partidoPorPeriodo.partidoPolitico.nombre)) {
				var i = dataPartidos.findIndex(function(item, i){
					return item.name === element.partidoPorPeriodo.partidoPolitico.nombre
				})
				dataPartidos[i].data[1] += 1
			}
		})
	}

	dataPartidos.forEach(element => {
		total_por_periodo.periodo8 += element.data[0]
		total_por_periodo.periodo9 += element.data[1]
	})

	var total_personas = total_por_periodo.periodo8 + total_por_periodo.periodo9

	// #96F5F5 azul, #ecad08 amarillo, #E6E6E6 blanco
	const options = {
		chart: {
			type: 'bar',
			backgroundColor: '#191919',
			style: {
				fontFamily: 'Roboto'
			}
		},
	
		title: {
			text: 'Legisladores',
			style: {
				color: '#E6E6E6'
			}
		},
	
		subtitle: {
			text: 'Cantidad de Legisladores por Partido Político según el Periodo Legislativo<br/>Total: ' + 
			total_personas + ' personas'
		},
	
		xAxis: {
			categories: ['2014 - 2018<br/>158 Legisladores', '2018 - 2022<br/>198 Legisladores'],
			title: {
				text: "Periodo Legislativo"
			},
			labels: {
				style: {
					color: '#E6E6E6'
				}
			}
		},
		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: 'Legisladores (cantidad)',
				align: 'high',
				style: {
					color: '#E6E6E6'
				}
			},
			labels: {
				overflow: 'justify',
				style: {
					color: '#E6E6E6'
				}
			}
		},
		tooltip: {
            formatter: function () {
				var porcentaje = 0
				if (this.point.category === '2014 - 2018<br/>158 Legisladores') {
					porcentaje = (this.point.y*100)/total_por_periodo.periodo8
				} else if (this.point.category === '2018 - 2022<br/>198 Legisladores') {
					porcentaje = (this.point.y*100)/total_por_periodo.periodo9
				}
                return '<b>' + this.point.category.substr(0,11) + 
					'</b><br/><span style="height: 8px; width: 8px; border-radius: 50%; display: inline-block; background-color: ' + 
					this.point.color + ';"></span> ' + this.series.name + ': ' + this.point.y + ' personas' + 
                    '<br/>Porcentaje: ' + porcentaje.toFixed(1) + '%';
			},
			useHTML: true
        },
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: false,
					color: '#E6E6E6',
					style: {
						textOutline: 'none'
					}
				},
			},
			series: {
				borderColor: 'none'
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			// x: 0,
			y: 52,
			floating: false,
			backgroundColor: '#5a5a5a',
			itemStyle: {
				color: '#E6E6E6'
			},
			borderRadius: 5
		},
		credits: {
			enabled: false
		},
		series: dataPartidos,
		exporting: {
			buttons: {
				contextButton: {
					menuItems: ['viewFullscreen', 'printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
				},
			}
		},
		navigation: {
			menuStyle: {
				background: '#5a5a5a',
				border: 'none'
			},
			menuItemStyle: {
				fontWeight: 'normal',
				color: '#E6E6E6'
			},
			menuItemHoverStyle: {
				background: '#6e6e6e'
			}
		}
	}

	return(
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
			containerProps = {{ style: {height: '525px'} }}
		/>
	)
}

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	}
});

export default function LegisladoresSidebarChart() {

	const classes = useStyles();
	const [state, setState] = useState({
		legisladores: "todos"
	});
  
	const handleChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};

    return (
		<Layout>
			<HomeNav></HomeNav>
			<ThemeProvider theme={darkTheme}>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel>Legisladores</InputLabel>
					<Select
					native
					value={state.legisladores}
					onChange={handleChange}
					label="Legisladores"
					inputProps={{
						name: 'legisladores'
					}}
					>
					<option value={"todos"}>Todos</option>
					<option value={"diputados"}>Diputados</option>
					<option value={"senadores"}>Senadores</option>
					</Select>
				</FormControl>
			</ThemeProvider>
            <Legisladores legisladores={state.legisladores} />
        </Layout>
    )
}