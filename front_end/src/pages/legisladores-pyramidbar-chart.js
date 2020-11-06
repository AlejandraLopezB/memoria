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
import moment from 'moment'

const GET_LEGISLADORES = gql`
	query getLegisladores($periodo: ID!) {
        legisladores(periodo: $periodo) {
			genero
			cargo
            fecha_nacimiento
        }
	}
`;

function porcentajeEdad(ages, numero_personas) {
    var personas = ages.length
    return parseFloat(((personas*100)/numero_personas).toFixed(1))
}

function Legisladores(props) {

    var periodo = props.periodo

	var { loading, error, data } = useQuery(GET_LEGISLADORES, {
        variables: { periodo }
    });

	if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    data = data.legisladores

     // Age categories
     var categories_all = [
        '20-24', '25-29', '30-34', '35-39', '40-44',
        '45-49', '50-54', '55-59', '60-64', '65-69',
        '70-74', '75-79', '80-84', '85-89', '90-94',
        '95-99', '100 + '
    ];

    var categories_senators = [
        '35-39', '40-44','45-49', '50-54', '55-59', 
        '60-64', '65-69', '70-74', '75-79', '80-84', 
        '85-89', '90-94','95-99', '100 + '
    ];

    var hombres = []
    var mujeres = []
    var numero_personas = 0
    var data_hombres = []
    var data_mujeres = []
    var data_hombres_porcentajes = []
    var data_mujeres_porcentajes = []

	if (props.legisladores === "todos") {
        hombres = data.filter(element => element.genero === "M");
        mujeres = data.filter(element => element.genero === "F");
        numero_personas = data.length
        categories_all.forEach(element => {
            var ageStart = parseInt(element.substr(0, 2))
            var ageEnd = parseInt(element.substr(3, 2))
            var agesMale = hombres.filter(element => moment().diff(element.fecha_nacimiento, 'years') >= ageStart && moment().diff(element.fecha_nacimiento, 'years') <= ageEnd)
            var agesFemale = mujeres.filter(element => moment().diff(element.fecha_nacimiento, 'years') >= ageStart && moment().diff(element.fecha_nacimiento, 'years') <= ageEnd)
            data_hombres_porcentajes.push(-porcentajeEdad(agesMale, numero_personas))
            data_mujeres_porcentajes.push(porcentajeEdad(agesFemale, numero_personas))
            data_hombres.push(-agesMale.length)
            data_mujeres.push(agesFemale.length)
        })
    } else if (props.legisladores === "diputados") {
        hombres = data.filter(element => element.genero === "M" && (element.cargo === "Diputado" || element.cargo === "Diputada"));
        mujeres = data.filter(element => element.genero === "F" && (element.cargo === "Diputado" || element.cargo === "Diputada"));
        numero_personas = hombres.length + mujeres.length
        categories_all.forEach(element => {
            var ageStart = parseInt(element.substr(0, 2))
            var ageEnd = parseInt(element.substr(3, 2))
            var agesMale = hombres.filter(element => moment().diff(element.fecha_nacimiento, 'years') >= ageStart && moment().diff(element.fecha_nacimiento, 'years') <= ageEnd)
            var agesFemale = mujeres.filter(element => moment().diff(element.fecha_nacimiento, 'years') >= ageStart && moment().diff(element.fecha_nacimiento, 'years') <= ageEnd)
            data_hombres_porcentajes.push(-porcentajeEdad(agesMale, numero_personas))
            data_mujeres_porcentajes.push(porcentajeEdad(agesFemale, numero_personas))
            data_hombres.push(-agesMale.length)
            data_mujeres.push(agesFemale.length)
        })
	} else if (props.legisladores === "senadores") {
        hombres = data.filter(element => element.genero === "M" && (element.cargo === "Senador" || element.cargo === "Senadora"));
        mujeres = data.filter(element => element.genero === "F" && (element.cargo === "Senador" || element.cargo === "Senadora"));
        numero_personas = hombres.length + mujeres.length
        categories_senators.forEach(element => {
            var ageStart = parseInt(element.substr(0, 2))
            var ageEnd = parseInt(element.substr(3, 2))
            var agesMale = hombres.filter(element => moment().diff(element.fecha_nacimiento, 'years') >= ageStart && moment().diff(element.fecha_nacimiento, 'years') <= ageEnd)
            var agesFemale = mujeres.filter(element => moment().diff(element.fecha_nacimiento, 'years') >= ageStart && moment().diff(element.fecha_nacimiento, 'years') <= ageEnd)
            data_hombres_porcentajes.push(-porcentajeEdad(agesMale, numero_personas))
            data_mujeres_porcentajes.push(porcentajeEdad(agesFemale, numero_personas))
            data_hombres.push(-agesMale.length)
            data_mujeres.push(agesFemale.length)
        })
    }


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
			text: 'Legisladores (total: ' + numero_personas + ') agrupados por edad'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. Edad {xDescription}, {value}%.'
            }
        },
        xAxis: [{
            categories: props.legisladores === "senadores" ? categories_senators : categories_all,
            reversed: false,
            labels: {
                step: 1,
                style: {
					color: '#E6E6E6'
				}
            },
            accessibility: {
                description: 'Edad (masculino)'
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: props.legisladores === "senadores" ? categories_senators : categories_all,
            linkedTo: 0,
            labels: {
                step: 1,
                style: {
					color: '#E6E6E6'
				}
            },
            accessibility: {
                description: 'Edad (femenino)'
            }
        }],
        yAxis: {
            title: {
                text: 'Personas (cantidad)',
                style: {
					color: '#E6E6E6'
				}
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value);
                },
                style: {
					color: '#E6E6E6'
				}
            },
            accessibility: {
                description: 'Porcentaje de la Población',
                rangeDescription: 'Rango: 0 to 5%'
            }
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
                borderColor: 'none',
                stacking: 'normal'
			}
        },
        tooltip: {
            formatter: function () {
                var porcentaje = 0
                if (this.series.name === 'Masculino') {
                    porcentaje = data_hombres_porcentajes[this.series.data.indexOf( this.point )]
                } else if (this.series.name === 'Femenino') {
                    porcentaje = data_mujeres_porcentajes[this.series.data.indexOf( this.point )]
                }
                return '<b>' + this.series.name + ', edad ' + this.point.category + 
                    '</b><br/>Porcentaje: ' + Math.abs(porcentaje) +
                    '%</b><br/>Cantidad: ' + Math.trunc(Math.abs(this.point.y), 1);
            }
        },
        series: [{
            name: 'Masculino',
            data: data_hombres
        }, {
            name: 'Femenino',
            data: data_mujeres
        }],
		credits: {
			enabled: false
		},
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

export default function LegisladoresPyramidBarChart() {

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
					<option value={8}>8</option>
					<option value={9}>9</option>
					</Select>
				</FormControl>
			</ThemeProvider>
            <Legisladores periodo={state.periodo} legisladores={state.legisladores} />
        </Layout>
    )
}