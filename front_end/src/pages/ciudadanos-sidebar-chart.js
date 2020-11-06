import React, { useState, Fragment } from "react"
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

const GET_POR_COMISION = gql`
    query get_datos($idcomision: ID!) {
        comision(idcomision: $idcomision) {
			sesiones {
				periodo_legislativo
				sesionLog {
					asistente
					expositor
				}
			}
		}
    }
`;

const GET_TOTAL_DATOS_COMISIONES = gql`
	query get_total_comisiones {
		comisiones {
			sesiones {
				periodo_legislativo
				sesionLog {
					asistente
					expositor
				}
			}
		}
	}
`;

const GET_COMISIONES = gql`
    query getComisiones {
        comisiones {
            idcomision
			nombre
            tipo
        }
	}
`;

function Legisladores(props) {

	var idcomision = parseInt(props.idcomision)

	var query = idcomision === 0 ? GET_TOTAL_DATOS_COMISIONES : GET_POR_COMISION

	var { loading, error, data } = useQuery(query, {
		variables: { idcomision }
	});

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	var periodo8 = []
	var periodo9 = []
	var dataParticipacion = [];

	dataParticipacion.push({
		name: "asistente",
		data: [0,0]
	})
	dataParticipacion.push({
		name: "expositor",
		data: [0,0]
	})

	if (idcomision === 0) {
		data.comisiones.forEach(element => {
			if (element.sesiones && element.sesiones.length) {
				periodo8 = element.sesiones.filter(element => parseInt(element.periodo_legislativo) === 8)
				periodo9 = element.sesiones.filter(element => parseInt(element.periodo_legislativo) === 9)

				periodo8.forEach(element => {
					element.sesionLog.forEach(element => {
						if (element.asistente === true) {
							dataParticipacion[0].data[0] += 1
						}
						if (element.expositor === true) {
							dataParticipacion[1].data[0] += 1
						}
					})
				})
				periodo9.forEach(element => {
					element.sesionLog.forEach(element => {
						if (element.asistente === true) {
							dataParticipacion[0].data[1] += 1
						}
						if (element.expositor === true) {
							dataParticipacion[1].data[1] += 1
						}
					})
				})
			}
		})
	} else {
		periodo8 = data.comision.sesiones.filter(element => parseInt(element.periodo_legislativo) === 8)
		periodo9 = data.comision.sesiones.filter(element => parseInt(element.periodo_legislativo) === 9)

		periodo8.forEach(element => {
			element.sesionLog.forEach(element => {
				if (element.asistente === true) {
					dataParticipacion[0].data[0] += 1
				}
				if (element.expositor === true) {
					dataParticipacion[1].data[0] += 1
				}
			})
		})
		periodo9.forEach(element => {
			element.sesionLog.forEach(element => {
				if (element.asistente === true) {
					dataParticipacion[0].data[1] += 1
				}
				if (element.expositor === true) {
					dataParticipacion[1].data[1] += 1
				}
			})
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
			text: 'Participación Ciudadana',
			style: {
				color: '#E6E6E6'
			}
		},
	
		subtitle: {
			text: 'Cantidad de personas agrupadas por asistente o expositor según el periodo legislativo'
		},
	
		xAxis: {
			categories: ['2014 - 2018', '2018 - 2022'],
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
				text: 'Personas (cantidad)',
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
		series: dataParticipacion,
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

function Comisiones() {
    var { loading, error, data } = useQuery(GET_COMISIONES);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    var permanente = []
    var ce = []
    var cem = []
    var otras = []
    
    data.comisiones.forEach(comision => {
        if (comision.tipo === "Permanente") {
            permanente.push(<option value={comision.idcomision} key={comision.idcomision}>{ comision.nombre }</option>)
        } else if (comision.tipo === "CE") {
            ce.push(<option value={comision.idcomision} key={comision.idcomision}>{ comision.nombre }</option>)
        } else if (comision.tipo === "CEM") {
            cem.push(<option value={comision.idcomision} key={comision.idcomision}>{ comision.nombre }</option>)
        } else {
            otras.push(<option value={comision.idcomision} key={comision.idcomision}>{ comision.nombre }</option>)
        }
    })

    return (
        <Fragment>
            <optgroup label="Permanente">
                {permanente}
            </optgroup>
            <optgroup label="Comisión Especial">
                {ce}
            </optgroup>
            <optgroup label="Comisión Especial Mixta">
                {cem}
            </optgroup>
            <optgroup label="Otras">
                {otras}
            </optgroup>
        </Fragment>
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

export default function CiudadanosSidebarChart() {

	const classes = useStyles();
	const [state, setState] = useState({
		idcomision: 0
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
					<InputLabel>Comisión</InputLabel>
					<Select
					native
					value={state.idcomision}
					onChange={handleChange}
					label="idcomision"
					inputProps={{
						name: 'idcomision'
					}}
					>
					<option value={0}>Todas</option>
					<Comisiones />
					</Select>
				</FormControl>
			</ThemeProvider>
            <Legisladores idcomision={state.idcomision} />
        </Layout>
    )
}