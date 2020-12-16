import React from "react"
import layoutStyles from "./layout.module.css"
import Footer from "../components/footer"
import { Helmet } from "react-helmet"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
});

export default function Layout({ children }) {
	return (
        <ApolloProvider client={client}>
            <div className={layoutStyles.layout}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Congreso de Chile</title>
                </Helmet>
                {children}
            </div>
            <Footer></Footer>
        </ApolloProvider>
    )
}