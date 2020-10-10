import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import MenuGroupContainer from "../components/menu-group-container"
import MenuContainer from "../components/menu-container"
import Footer from "../components/footer"

export default function Home() {
    return (
		<Layout>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Viz Congreso</title>
			</Helmet>

			<h1 style={{ textAlign: `center` }}>Congreso de Chile</h1>
			<h3 style={{ textAlign: `center` }}>Visualizaciones</h3>

			<div style={{ display: `flex`, justifyContent: `space-around`}}>
			<MenuGroupContainer>
				<h2 style={{ textAlign: `center` }}>Legisladores</h2>
				<div style={{ display: `flex`, justifyContent: `center`}}>
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
				<h2 style={{ textAlign: `center` }}>Participación Ciudadana</h2>
				<div style={{ display: `flex`, justifyContent: `center`}}>
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
			<Footer></Footer>
		</Layout>
	)
}
