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
