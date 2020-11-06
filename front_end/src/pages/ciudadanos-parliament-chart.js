import React, { useState, Fragment } from "react"
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

const GET_GENERO_COMISION_ANO = gql`
    query get_genero($idcomision: ID!, $ano: Int!) {
        sesionesPorComisionYAno(idcomision: $idcomision, ano: $ano) {
            idcomision
            sesionLog {
                personas {
                    genero
                }
            }
        }
    }
`;

const GET_GENERO_ANO = gql`
    query get_genero($ano: Int!) {
        sesionesPorAno(ano: $ano) {
            idcomision
            sesionLog {
                personas {
                    genero
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

	var hombres = 0;
	var mujeres = 0;
    var total = 0;
    var listaGenero = []
    
    if (idcomision === 0) {
        data.sesionesPorAno.forEach(element => {
            element.sesionLog.forEach(element => {
                element.personas.forEach(element => {
                    listaGenero.push(element.genero)
                })
            })
        })

        hombres = listaGenero.filter(element => element === "M").length;
		mujeres = listaGenero.filter(element => element === "F").length;
		total = hombres + mujeres;
    } else {
        data.sesionesPorComisionYAno.forEach(element => {
            if (parseInt(element.idcomision) === idcomision) {
                element.sesionLog.forEach(element => {
                    element.personas.forEach(element => {
                        listaGenero.push(element.genero)
                    })
                })
            }
        })

        hombres = listaGenero.filter(element => element === "M").length;
		mujeres = listaGenero.filter(element => element === "F").length;
        total = hombres + mujeres;
        
        // console.log(listaGenero)
        console.log("idcomision: ", idcomision)
        console.log("año: ", ano)
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
			text: 'Participación Ciudadana',
			style: {
				color: '#E6E6E6'
			}
		},
	
		subtitle: {
			text: 'Total Ciudadanos: ' + total
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
			name: 'Ciudadanos',
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

export default function CiudadanosParliamentChart() {

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