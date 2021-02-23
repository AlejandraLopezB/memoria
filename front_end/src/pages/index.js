import React, { ReactFragment } from "react"
import Layout from "../components/layout"
import MenuGroupContainer from "../components/menu-group-container"
import MenuContainer from "../components/menu-container"
import { Link } from "gatsby"
import Highcharts from "highcharts"
import highchartsItem from "highcharts/modules/item-series"
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsTheme from 'highcharts/themes/high-contrast-dark.src'
import parliamentLogo from "../utils/parliament-logo.png"
import sidebarLogo from "../utils/sidebar-logo.png"
import pyramidbarLogo from "../utils/pyramidbar-logo.png"

// init the module
highchartsItem(Highcharts);
HighchartsExporting(Highcharts);
HighchartsTheme(Highcharts);

export default function Home() {
    return (
		<Layout>
			<h1 style={{ textAlign: `center` }}>Congreso de Chile</h1>

			<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
				<MenuGroupContainer>
					<h2 style={{ textAlign: `center` }}>Legisladores</h2>
					<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
						<Link to="/legisladores-parliament-chart">
							<MenuContainer>
								<img src={parliamentLogo} style={{ maxWidth: `60%`, margin: `0.5em 0` }} alt="Parliament Chart Logo" />
								<p>Legisladores por género y periodo</p>
							</MenuContainer>
						</Link>
						<Link to="/legisladores-sidebar-chart">
							<MenuContainer>
								<img src={sidebarLogo} style={{ maxWidth: `35%`, margin: `0.4em 0` }} alt="SideBar Chart Logo" />
								<p>Legisladores por partido político y periodo</p>
							</MenuContainer>
						</Link>
						<Link to="/legisladores-pyramidbar-chart">
							<MenuContainer>
								<img src={pyramidbarLogo} style={{ maxWidth: `50%`, margin: `0.7em 0` }} alt="PyramidBar Chart Logo" />
								<p>Legisladores por género, edad y periodo</p>
							</MenuContainer>
						</Link>
					</div>
				</MenuGroupContainer>
				<MenuGroupContainer>
					<h2 style={{ textAlign: `center` }}>Participación Ciudadana</h2>
					<div style={{ display: `flex`, justifyContent: `center`, flexWrap: `wrap`}}>
						<Link to="ciudadanos-parliament-chart">
							<MenuContainer>
								<img src={parliamentLogo} style={{ maxWidth: `60%`, margin: `0.5em 0` }} alt="Parliament Chart Logo" />
								<p>Ciudadanos por género, año y comisión</p>
							</MenuContainer>
						</Link>
						<Link to="ciudadanos-sidebar-chart">
							<MenuContainer>
								<img src={sidebarLogo} style={{ maxWidth: `35%`, margin: `0.4em 0` }} alt="SideBar Chart Logo" />
								<p>Ciudadanos por asistentes o expositores, periodo y comisión</p>
							</MenuContainer>
						</Link>
						<Link to="ciudadanos-pyramidbar-chart">
							<MenuContainer>
								<img src={pyramidbarLogo} style={{ maxWidth: `50%`, margin: `0.7em 0` }} alt="PyramidBar Chart Logo" />
								<p>Ciudadanos por género, asistentes o expositores, año y comisión</p>
							</MenuContainer>
						</Link>
					</div>
				</MenuGroupContainer>
			</div>
		</Layout>
	)
}
