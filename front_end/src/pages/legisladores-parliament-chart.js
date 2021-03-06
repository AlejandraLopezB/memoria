import React, { useState } from "react"
import Layout from "../components/layout"
import HomeNav from "../components/homeNav"
import { gql, useQuery } from '@apollo/client';
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

// const GET_LEGISLADORES = gql`
// 	query getLegisladores($periodo: ID!) {
//         legisladores(periodo: $periodo) {
// 			persona {
// 				genero
// 			}
// 			cargolegislador
//         }
// 	}
// `;

const GET_LEGISLADORES = gql`
	query getTotalLegisladores {
        legisladores {
			persona {
				genero
			}
			cargolegislador
			partidoPorPeriodo {
				periodoLegislativo {
					periodo_legislativo
				}
			}
		}
	}
`;

function Legisladores(props) {

	var periodo = props.periodo

	var { loading, error, data } = useQuery(GET_LEGISLADORES);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	// var { loading2, error2, data2 } = useQuery(GET_LEGISLADORES, {
	// 	variables: 9
	// });

	// if (loading2) return 'Loading...';
	// if (error2) return `Error! ${error2.message}`;

	var hombres = 0;
	var hombres_porcentaje = 0;
	var mujeres = 0;
	var mujeres_porcentaje = 0;
	var total = 0;

	if (periodo === "8") {
		data = data.legisladores.filter(element => element.partidoPorPeriodo.periodoLegislativo.periodo_legislativo === "8")
	} else if (periodo === "9") {
		data = data.legisladores.filter(element => element.partidoPorPeriodo.periodoLegislativo.periodo_legislativo === "9")
	} else {
		data = data.legisladores
	}

	if (props.legisladores === "todos") {
		hombres = data.filter(element => element.persona.genero === "M").length;
		mujeres = data.filter(element => element.persona.genero === "F").length;
		total = hombres + mujeres;
	} else if (props.legisladores === "diputados") {
		hombres = data.filter(element => element.persona.genero === "M" && (element.cargolegislador === "Diputado" || element.cargolegislador === "Diputada")).length;
		mujeres = data.filter(element => element.persona.genero === "F" && (element.cargolegislador === "Diputado" || element.cargolegislador === "Diputada")).length;
		total = hombres + mujeres;
	} else if (props.legisladores === "senadores") {
		hombres = data.filter(element => element.persona.genero === "M" && (element.cargolegislador === "Senador" || element.cargolegislador === "Senadora")).length;
		mujeres = data.filter(element => element.persona.genero === "F" && (element.cargolegislador === "Senador" || element.cargolegislador === "Senadora")).length;
		total = hombres + mujeres;
	}

	hombres_porcentaje = ((hombres*100)/total).toFixed(1)
	mujeres_porcentaje = ((mujeres*100)/total).toFixed(1)

	const options = {
		chart: {
			type: 'item',
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
			text: 'Total: ' + total + ' personas'
		},
		credits: {
			enabled: false
		},
		legend: {
			labelFormat: '{name} <span style="opacity: 0.4">{y}</span>',
			itemStyle: {
				color: '#E6E6E6'
			}
		},
		tooltip: {
            formatter: function () {
				var porcentaje = 0
				var cantidad = 0
				if (this.point.label === 'Hombres') {
					porcentaje = hombres_porcentaje
					cantidad = hombres
				} else if (this.point.label === 'Mujeres') {
					porcentaje = mujeres_porcentaje
					cantidad = mujeres
				}
                return '<b>' + this.point.label + 
                    '</b>: ' + cantidad + ' personas' +
                    '<br/>Porcentaje: ' + porcentaje + '%';
            }
        },
	
		series: [{
			name: 'Legisladores',
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
		}],
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
			constructorType = { 'chart' }
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

export default function LegisladoresParliamentChart() {

	const classes = useStyles();
	const [state, setState] = useState({
		legisladores: "todos",
		periodo: 0,
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
			<ThemeProvider theme={darkTheme}>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="periodo-select-outlined-label">Periodo</InputLabel>
					<Select
					native
					labelId="periodo-select-outlined-label"
					id="periodo-select-outlined"
					value={state.periodo}
					onChange={handleChange}
					label="Periodo"
					inputProps={{
						name: 'periodo'
					}}
					>
					<option value={0}>Todos</option>
					<option value={8}>2014 - 2018</option>
					<option value={9}>2018 - 2022</option>
					</Select>
				</FormControl>
			</ThemeProvider>
            <Legisladores periodo={state.periodo} legisladores={state.legisladores} />
        </Layout>
    )
}