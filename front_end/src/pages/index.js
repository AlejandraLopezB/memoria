import React from "react"
import Layout from "../components/layout"
import MenuGroupContainer from "../components/menu-group-container"
import MenuContainer from "../components/menu-container"
import { Link } from "gatsby"
import Highcharts from "highcharts"
import highchartsItem from "highcharts/modules/item-series"
import HighchartsExporting from 'highcharts/modules/exporting'

// init the module
highchartsItem(Highcharts);
HighchartsExporting(Highcharts);

export default function Home() {
    return (
		<Layout>
			<h1 style={{ textAlign: `center` }}>Congreso de Chile</h1>
			<h3 style={{ textAlign: `center` }}>Visualizaciones</h3>

			<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
			<MenuGroupContainer>
				<h2 style={{ textAlign: `center` }}>Legisladores</h2>
				<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
					<Link to="/legisladores-parliament-chart">
						<MenuContainer>
							<h3>Parliament Chart</h3>
						</MenuContainer>
					</Link>
					<Link to="/legisladores-sidebar-chart">
						<MenuContainer>
							<h3>Side Bar</h3>
						</MenuContainer>
					</Link>
						<MenuContainer>
							<h3>Survey</h3>
						</MenuContainer>
				</div>
			</MenuGroupContainer>
			<MenuGroupContainer>
				<h2 style={{ textAlign: `center` }}>Participación Ciudadana</h2>
				<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
				<MenuContainer>
						<h3>Parliament Chart</h3>
					</MenuContainer>
					<MenuContainer>
						<h3>Side Bar</h3>
					</MenuContainer>
					<MenuContainer>
						<h3>Survey</h3>
					</MenuContainer>
				</div>
			</MenuGroupContainer>
			<MenuGroupContainer>
				<h2 style={{ textAlign: `center` }}>Otra Cosa Que Se Puede Poner</h2>
				<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
					<MenuContainer>
						<h3>Primer Contenedor</h3>
					</MenuContainer>
					<MenuContainer>
						<h3>Segundo Contenedor</h3>
					</MenuContainer>
					<MenuContainer>
						<h3>Tercer Contenedor</h3>
					</MenuContainer>
				</div>
			</MenuGroupContainer>
			<MenuGroupContainer>
				<h2 style={{ textAlign: `center` }}>Otra Cosa Mas</h2>
				<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
					<MenuContainer>
						<h3>Primer Contenedor</h3>
					</MenuContainer>
					<MenuContainer>
						<h3>Segundo Contenedor</h3>
					</MenuContainer>
					<MenuContainer>
						<h3>Tercer Contenedor</h3>
					</MenuContainer>
				</div>
			</MenuGroupContainer>
			</div>
		</Layout>
	)
}
