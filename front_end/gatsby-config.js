/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
	/* Your site config here */
	siteMetadata: {
		title: 'Gatsby Default Starter',
		menuLinks:[
			{
				name:'home',
				link:'/'
			},
			{
				name:'legisladores-parliament-chart',
				link:'legisladores-parliament-chart'
			},
			{
				name:'legisladores-sidebar-chart',
				link:'legisladores-sidebar-chart'
			}
		]
	},
	plugins: [
		`gatsby-plugin-react-helmet`
	],
}
