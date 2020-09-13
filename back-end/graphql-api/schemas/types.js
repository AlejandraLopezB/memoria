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

	scalar Date

	type Query {
		persona(idpersona: ID!): Persona
		personas: [Persona]
		personasPorCargo(cargo: String!): [Persona]
		personasPorCargoYPeriodo(cargo: String!, periodo_legislativo: ID!): [Persona]
		personasPorCargoPeriodoYPartido(cargo: String!, periodo_legislativo: ID!, idpartidopolitico: ID!): [Persona]
		personasPorTipo(tipo: String!): [Persona]
		personasPorTipoYPeriodo(tipo: String!, periodo_legislativo: ID!): [Persona]
		personasPorTipoPeriodoYPartido(tipo: String!, periodo_legislativo: ID!, idpartidopolitico: ID!): [Persona]
		periodosLegislativos: [PeriodoLegislativo]
		periodoLegislativo(periodo_legislativo: ID!): PeriodoLegislativo
		comision(idcomision: ID!): Comision
		sesionesPorAno(ano: Int!): [Sesion]
		sesionesPorComisionYAno(idcomision: ID!, ano: Int!): [Sesion]
		sesionesPorComisionYPeriodo(idcomision: ID!, periodo_legislativo: ID!): [Sesion]
	}
	
	type Persona {
		idpersona: ID! 
		nombre: String
		genero: String
		edad: Int
		cargo: String
		organizacion: String
		tipo: String
		periodo_legislativo: ID
		periodoLegislativo: PeriodoLegislativo
		idpartidopolitico: Int
		partidoPolitico: PartidoPolitico
		independiente: Boolean
		oficialismo: Boolean
		oposicion: Boolean
		fuera_de_pacto: Boolean
	}

	type PeriodoLegislativo {
		periodo_legislativo: ID!
		fecha_inicio: Date
		fecha_fin: Date
		numero_romano: String
	}

	type PartidoPolitico {
		idpartidopolitico: ID!
		nombre: String
		fecha_inicio: Date
		fecha_fin: Date
		activo: Boolean
	}

	type Comision {
		idcomision: ID!
		nombre: String
		tipo: String
		sesiones: [Sesion]
	}

	type Sesion {
		idsesion: ID!
		fecha: Date
		documento: String
		idcomision: ID!
		comision: Comision
		numero_sesion: Int!
		periodo_legislativo: ID!
		periodoLegislativo: PeriodoLegislativo
		sesionLog: [SesionLog]
	}

	type SesionLog {
		idsesionlog: ID!
		idsesion: ID!
		idpersona: ID
		personas: [Persona]
		asistente: Boolean
		expositor: Boolean
	}
`;

exports.typeDefs = typeDefs;
