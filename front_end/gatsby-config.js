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
				name:'legisladores',
				link:'legisladores01'
			}
		]
	},
	plugins: [
		`gatsby-plugin-react-helmet`
	],
}
