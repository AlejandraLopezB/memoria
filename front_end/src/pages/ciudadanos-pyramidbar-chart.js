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

const GET_GENERO_COMISION_ANO = gql`
    query get_genero($idcomision: ID!, $ano: Int!) {
        sesionesPorComisionYAno(idcomision: $idcomision, ano: $ano) {
            idcomision
            sesionLog {
                personas {
                    genero
                }
                asistente
                expositor
            }
        }
    }
`;

const GET_GENERO_ANO = gql`
    query get_genero($ano: Int!) {
        sesionesPorAno(ano: $ano) {
            sesionLog {
                personas {
                    genero
                }
                asistente
                expositor
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

function Ciudadanos(props) {

    var ano = parseInt(props.ano)
    var idcomision = parseInt(props.idcomision)

    var query = idcomision === 0 ? GET_GENERO_ANO : GET_GENERO_COMISION_ANO
    var variables = idcomision === 0 ? { ano } : { idcomision, ano }
    
    var { loading, error, data } = useQuery(query, {
		variables: variables
	});

	if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    // Age categories
    var categories_all = [
        'Asistentes', 'Expositores'
    ];

    var hombres = []
    var mujeres = []
    var numero_personas = 0
    var data_hombres = [0,0]
    var data_mujeres = [0,0]
    var data_hombres_porcentajes = [0,0]
    var data_mujeres_porcentajes = [0,0]
    var listaGenero = []

    if (idcomision === 0) {
        data.sesionesPorAno.forEach(element => {
            element.sesionLog.forEach(element => {
                listaGenero.push({
                    asistente: element.asistente,
                    expositor: element.expositor,
                    genero: element.personas[0].genero
                })
            })
        })

        hombres = listaGenero.filter(element => element.genero === "M");
        mujeres = listaGenero.filter(element => element.genero === "F");
        numero_personas = hombres.length + mujeres.length

        data_hombres[0] = -hombres.filter(element => element.asistente === true).length
        data_hombres[1] = -hombres.filter(element => element.expositor === true).length
        data_hombres_porcentajes[0] = ((data_hombres[0]*100)/numero_personas).toFixed(1)
        data_hombres_porcentajes[1] = ((data_hombres[1]*100)/numero_personas).toFixed(1)

        data_mujeres[0] = mujeres.filter(element => element.asistente === true).length
        data_mujeres[1] = mujeres.filter(element => element.expositor === true).length
        data_mujeres_porcentajes[0] = ((data_mujeres[0]*100)/numero_personas).toFixed(1)
        data_mujeres_porcentajes[1] = ((data_mujeres[1]*100)/numero_personas).toFixed(1)
    } else {
        data.sesionesPorComisionYAno.forEach(element => {
            element.sesionLog.forEach(element => {
                listaGenero.push({
                    asistente: element.asistente,
                    expositor: element.expositor,
                    genero: element.personas[0].genero
                })
            })
        })

        hombres = listaGenero.filter(element => element.genero === "M");
        mujeres = listaGenero.filter(element => element.genero === "F");
        numero_personas = hombres.length + mujeres.length

        data_hombres[0] = -hombres.filter(element => element.asistente === true).length
        data_hombres[1] = -hombres.filter(element => element.expositor === true).length
        data_hombres_porcentajes[0] = ((data_hombres[0]*100)/numero_personas).toFixed(1)
        data_hombres_porcentajes[1] = ((data_hombres[1]*100)/numero_personas).toFixed(1)

        data_mujeres[0] = mujeres.filter(element => element.asistente === true).length
        data_mujeres[1] = mujeres.filter(element => element.expositor === true).length
        data_mujeres_porcentajes[0] = ((data_mujeres[0]*100)/numero_personas).toFixed(1)
        data_mujeres_porcentajes[1] = ((data_mujeres[1]*100)/numero_personas).toFixed(1)
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
			text: 'Personas (total: ' + numero_personas + ') agrupadas por asistentes o expositores'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. Edad {xDescription}, {value}%.'
            }
        },
        xAxis: [{
            categories: categories_all,
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
            categories: categories_all,
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

export default function CiudadanosPyramidBarChart() {

	const classes = useStyles();
	const [state, setState] = useState({
		idcomision: 0,
		ano: 2017,
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
					<InputLabel id="periodo-select-outlined-label">Año</InputLabel>
					<Select
					native
					labelId="periodo-select-outlined-label"
					id="periodo-select-outlined"
					value={state.ano}
					onChange={handleChange}
					label="Año"
					inputProps={{
						name: 'ano'
					}}
					>
					<option value={2015}>2015</option>
					<option value={2016}>2016</option>
                    <option value={2017}>2017</option>
					</Select>
				</FormControl>
			</ThemeProvider>
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
            <Ciudadanos ano={state.ano} idcomision={state.idcomision} />
        </Layout>
    )
}