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

const GET_LEGISLADORES = gql`
	query getLegisladores($periodo: ID!) {
        legisladores(periodo: $periodo) {
			genero
			cargo
        }
	}
`;

function Legisladores(props) {

	var periodo = props.periodo

	var { loading, error, data } = useQuery(GET_LEGISLADORES, {
		variables: { periodo }
	});

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	var hombres = 0;
	var mujeres = 0;
	var total = 0;

	if (props.legisladores === "todos") {
		hombres = data.legisladores.filter(element => element.genero === "M").length;
		mujeres = data.legisladores.filter(element => element.genero === "F").length;
		total = hombres + mujeres;
	} else if (props.legisladores === "diputados") {
		hombres = data.legisladores.filter(element => element.genero === "M" && (element.cargo === "Diputado" || element.cargo === "Diputada")).length;
		mujeres = data.legisladores.filter(element => element.genero === "F" && (element.cargo === "Diputado" || element.cargo === "Diputada")).length;
		total = hombres + mujeres;
	} else if (props.legisladores === "senadores") {
		hombres = data.legisladores.filter(element => element.genero === "M" && (element.cargo === "Senador" || element.cargo === "Senadora")).length;
		mujeres = data.legisladores.filter(element => element.genero === "F" && (element.cargo === "Senador" || element.cargo === "Senadora")).length;
		total = hombres + mujeres;
	}

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
			text: 'Total Legisladores: ' + total
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
		periodo: 9,
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
					<option value={8}>2014 - 2018</option>
					<option value={9}>2018 - 2022</option>
					</Select>
				</FormControl>
			</ThemeProvider>
            <Legisladores periodo={state.periodo} legisladores={state.legisladores} />
        </Layout>
    )
}