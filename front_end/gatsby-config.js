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
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
			  name: 'GatsbyJS',
			  short_name: 'GatsbyJS',
			  start_url: '/',
			  background_color: '#f7f0eb',
			  theme_color: '#a2466c',
			  display: 'standalone',
			  icon: 'src/utils/parliament-logo.png' 
			}
		},
		`gatsby-plugin-offline`
	],
}
