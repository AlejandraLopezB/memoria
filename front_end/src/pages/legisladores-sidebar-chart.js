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

const GET_LEGISLADORES_PERIODO_9 = gql`
	query getLegisladores {
        legisladores(periodo:9) {
			genero
			cargo
        }
	}
`;

const GET_LEGISLADORES_PERIODO_8 = gql`
	query getLegisladores {
        legisladores(periodo:8) {
			genero
			cargo
        }
	}
`;

function Legisladores(props) {

	// var { loading, error, data } = useQuery(props.periodo == 8? GET_LEGISLADORES_PERIODO_8 : GET_LEGISLADORES_PERIODO_9);

	// if (loading) return 'Loading...';
	// if (error) return `Error! ${error.message}`;

	// if (props.legisladores == "todos") {
	// 	var hombres = data.legisladores.filter(element => element.genero === "M").length;
	// 	var mujeres = data.legisladores.filter(element => element.genero === "F").length;
	// 	var total = hombres + mujeres;
	// } else if (props.legisladores == "diputados") {
	// 	var hombres = data.legisladores.filter(element => element.genero === "M" && (element.cargo === "Diputado" || element.cargo === "Diputada")).length;
	// 	var mujeres = data.legisladores.filter(element => element.genero === "F" && (element.cargo === "Diputado" || element.cargo === "Diputada")).length;
	// 	var total = hombres + mujeres;
	// } else if (props.legisladores === "senadores") {
	// 	var hombres = data.legisladores.filter(element => element.genero === "M" && (element.cargo === "Senador" || element.cargo === "Senadora")).length;
	// 	var mujeres = data.legisladores.filter(element => element.genero === "F" && (element.cargo === "Senador" || element.cargo === "Senadora")).length;
	// 	var total = hombres + mujeres;
	// }
	// #96F5F5 azul, #ecad08 amarillo, #E6E6E6 blanco
	const options = {
		chart: {
			type: 'bar',
			backgroundColor: '#191919'
		},
	
		title: {
			text: 'Legisladores',
			style: {
				color: '#E6E6E6'
			}
		},
	
		subtitle: {
			text: 'Subtitle'
		},
	
		xAxis: {
			categories: ['2014 - 2018', '2018 - 2022'],
			title: {
				text: null
			},
			labels: {
				style: {
					color: '#E6E6E6'
				}
			}
		},
		yAxis: {
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
			valueSuffix: ' personas'
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
					color: '#E6E6E6',
					style: {
						textOutline: 'none'
					}
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 80,
			floating: true,
			backgroundColor: '#5a5a5a',
			itemStyle: {
				color: '#E6E6E6'
			},
			borderRadius: 5
		},
		credits: {
			enabled: true
		},
		plotOptions: {
			series: {
				borderColor: 'none'
			}
		},
		series: [
			{
				name: 'Nombre Partido',
				data: [107, 31]
			}, {
				name: 'Year 1900',
				data: [133, 156]
			}, {
				name: 'Year 2000',
				data: [814, 841]
			}, {
				name: 'Year 2016',
				data: [1216, 1001]
			}
		],
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
				border: 'none',
				shadow: 'none'
			},
			menuItemStyle: {
				fontWeight: 'normal',
				color: '#E6E6E6'
			},
			menuItemHoverStyle: {
				background: '#6e6e6e',
				text: 'hola'
			}
		}
	}

	return(
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
			containerProps = {{ style: {height: '400px'} }}
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

export default function Legisladores01() {

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
		console.log("state: " + state.legisladores)
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