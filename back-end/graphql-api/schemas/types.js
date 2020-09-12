// const graphql = require("graphql");
// const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt } = graphql;

// const PersonaType = new GraphQLObjectType({
// 	name: "Persona",
// 	type: "Query",
// 	fields: {
// 		nombre: { type: GraphQLString },
// 		genero: { type: GraphQLString },
// 		edad: { type: GraphQLInt },
// 		cargo: { type: GraphQLString },
// 		organizacion: { type: GraphQLString },
// 		idpersona: { type: GraphQLID },
// 		tipo: { type: GraphQLString },
// 		periodo_legislativo: { type: GraphQLInt },
// 		idpartidopolitico: { type: GraphQLString },
// 		independiente: { type: GraphQLBoolean },
// 		oficialismo: { type: GraphQLBoolean },
// 		oposicion: { type: GraphQLBoolean },
// 		fuera_de_cargo: { type: GraphQLBoolean }
// 	}
// });

// const ComisionType = new GraphQLObjectType({
// 	name: "Comision",
// 	type: "Query",
// 	fields: {
// 		idcomision: { type: GraphQLID },
// 		nombre: { type: GraphQLString },
// 		tipo: { type: GraphQLString },
// 		periodo_legislativo: { type: GraphQLID }
// 	}
// });

// const PartidoPoliticoType = new GraphQLObjectType({
// 	name: "Partido_Politico",
// 	type: "Query",
// 	fields: {
// 		nombre: { type: GraphQLString },
// 		fecha_inicio: { type: GraphQLString },
// 		fecha_fin: { type: GraphQLString },
// 		idpartidopolitico: { type: GraphQLID },
// 		activo: { type: GraphQLBoolean }
// 	}
// });

// const PeriodoLegislativoType = new GraphQLObjectType({
// 	name: "Periodo_Legislativo",
// 	type: "Query",
// 	fields: {
// 		periodo_legislativo: { type: GraphQLID },
// 		fecha_inicio: { type: GraphQLString },
// 		fecha_fin: { type: GraphQLString },
// 		numero_romano: { type: GraphQLString }
// 	}
// });

// const SesionType = new GraphQLObjectType({
// 	name: "Sesion",
// 	type: "Query",
// 	fields: {
// 		idsesion: { type: GraphQLID },
// 		fecha: { type: GraphQLString },
// 		documento: { type: GraphQLString },
// 		idcomision: { type: GraphQLID },
// 		numero_sesion: { type: GraphQLInt }
// 	}
// });

// const SesionLogType = new GraphQLObjectType({
// 	name: "Sesion_Log",
// 	type: "Query",
// 	fields: {
// 		idsesionlog: { type: GraphQLID },
// 		idsesion: { type: GraphQLID },
// 		idpersona: { type: GraphQLID },
// 		asistente: { type: GraphQLBoolean },
// 		expositor: { type: GraphQLBoolean }
// 	}
// });

// exports.PersonaType = PersonaType;
// exports.ComisionType = ComisionType;
// exports.PartidoPoliticoType = PartidoPoliticoType;
// exports.PeriodoLegislativoType = PeriodoLegislativoType;
// exports.SesionType = SesionType;
// exports.SesionLogType = SesionLogType;

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
	books: [Book]
	authors: [Author]
  }  
  type Book {
    title: String
    author: Author
  }
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;

exports.typeDefs = typeDefs;
